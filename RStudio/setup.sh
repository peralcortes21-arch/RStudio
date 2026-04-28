#!/bin/bash

# RStudio GitHub Setup Script
# Este script automatiza la subida a GitHub

echo "🚀 RStudio GitHub Setup"
echo "====================="
echo ""

# Pedir GitHub username
read -p "Tu GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ Username requerido"
    exit 1
fi

echo ""
echo "📋 Configurando repo..."
echo ""

# Inicializar git
git init
git add .
git commit -m "Initial commit: RStudio - AI-powered social media calendar generator"

# Branch main
git branch -M main

# Add remote
echo "🔗 Agregando remote: github.com/$GITHUB_USER/RStudio"
git remote add origin https://github.com/$GITHUB_USER/RStudio.git

# Push
echo "📤 Enviando a GitHub..."
git push -u origin main

echo ""
echo "✅ ¡Listo!"
echo ""
echo "Próximos pasos:"
echo "1. Ve a: https://github.com/$GITHUB_USER/RStudio/settings/access/collaborators"
echo "2. Click 'Add people'"
echo "3. Busca: nicogemini1998-commits"
echo "4. Elige 'Collaborator' y agrega"
echo ""
echo "Ver demo en vivo:"
echo "GitHub Pages → Deploy from main branch"
echo "https://$GITHUB_USER.github.io/RStudio/"
echo ""
