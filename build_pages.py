#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_pages.py
==============
Génère une VRAIE page HTML par espèce à partir de `data.js`, pour que
chaque neta ait sa propre URL indexable par Google :

    site/neta/maguro/index.html   ->  https://encyclosushis.com/neta/maguro/
    site/neta/chutoro/index.html  ->  https://encyclosushis.com/neta/chutoro/
    ...

Produit aussi :
  - site/sitemap.xml   -> la liste de toutes les pages, pour Google
  - site/robots.txt    -> pointe vers le sitemap
  - site/assets/neta.css -> le style partagé des fiches

Chaque page contient le vrai texte de la fiche DANS le HTML (pas généré
en JavaScript), avec un <title> et une <meta description> propres — c'est
ça qui fait le référencement, bien plus que le nom de l'URL.

Usage :
    python3 build_pages.py                 # génère tout dans ./site
    python3 build_pages.py --out public     # autre dossier de sortie
    python3 build_pages.py --domain encyclosushis.com

Ne dépend d'aucune bibliothèque externe (uniquement la lib standard).
"""

import argparse
import html
import json
import os
import re
import subprocess
import sys
from urllib.parse import quote

DATA_FILE = "data.js"
DEFAULT_OUT = "site"
DEFAULT_DOMAIN = "encyclosushis.com"


# --------------------------------------------------------------------------
# 1) Lecture de data.js  (on laisse Node l'évaluer -> JSON fiable)
# --------------------------------------------------------------------------
def load_data(path):
    """Évalue data.js avec Node et récupère CATEGORIES + NETA en JSON.
    Repli en pur Python (regex) si Node n'est pas installé."""
    if _has_node():
        js = (
            "const fs=require('fs');"
            "const src=fs.readFileSync(%r,'utf8');"
            "const m={};(new Function(src+';this.CATEGORIES=CATEGORIES;this.NETA=NETA;')).call(m);"
            "process.stdout.write(JSON.stringify({categories:m.CATEGORIES,neta:m.NETA}));"
            % path
        )
        out = subprocess.check_output(["node", "-e", js])
        data = json.loads(out.decode("utf-8"))
        return data["categories"], data["neta"]
    return _load_data_regex(path)


def _has_node():
    try:
        subprocess.check_output(["node", "--version"])
        return True
    except Exception:
        return False


def _load_data_regex(path):
    """Repli sans Node : suffisant car aucun neta ne contient d'accolade
    ni de guillemet double à l'intérieur des chaînes."""
    with open(path, encoding="utf-8") as f:
        src = f.read()

    # CATEGORIES
    cat_block = re.search(r"const CATEGORIES\s*=\s*\{(.*?)\};", src, re.S).group(1)
    categories = dict(re.findall(r'(\w+)\s*:\s*"([^"]*)"', cat_block))

    # NETA
    body = src[src.index("const NETA"):]
    blocks = re.findall(r"\{([^{}]+)\}", body)

    def field(block, name):
        m = re.search(name + r'\s*:\s*"([^"]*)"', block)
        return m.group(1) if m else ""

    def regions(block):
        m = re.search(r"regions\s*:\s*\[(.*?)\]", block, re.S)
        if not m:
            return []
        return re.findall(r'"([^"]*)"', m.group(1))

    neta = []
    for b in blocks:
        _id = field(b, "id")
        if not _id:
            continue
        neta.append({
            "id": _id, "kanji": field(b, "kanji"), "romaji": field(b, "romaji"),
            "fr": field(b, "fr"), "en": field(b, "en"), "cat": field(b, "cat"),
            "gout": field(b, "gout"), "regions": regions(b),
        })
    return categories, neta


# --------------------------------------------------------------------------
# 2) Petits utilitaires
# --------------------------------------------------------------------------
def e(s):
    """Échappe le HTML."""
    return html.escape(s or "", quote=True)


def meta_description(gout, limit=155):
    """Coupe le goût à ~155 caractères, sur une frontière de mot."""
    s = re.sub(r"\s+", " ", (gout or "").strip())
    if len(s) <= limit:
        return s
    cut = s[:limit].rsplit(" ", 1)[0]
    return cut.rstrip(" ,;:.") + "…"


# --------------------------------------------------------------------------
# Boutons de partage réseaux sociaux
# --------------------------------------------------------------------------
SHARE_ICONS = {
    "x": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
    "facebook": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    "instagram": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
}


