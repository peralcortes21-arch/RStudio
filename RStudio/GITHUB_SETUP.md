# Instrucciones para subir RStudio a GitHub

## Paso 1: Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. **Repository name**: `RStudio`
3. **Description**: "AI-Powered Social Media Calendar & Content Generator"
4. **Public** (recomendado para colaboración)
5. No inicialices con README/LICENSE (ya los tenemos)
6. Click **Create repository**

## Paso 2: Configurar Git localmente

Ejecuta estos comandos en tu terminal:

```bash
cd RStudio

# Inicializar repo
git init
git add .
git commit -m "Initial commit: RStudio complete application"

# Configurar rama main (si es tu primera vez)
git branch -M main

# Agregar origin remoto (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/RStudio.git

# Push a GitHub
git push -u origin main
```

## Paso 3: Agregar colaborador

En GitHub:

1. Ve a tu repo: `https://github.com/TU_USUARIO/RStudio`
2. **Settings** (arriba a la derecha)
3. Scroll a **Collaborators** (izquierda)
4. Click **Add people**
5. Escribe: `nicogemini1998-commits`
6. Selecciona el usuario
7. Click **Add nicogemini1998-commits to this repository**
8. Elige permiso: **Collaborator** (puede pushear)
9. Click **Add**

## Paso 4: Configuración recomendada del repo

En **Settings**:

- ✓ **Branch protection rules** → Require pull request reviews
- ✓ **Discussions** → Enable (para feedback)
- ✓ **Pages** → Deploy from main branch (para demo live)

## Ver la app en vivo

Si activas GitHub Pages (Settings → Pages → Deploy from main):
- Tu app estará en: `https://TU_USUARIO.github.io/RStudio/`
- Accesible como demo en vivo

## Próximas actualizaciones

Para pushear cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

---

¿Necesitas ayuda? Consulta [GitHub Docs](https://docs.github.com)
