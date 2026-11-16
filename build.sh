#!/usr/bin/env bash
# Monta as páginas finais (raiz do projeto) a partir de src/partials + src/pages.
# Cada arquivo em src/pages começa com uma linha:  PAGE|Título da página|Descrição
set -e
cd "$(dirname "$0")"
for f in src/pages/*.html; do
  name=$(basename "$f")
  IFS='|' read -r page title desc < "$f"
  {
    sed -e "s|{{TITLE}}|$title|g" -e "s|{{DESC}}|$desc|g" -e "s|{{PAGE}}|$page|g" src/partials/head.html
    cat src/partials/header.html
    tail -n +2 "$f"
    cat src/partials/footer.html
  } > "$name"
  echo "ok  $name"
done