def share_block(url, text):
    """Rangée X / Facebook / Instagram pour l'URL de la page.
    X et Facebook sont de simples liens ; Instagram passe par un petit script
    (feuille de partage native sur mobile, copie du lien sur ordinateur)."""
    u = quote(url, safe="")
    t = quote(text, safe="")
    x_href = f"https://twitter.com/intent/tweet?text={t}&url={u}"
    fb_href = f"https://www.facebook.com/sharer/sharer.php?u={u}"
    return f"""    <div class="share">
      <span class="share-label">Partager</span>
      <a class="share-btn share-x" href="{x_href}" target="_blank" rel="noopener" aria-label="Partager sur X" title="Partager sur X">{SHARE_ICONS['x']}</a>
      <a class="share-btn share-facebook" href="{fb_href}" target="_blank" rel="noopener" aria-label="Partager sur Facebook" title="Partager sur Facebook">{SHARE_ICONS['facebook']}</a>
      <button type="button" class="share-btn share-instagram" onclick="igShare()" aria-label="Partager sur Instagram" title="Partager sur Instagram">{SHARE_ICONS['instagram']}</button>
    </div>"""


def share_script(url, text):
    """Toast + logique du bouton Instagram (Instagram n'a pas de partage web par URL)."""
    return f"""<div id="toast" role="status" aria-live="polite"></div>
<script>
(function(){{
  var url = {json.dumps(url)}, title = {json.dumps(text)};
  window.igShare = function(){{
    if(navigator.share){{ navigator.share({{url:url, title:title}}).catch(function(){{}}); return; }}
    if(navigator.clipboard){{ navigator.clipboard.writeText(url).then(copied).catch(manual); }}
    else manual();
  }};
  function copied(){{ show("Lien copié — collez-le dans votre story ou bio Instagram"); }}
  function manual(){{ show("Copiez ce lien pour Instagram : " + url); }}
  function show(m){{ var t=document.getElementById("toast"); t.textContent=m; t.classList.add("show"); setTimeout(function(){{t.classList.remove("show");}},2800); }}
}})();
</script>"""


# --------------------------------------------------------------------------
# 3) Le gabarit d'une fiche
# --------------------------------------------------------------------------
def render_page(n, categories, domain):
    cat_label = categories.get(n["cat"], "")
    url = f"https://{domain}/neta/{n['id']}/"
    title = f"{n['fr']} ({n['romaji']}) — {cat_label} | Encyclosushi"
    desc = meta_description(n["gout"])
    img_fish = f"/images/poissons/{n['id']}.jpg"
    img_nigiri = f"/images/nigiris/{n['id']}.jpg"
    og_image = f"https://{domain}{img_fish}"

    regions_li = "\n".join(f"        <li>{e(r)}</li>" for r in n["regions"])

    share_text = f"{n['fr']} ({n['romaji']}) — Encyclosushi"
    share_html = share_block(url, share_text)
    share_js = share_script(url, share_text)

    jsonld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": f"{n['fr']} ({n['romaji']})",
        "description": desc,
        "inLanguage": "fr",
        "image": og_image,
        "mainEntityOfPage": url,
        "about": {"@type": "Thing", "name": n["fr"], "alternateName": [n["romaji"], n["en"], n["kanji"]]},
    }
    breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Accueil", "item": f"https://{domain}/"},
            {"@type": "ListItem", "position": 2, "name": cat_label, "item": f"https://{domain}/#{n['cat']}"},
            {"@type": "ListItem", "position": 3, "name": n["fr"], "item": url},
        ],
    }

    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{e(url)}">

<meta property="og:type" content="article">
<meta property="og:title" content="{e(n['fr'])} ({e(n['romaji'])})">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{e(url)}">
<meta property="og:image" content="{e(og_image)}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Encyclosushi">
<meta name="twitter:card" content="summary_large_image">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/neta.css">

<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(breadcrumb, ensure_ascii=False)}</script>
</head>
<body>

<nav class="crumb">
  <a href="/">寿司ネタ図鑑</a> <span>›</span>
  <a href="/#{e(n['cat'])}">{e(cat_label)}</a> <span>›</span>
  <strong>{e(n['fr'])}</strong>
</nav>

