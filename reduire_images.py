#!/usr/bin/env python3
"""
Réduit les images d'un dossier qui dépassent une taille donnée (800 Ko par défaut).

Stratégie : pour chaque image trop lourde, on la redimensionne si elle est très
grande, puis on baisse progressivement la qualité (pour les JPEG/WebP) jusqu'à
passer sous le seuil. Les PNG sont ré-optimisés et redimensionnés.

Dépendance : Pillow  ->  pip install Pillow

Exemples :
    python reduire_images.py ./photos
    python reduire_images.py ./photos --seuil-ko 500 --recursif --backup
    python reduire_images.py ./photos --dry-run
"""

import argparse
import os
import shutil
from pathlib import Path

from PIL import Image

# Extensions traitées
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"}


def taille_ko(chemin: Path) -> float:
    """Taille du fichier en kilo-octets."""
    return chemin.stat().st_size / 1024


def reduire_image(chemin: Path, seuil_ko: int, dim_max: int,
                  qualite_min: int, backup: bool, dry_run: bool) -> dict:
    """Réduit une image sous le seuil. Retourne un petit rapport."""
    taille_avant = taille_ko(chemin)
    rapport = {"fichier": chemin.name, "avant_ko": round(taille_avant, 1),
               "apres_ko": round(taille_avant, 1), "action": "ignorée"}

    if taille_avant <= seuil_ko:
        return rapport

    if dry_run:
        rapport["action"] = "à réduire (dry-run)"
        return rapport

    if backup:
        sauvegarde = chemin.with_suffix(chemin.suffix + ".bak")
        if not sauvegarde.exists():
            shutil.copy2(chemin, sauvegarde)

    with Image.open(chemin) as img:
        img.load()
        format_origine = img.format  # JPEG, PNG, WEBP...

        # 1) Redimensionnement si l'image est très grande
        largeur, hauteur = img.size
        if max(largeur, hauteur) > dim_max:
            ratio = dim_max / max(largeur, hauteur)
            nouvelle_taille = (int(largeur * ratio), int(hauteur * ratio))
            img = img.resize(nouvelle_taille, Image.LANCZOS)

        # 2) Recompression
        if format_origine in ("JPEG", "WEBP"):
            # On convertit en RGB si besoin (ex : PNG à canal alpha ouvert en JPEG)
            if img.mode in ("RGBA", "P") and format_origine == "JPEG":
                img = img.convert("RGB")

            qualite = 90
            while qualite >= qualite_min:
                img.save(chemin, format=format_origine,
                         quality=qualite, optimize=True)
                if taille_ko(chemin) <= seuil_ko:
                    break
                qualite -= 5
        else:
            # PNG et autres formats sans lévier de qualité : on optimise
            # ce qu'on peut. Le redimensionnement ci-dessus fait l'essentiel.
            img.save(chemin, optimize=True)

    rapport["apres_ko"] = round(taille_ko(chemin), 1)
    rapport["action"] = "réduite"
    return rapport


def explorer(dossier: Path, recursif: bool):
    """Génère les chemins d'images du dossier."""
    motif = "**/*" if recursif else "*"
    for chemin in dossier.glob(motif):
        if chemin.is_file() and chemin.suffix.lower() in EXTENSIONS:
            # On ignore les backups .bak
            if chemin.suffix == ".bak" or chemin.name.endswith(".bak"):
                continue
            yield chemin


def main():
    parser = argparse.ArgumentParser(
        description="Réduit les images d'un dossier au-delà d'un seuil de taille.")
    parser.add_argument("dossier", type=Path, help="Dossier à explorer")
    parser.add_argument("--seuil-ko", type=int, default=800,
                        help="Seuil en Ko au-delà duquel on réduit (défaut : 800)")
    parser.add_argument("--dim-max", type=int, default=2000,
                        help="Dimension max (px) du plus grand côté (défaut : 2000)")
    parser.add_argument("--qualite-min", type=int, default=40,
                        help="Qualité JPEG/WebP minimale (défaut : 40)")
    parser.add_argument("--recursif", action="store_true",
                        help="Explorer aussi les sous-dossiers")
    parser.add_argument("--backup", action="store_true",
                        help="Créer une copie .bak avant modification")
    parser.add_argument("--dry-run", action="store_true",
                        help="Lister ce qui serait réduit, sans rien modifier")
    args = parser.parse_args()

    if not args.dossier.is_dir():
        print(f"Erreur : {args.dossier} n'est pas un dossier valide.")
        return

    total, reduites, gain = 0, 0, 0.0
    for chemin in explorer(args.dossier, args.recursif):
        total += 1
        try:
            r = reduire_image(chemin, args.seuil_ko, args.dim_max,
                              args.qualite_min, args.backup, args.dry_run)
        except Exception as e:
            print(f"  ! {chemin.name} : erreur ({e})")
            continue

        if r["action"].startswith("réduite") or "dry-run" in r["action"]:
            reduites += 1
            gain += r["avant_ko"] - r["apres_ko"]
            print(f"  {r['fichier']} : {r['avant_ko']} Ko -> "
                  f"{r['apres_ko']} Ko  ({r['action']})")

    print(f"\n{total} image(s) parcourue(s), {reduites} traitée(s).")
    if not args.dry_run and gain > 0:
        print(f"Espace gagné : {gain / 1024:.1f} Mo")


if __name__ == "__main__":
    main()
