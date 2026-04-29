# RStudio — Setup Guide

## Initial Setup (5 minutes)

### Step 1: Clone & Navigate
```bash
git clone https://github.com/peralcortes21-arch/RStudio.git
cd RStudio
```

### Step 2: Configure API Keys
```bash
# Copy the example config
cp config/.env.example config/.env.local

# Edit with your API keys
# (DO NOT commit .env.local — it's gitignored)
```

Edit `config/.env.local`:
```
CLAUDE_API_KEY=sk-...  # From https://console.anthropic.com
KIE_API_KEY=...        # From https://kie.ai
```

### Step 3: Open the App
```bash
# Option A: Direct file open
open src/index.html

# Option B: Local server (recommended)
python3 -m http.server 3000
# Then visit: http://localhost:3000/src/index.html
```

### Step 4: Login
Use any demo account:
- **Email**: `nicolas@cliender.com` (or pablo/toni/dan)
- **Password**: `Master123`

---

## File Structure Explained

```
RStudio/                    # Project root
│
├── src/
│   └── index.html         # Main app (single 165KB file, all-in-one)
│                          # Contains HTML + CSS + JS
│
├── assets/
│   └── images/
│       └── logo.jpg       # App logo (15KB)
│
├── docs/                  # Documentation
│   ├── SETUP.md          # (This file)
│   ├── DESIGN_SYSTEM.md  # Visual design reference
│   ├── SPEC_DISEÑO_RSTUDIO.md
│   └── QUICK_START.md
│
├── config/
│   ├── .env.example      # Config template (tracked in git)
│   └── .env.local        # Your local config (gitignored)
│
├── .gitignore            # What to exclude from git
├── LICENSE               # MIT License
├── README.md             # Project overview
└── setup.sh             # Setup automation script
```

---

## Configuration Details

### Environment Variables

**CLAUDE_API_KEY**
- Required for: AI-powered prompt generation, post creation, document analysis
- Get from: https://console.anthropic.com
- Format: `sk-...` (starts with `sk-`)

**KIE_API_KEY**
- Required for: Image generation (all 3 AI models)
- Get from: https://kie.ai/dashboard/api-keys
- Format: Alphanumeric token

### localStorage Persistence

The app stores everything locally in the browser's localStorage:
- Key: `cliender_v4` (all data)
- Key: `cliender_session` (auth session)
- Key: `cliender_kie_key` (image gen API key)
- Key: `cliender_claude_key` (content gen API key)

**Note**: Data is NOT synced to the cloud. Clearing browser data = losing everything.

---

## Running with a Local Server

**Python 3:**
```bash
cd RStudio
python3 -m http.server 3000
# Visit: http://localhost:3000/src/index.html
```

**Node.js:**
```bash
cd RStudio
npx http-server src -p 3000
# Visit: http://localhost:3000/index.html
```

**Ruby:**
```bash
cd RStudio
ruby -run -ehttpd . -p3000
# Visit: http://localhost:3000/src/index.html
```

---

## Usage Workflow

### 1. Create a Client
- Go to **Clientes** tab
- Click **+ Crear cliente**
- Fill: name, industry, target audience, brand colors, voice tone
- (Optional) Upload brand documents for AI analysis

### 2. Create a Calendar
- Go to **Calendarios** tab
- Click **+ Nuevo calendario**
- Name it, assign client
- Choose model (Nano Banana 2, Nano Banana Pro, or GPT Image 2)
- Choose format (1:1, 4:5, 9:16, etc.)

### 3. Generate Content with AI
- **Option A (Batch)**: Write a prompt → **✦ CREAR CALENDARIO CON IA** → generates 3 posts per angle
- **Option B (Manual)**: Click **+ Post** → Edit manually → Use **✦ Rellenar con IA** for auto-fill

### 4. Generate Images
- For each post, click **⬡ Crear imagen**
- Or bulk: **⬡ Todas las imágenes**
- Monitor progress in the status bar

### 5. Download & Export
- Select posts
- Download as PNG or raw image
- Export calendar metadata

---

## Troubleshooting

**Images not generating?**
- Check KIE_API_KEY in config/.env.local
- Async models (Flux, Mystic) take 15-30s per image
- Check browser console for errors

**Posts not saving?**
- Verify localStorage is enabled
- Check available storage space (localStorage limit ~5-10MB)
- Try refreshing the page

**Logo not showing?**
- Ensure file path is correct: `assets/images/logo.jpg`
- Check browser console for 404 errors
- If using file:// protocol, switch to http://localhost

**API Key Errors?**
- Verify keys in config/.env.local
- Make sure keys are valid (check dashboard)
- Keys are stored in browser's localStorage on first save

---

## Git Workflow

```bash
# Make changes
# ... edit src/index.html, docs/, etc.

# Stage changes
git add .

# Commit with conventional format
git commit -m "type: description
- bullet point 1
- bullet point 2"

# Types: feat (feature), fix (bug fix), docs (docs), style (CSS), refactor

# Push to remote
git push origin main

# Create PR if needed
gh pr create --title "Feature: ..." --body "..."
```

---

## Deployment

The app is a **single static HTML file** — deploy anywhere:

**GitHub Pages:**
```bash
git push origin main
# Pages auto-deploys from /src/index.html
```

**Vercel:**
```bash
vercel deploy
```

**Netlify:**
```bash
netlify deploy --prod
```

**Simple Server:**
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000/src/index.html
```

---

## Security Notes

✅ All data stored locally (localStorage)  
✅ API keys NOT logged or tracked  
✅ No third-party analytics  
✅ No cookies (only localStorage)  
⚠️ **Don't share .env.local with API keys in it**  

---

## Support

- **Docs**: See `/docs/` folder
- **Issues**: https://github.com/peralcortes21-arch/RStudio/issues
- **Discord**: (coming soon)

---

**Last Updated**: April 29, 2026  
**Status**: ✅ Production Ready