<article class="fiche">
  <header class="fiche-head">
    <div class="watermark" aria-hidden="true">{e(n['kanji'])}</div>
    <div class="kanji">{e(n['kanji'])}</div>
    <div class="romaji">{e(n['romaji'])}</div>
    <span class="cat-tag">{e(cat_label)}</span>
  </header>

  <div class="fiche-body">
    <div class="photos">
      <figure class="photo">
        <div class="frame" data-kanji="{e(n['kanji'])}">
          <img src="{e(img_fish)}" alt="Le poisson — {e(n['fr'])}" loading="lazy"
               onerror="this.remove()">
        </div>
        <figcaption>Le poisson</figcaption>
      </figure>
      <figure class="photo">
        <div class="frame" data-kanji="{e(n['kanji'])}">
          <img src="{e(img_nigiri)}" alt="Le nigiri — {e(n['fr'])}" loading="lazy"
               onerror="this.remove()">
        </div>
        <figcaption>Le nigiri</figcaption>
      </figure>
    </div>

    <div class="names">
      <div><div class="lang">Japonais</div><div class="val"><span class="k">{e(n['kanji'])}</span>{e(n['romaji'])}</div></div>
      <div><div class="lang">Français</div><div class="val">{e(n['fr'])}</div></div>
      <div><div class="lang">Anglais</div><div class="val">{e(n['en'])}</div></div>
    </div>

    <section class="gout">
      <h2 class="section-title">Goût &amp; texture</h2>
      <p>{e(n['gout'])}</p>
    </section>

    <section class="regions">
      <h2 class="section-title">Régions de pêche</h2>
      <ul>
{regions_li}
      </ul>
    </section>

{share_html}

    <p class="back"><a href="/">‹ Retour à l'encyclopédie</a></p>
  </div>
</article>

{share_js}
</body>
</html>
"""


# --------------------------------------------------------------------------
# 4) Feuille de style partagée (reprend la palette du site)
# --------------------------------------------------------------------------
CSS = """:root{
  --washi:#FAF8F1; --sumi:#26292E; --sumi-soft:#5A5F66;
  --kon:#1C3352; --kon-deep:#132540; --shu:#C73E3A;
  --mist:#EAEEF2; --line:#DDD8CB; --radius:10px;
  --font-display:"Shippori Mincho", serif;
  --font-body:"Zen Kaku Gothic New", sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font-body);background:var(--washi);color:var(--sumi);line-height:1.65}
img{display:block;max-width:100%}
a{color:var(--kon)}
.crumb{max-width:820px;margin:0 auto;padding:18px clamp(16px,4vw,34px);
  font-size:.86rem;color:var(--sumi-soft)}
.crumb a{text-decoration:none} .crumb a:hover{text-decoration:underline}
.crumb span{margin:0 6px;color:var(--line)}
.fiche{max-width:820px;margin:0 auto 60px;background:#fff;border:1px solid var(--line);
  border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(28,51,82,.08)}
.fiche-head{background:linear-gradient(160deg,var(--kon),var(--kon-deep));color:#F5F2E8;
  padding:30px 34px 26px;position:relative;overflow:hidden}
.fiche-head .watermark{position:absolute;right:-10px;top:50%;transform:translateY(-50%);
  font-family:var(--font-display);font-weight:800;font-size:7.5rem;line-height:1;
  color:rgba(255,255,255,.07);pointer-events:none;white-space:nowrap}
