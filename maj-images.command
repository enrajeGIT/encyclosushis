#!/bin/bash
# Double-clique ce fichier depuis le Finder pour publier tes nouvelles images.
# Il ajoute tout ce qui a changé dans le dossier, l'envoie sur GitHub,
# et GitHub Pages met le site à jour tout seul (~1 min).

cd "$(dirname "$0")" || { echo "Dossier introuvable"; exit 1; }

echo "======================================"
echo "  Mise a jour des images — encyclosushis"
echo "======================================"
echo ""
echo "Ajout des fichiers modifies..."
git add -A

if git diff --cached --quiet; then
  echo ""
  echo "Rien de nouveau a publier (aucune image ajoutee ou modifiee)."
else
  git commit -m "Mise a jour des images ($(date '+%Y-%m-%d %H:%M'))"
  echo ""
  echo "Envoi vers GitHub..."
  if git push; then
    echo ""
    echo "OK ! Le site se met a jour sous ~1 minute sur www.encyclosushis.com"
  else
    echo ""
    echo "ECHEC du push. Verifie ta connexion, ou ton jeton a peut-etre expire."
  fi
fi

echo ""
read -n 1 -s -r -p "Appuie sur une touche pour fermer..."
echo ""
