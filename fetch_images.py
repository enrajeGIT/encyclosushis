#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fetch_images.py
===============
Télécharge automatiquement une photo pour chaque espèce de `data.js`
depuis Wikipédia (JA puis EN) ou Wikimedia Commons, et la range dans
    images/poissons/<id>.jpg

Il écrit aussi :
  - images/credits.csv   -> source + licence + auteur de chaque image (À GARDER !)
  - images/_manquants.txt -> la liste des id sans image (à compléter à la main)

Dépendances :
    pip install requests pillow
(Pillow est recommandé : il convertit tout en .jpg propre et redimensionne.
 Sans Pillow, le script enregistre le fichier brut avec son extension d'origine.)

Exemples :
    python3 fetch_images.py                     # toutes les entrées manquantes
    python3 fetch_images.py --only maguro saba  # seulement certaines
    python3 fetch_images.py --force             # re-télécharge même si le fichier existe
    python3 fetch_images.py --dry-run           # affiche sans rien télécharger
    python3 fetch_images.py --out images/nigiris  # cible un autre dossier

IMPORTANT : remplace l'adresse dans USER_AGENT par la tienne. Wikimedia
demande un User-Agent descriptif avec un moyen de contact.
"""

import argparse
import csv
import os
import re
import sys
import time
from urllib.parse import unquote

import requests

# --------------------------------------------------------------------------
# Configuration
# --------------------------------------------------------------------------
DATA_FILE   = "data.js"
OUT_DIR     = "images/poissons"
CREDITS     = "images/credits.csv"
MISSING     = "images/_manquants.txt"
USER_AGENT  = "SushiNetaImageBot/1.0 (contact: rjv2312@gmail.com)"  # <-- À MODIFIER
DELAY       = 0.5          # pause (s) entre deux requêtes, pour rester poli
MAX_WIDTH   = 1600         # redimensionnement max si Pillow est présent
TIMEOUT     = 20

# On refuse ces images : ce ne sont pas des photos de l'animal
BAD_PATTERNS = re.compile(
    r"(\.svg$|\.ogg$|\.oga$|\.pdf$|locator|location_map|range_map|distribution|"
    r"logo|icon|coat_of_arms|\bmap\b|disambig)", re.I)

# Renvois manuels : pour les coupes / préparations sans article propre,
# on pointe vers l'espèce parente (terme japonais). Complète librement.
OVERRIDES = {
    "chutoro":   "クロマグロ",   # coupe -> photo du thon rouge
    "otoro":     "クロマグロ",
    "kamatoro":  "クロマグロ",
    "engawa":    "ヒラメ",       # muscle de nageoire -> le flet
    "shimesaba": "サバ",
    "geso":      "スルメイカ",
    "niika":     "スルメイカ",
    "kobashira": "バカガイ",     # aoyagi = bakagai
    "akagaihimo":"アカガイ",
    "sujiko":    "イクラ",
    "oboro":     "でんぶ",
    # Ajoute ici tes propres renvois : "id": "terme de recherche",
}

session = requests.Session()
session.headers.update({"User-Agent": USER_AGENT})

# --------------------------------------------------------------------------
# 1) Lecture de data.js
# --------------------------------------------------------------------------
def load_neta(path):
    with open(path, encoding="utf-8") as f:
        src = f.read()
    body = src[src.index("const NETA"):]
    objects = re.findall(r"\{([^{}]+)\}", body)

    def field(block, name):
        m = re.search(name + r'\s*:\s*"([^"]*)"', block)
        return m.group(1) if m else None

    entries = []
    for block in objects:
        _id = field(block, "id")
        if not _id:
            continue
        entries.append({
            "id":     _id,
            "kanji":  field(block, "kanji"),
            "romaji": field(block, "romaji"),
            "en":     field(block, "en"),
            "fr":     field(block, "fr"),
        })
    return entries


def clean_en(s):
    """Nettoie le nom anglais : retire les parenthèses et garde l'avant du / ou -."""
    if not s:
        return None
    s = re.sub(r"\(.*?\)", "", s)
    s = re.split(r"[/—-]", s)[0]
    return s.strip() or None


def search_terms(e):
    """Renvoie une liste ordonnée de (lang, terme) à essayer."""
    terms = []
    if e["id"] in OVERRIDES:
        terms.append(("ja", OVERRIDES[e["id"]]))
    if e["kanji"]:
        terms.append(("ja", e["kanji"]))          # kanji/katakana = terme JA principal
    en = clean_en(e["en"])
    if en:
        terms.append(("en", en))
    # dédoublonnage en gardant l'ordre
    seen, out = set(), []
    for t in terms:
        if t not in seen:
            seen.add(t)
            out.append(t)
    return out

# --------------------------------------------------------------------------
# 2) Recherche d'image via l'API MediaWiki
# --------------------------------------------------------------------------
def find_lead_image(lang, term):
    """
    Cherche l'article le plus pertinent et renvoie l'URL de son image
    principale, ou None. Renvoie aussi le titre de l'article.
    """
    api = f"https://{lang}.wikipedia.org/w/api.php"
    params = {
        "action": "query", "format": "json", "formatversion": "2",
        "generator": "search",
        "gsrsearch": term, "gsrnamespace": "0", "gsrlimit": "5",
        "prop": "pageimages", "piprop": "original", "redirects": "1",
    }
    try:
        r = session.get(api, params=params, timeout=TIMEOUT)
        r.raise_for_status()
        pages = r.json().get("query", {}).get("pages", [])
    except Exception as ex:
        print(f"    ! erreur API ({lang}/{term}): {ex}")
        return None, None
    # trier par pertinence de recherche (champ 'index')
    pages.sort(key=lambda p: p.get("index", 999))
    for p in pages:
        orig = p.get("original")
        if not orig:
            continue
        url = orig.get("source")
        if url and not BAD_PATTERNS.search(url):
            return url, p.get("title")
    return None, None


def get_license(lang, image_url):
    """Récupère licence / auteur / lien depuis les métadonnées du fichier."""
    filename = unquote(image_url.split("/")[-1])
    api = f"https://{lang}.wikipedia.org/w/api.php"
    params = {
        "action": "query", "format": "json", "formatversion": "2",
        "titles": "File:" + filename,
        "prop": "imageinfo", "iiprop": "extmetadata|url",
    }
    info = {"license": "", "author": "", "license_url": "", "attribution_required": ""}
    try:
        r = session.get(api, params=params, timeout=TIMEOUT)
        r.raise_for_status()
        pages = r.json().get("query", {}).get("pages", [])
        if pages and pages[0].get("imageinfo"):
            meta = pages[0]["imageinfo"][0].get("extmetadata", {})
            def g(k): return (meta.get(k) or {}).get("value", "")
            info["license"]     = re.sub("<[^>]+>", "", g("LicenseShortName")).strip()
            info["author"]      = re.sub("<[^>]+>", "", g("Artist")).strip()
            info["license_url"] = g("LicenseUrl")
            info["attribution_required"] = g("AttributionRequired")
    except Exception:
        pass
    return info

# --------------------------------------------------------------------------
# 3) Téléchargement + conversion
# --------------------------------------------------------------------------
try:
    from PIL import Image
    from io import BytesIO
    HAVE_PIL = True
except ImportError:
    HAVE_PIL = False


def download(url, dest_noext):
    """Télécharge l'image ; renvoie le chemin final écrit."""
    r = session.get(url, timeout=TIMEOUT)
    r.raise_for_status()
    if HAVE_PIL:
        img = Image.open(BytesIO(r.content)).convert("RGB")
        if img.width > MAX_WIDTH:
            h = int(img.height * MAX_WIDTH / img.width)
            img = img.resize((MAX_WIDTH, h), Image.LANCZOS)
        dest = dest_noext + ".jpg"
        img.save(dest, "JPEG", quality=85)
        return dest
    # sans Pillow : on garde l'extension d'origine
    ext = os.path.splitext(url)[1].lower() or ".jpg"
    dest = dest_noext + ext
    with open(dest, "wb") as f:
        f.write(r.content)
    return dest

# --------------------------------------------------------------------------
# Programme principal
# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="Télécharge les images des neta depuis Wikipédia.")
    ap.add_argument("--only", nargs="+", help="ne traiter que ces id")
    ap.add_argument("--out", default=OUT_DIR, help="dossier de destination")
    ap.add_argument("--force", action="store_true", help="re-télécharger même si le fichier existe")
    ap.add_argument("--dry-run", action="store_true", help="ne rien télécharger, juste afficher")
    args = ap.parse_args()

    if "TON_EMAIL" in USER_AGENT and not args.dry_run:
        print("⚠  Pense à remplacer TON_EMAIL dans USER_AGENT (en haut du script).\n")

    entries = load_neta(DATA_FILE)
    if args.only:
        wanted = set(args.only)
        entries = [e for e in entries if e["id"] in wanted]

    os.makedirs(args.out, exist_ok=True)
    os.makedirs(os.path.dirname(CREDITS) or ".", exist_ok=True)

    credits_rows, missing, found = [], [], 0

    for e in entries:
        dest_jpg = os.path.join(args.out, e["id"] + ".jpg")
        if os.path.exists(dest_jpg) and not args.force:
            print(f"= {e['id']:16} déjà présent, ignoré")
            continue

        img_url = page_title = used = None
        for lang, term in search_terms(e):
            img_url, page_title = find_lead_image(lang, term)
            time.sleep(DELAY)
            if img_url:
                used = f"{lang}:{term}"
                break

        if not img_url:
            print(f"✗ {e['id']:16} AUCUNE image trouvée")
            missing.append(e["id"])
            continue

        if args.dry_run:
            print(f"→ {e['id']:16} [{used}] {img_url}")
            found += 1
            continue

        try:
            written = download(img_url, os.path.join(args.out, e["id"]))
        except Exception as ex:
            print(f"✗ {e['id']:16} échec téléchargement : {ex}")
            missing.append(e["id"])
            continue

        page_lang = "ja" if used.startswith("ja") else "en"
        lic = get_license(page_lang, img_url)
        time.sleep(DELAY)
        found += 1
        credits_rows.append({
            "id": e["id"],
            "fichier": os.path.basename(written),
            "terme": used,
            "article": f"https://{page_lang}.wikipedia.org/wiki/{(page_title or '').replace(' ', '_')}",
            "image_url": img_url,
            "licence": lic["license"],
            "auteur": lic["author"],
            "licence_url": lic["license_url"],
            "attribution_requise": lic["attribution_required"],
        })
        print(f"✓ {e['id']:16} [{used}] {lic['license'] or '?'}  -> {os.path.basename(written)}")

    # écriture des crédits (ajout si le fichier existe déjà)
    if credits_rows and not args.dry_run:
        new = not os.path.exists(CREDITS)
        with open(CREDITS, "a", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(credits_rows[0].keys()))
            if new:
                w.writeheader()
            w.writerows(credits_rows)

    if missing and not args.dry_run:
        with open(MISSING, "w", encoding="utf-8") as f:
            f.write("\n".join(missing) + "\n")

    print("\n" + "=" * 50)
    print(f"Images trouvées : {found}")
    print(f"Manquantes      : {len(missing)}")
    if missing:
        print("À compléter à la main :", ", ".join(missing))
        print(f"(liste aussi écrite dans {MISSING})")
    if credits_rows and not args.dry_run:
        print(f"Crédits/licences  -> {CREDITS}")


if __name__ == "__main__":
    main()