.fiche-head .kanji{font-family:var(--font-display);font-weight:800;font-size:2.6rem;line-height:1.15}
.fiche-head .romaji{font-size:1.05rem;color:#C9D4E2;letter-spacing:.06em;margin-top:2px}
.fiche-head .cat-tag{display:inline-block;margin-top:12px;background:var(--shu);color:#fff;
  font-size:.74rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  padding:4px 12px;border-radius:4px}
.fiche-body{padding:26px 34px 36px}
.photos{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:26px}
.photo{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);background:#fff}
.photo .frame{aspect-ratio:4/3;position:relative;background:var(--mist);
  display:flex;align-items:center;justify-content:center}
.photo .frame img{width:100%;height:100%;object-fit:cover;position:relative;z-index:1}
.photo .frame::after{content:attr(data-kanji);position:absolute;inset:0;z-index:0;
  display:flex;align-items:center;justify-content:center;
  font-family:var(--font-display);font-size:3rem;color:var(--kon);
  background:linear-gradient(150deg,var(--mist),#dfe6ee)}
.photo figcaption{padding:8px 12px;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--sumi-soft);font-weight:700;border-top:1px solid var(--line)}
.names{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line);
  border-radius:var(--radius);overflow:hidden;background:#fff;margin-bottom:26px}
.names>div{padding:13px 16px}
.names>div+div{border-left:1px solid var(--line)}
.names .lang{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--shu);font-weight:700}
.names .val{font-weight:700;margin-top:2px;font-size:.97rem;line-height:1.35}
.names .val .k{font-family:var(--font-display);font-size:1.15rem;color:var(--kon);margin-right:6px}
.section-title{font-family:var(--font-display);font-weight:600;font-size:1.15rem;color:var(--kon);
  display:flex;align-items:center;gap:10px;margin-bottom:10px}
.section-title::after{content:"";flex:1;height:1px;background:var(--line)}
.gout{margin-bottom:26px}
.regions ul{list-style:none}
.regions li{position:relative;padding:7px 0 7px 24px}
.regions li+li{border-top:1px dashed var(--line)}
.regions li::before{content:"";position:absolute;left:4px;top:15px;width:8px;height:8px;
  border-radius:50%;background:var(--shu)}
.back{margin-top:28px}
.back a{text-decoration:none;font-weight:700} .back a:hover{text-decoration:underline}
.share{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:6px}
.share-label{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--sumi-soft);font-weight:700}
.share-btn{width:38px;height:38px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
  border:1px solid var(--line);background:#fff;color:var(--kon);cursor:pointer;padding:0;text-decoration:none;
  transition:transform .15s ease, background .15s ease, color .15s ease, border-color .15s ease}
.share-btn svg{width:17px;height:17px;fill:currentColor}
.share-btn:hover{transform:translateY(-2px)}
.share-x:hover{background:#000;color:#fff;border-color:#000}
.share-facebook:hover{background:#1877F2;color:#fff;border-color:#1877F2}
.share-instagram:hover{background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF);color:#fff;border-color:transparent}
.share-btn:focus-visible{outline:3px solid var(--kon);outline-offset:2px}
#toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);
  background:var(--sumi);color:#F5F2E8;padding:12px 20px;border-radius:8px;font-size:.9rem;
  box-shadow:0 8px 24px rgba(0,0,0,.25);opacity:0;pointer-events:none;z-index:100;max-width:90vw;
  text-align:center;transition:opacity .25s ease, transform .25s ease}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
@media (max-width:640px){
  .photos{grid-template-columns:1fr} .names{grid-template-columns:1fr}
  .names>div+div{border-left:none;border-top:1px solid var(--line)}
  .fiche-head{padding:24px 22px 22px} .fiche-body{padding:22px 20px 30px}
  .fiche-head .watermark{font-size:5rem}
}
"""


# --------------------------------------------------------------------------
# 5) sitemap + robots
# --------------------------------------------------------------------------
def render_sitemap(neta, domain):
    urls = [f"https://{domain}/"]
    urls += [f"https://{domain}/neta/{n['id']}/" for n in neta]
    items = "\n".join(f"  <url><loc>{u}</loc></url>" for u in urls)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            f"{items}\n</urlset>\n")


def render_robots(domain):
    return ("User-agent: *\nAllow: /\n\n"
            f"Sitemap: https://{domain}/sitemap.xml\n")


# --------------------------------------------------------------------------
# Programme principal
# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="Génère une page HTML par neta pour le SEO.")
    ap.add_argument("--out", default=DEFAULT_OUT, help="dossier de sortie (défaut: site)")
    ap.add_argument("--domain", default=DEFAULT_DOMAIN, help="domaine sans https://")
    ap.add_argument("--data", default=DATA_FILE, help="chemin de data.js")
    args = ap.parse_args()

    categories, neta = load_data(args.data)
    print(f"Chargé : {len(neta)} espèces, {len(categories)} catégories.")

    os.makedirs(os.path.join(args.out, "assets"), exist_ok=True)

    # CSS partagé
    with open(os.path.join(args.out, "assets", "neta.css"), "w", encoding="utf-8") as f:
        f.write(CSS)

    # une page par neta
    for n in neta:
        d = os.path.join(args.out, "neta", n["id"])
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
            f.write(render_page(n, categories, args.domain))

    # sitemap + robots
    with open(os.path.join(args.out, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(render_sitemap(neta, args.domain))
    with open(os.path.join(args.out, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(render_robots(args.domain))

    print(f"✓ {len(neta)} pages générées dans {args.out}/neta/<id>/index.html")
    print(f"✓ sitemap.xml ({len(neta)+1} URL) et robots.txt écrits")
    print(f"→ domaine utilisé : https://{args.domain}")


if __name__ == "__main__":
    main()
