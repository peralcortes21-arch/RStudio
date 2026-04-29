# RStudio — AI-Powered Content Calendar Generator

Professional content calendar creation & management tool with AI-powered post generation using Claude AI and KIE.AI image generation.

**Status**: ✅ Production Ready | 🔐 Authenticated | 🎨 Premium UI

## Quick Start

```bash
# 1. Setup credentials
cp config/.env.example config/.env.local
# Edit config/.env.local with your API keys

# 2. Open the app
open src/index.html

# 3. Login with demo credentials
# Email: nicolas@cliender.com
# Password: Master123
```

## Project Structure

```
RStudio/
├── src/                    # Application source
│   └── index.html         # Single-file web app
├── assets/                # Static assets
│   └── images/
│       └── logo.jpg       # App logo
├── docs/                  # Documentation
│   ├── README.md          # (This file)
│   ├── DESIGN_SYSTEM.md   # Visual design tokens
│   ├── SPEC_DISEÑO_RSTUDIO.md
│   └── QUICK_START.md
├── config/                # Configuration
│   ├── .env.example       # Template (commit)
│   └── .env.local         # Local config (gitignored)
├── LICENSE                # MIT License
└── setup.sh              # Setup helper
```

## Features

✨ **AI Content Generation**
- Claude AI prompt generation
- Batch content calendar creation
- Multiple content angles (Sales, Tech, Brand, Education, Promo)

🎨 **Visual Design**
- Premium dark theme with electric indigo accents
- 72px logo integration
- Glassmorphism components
- Spring animations

🔐 **Authentication**
- 4 hardcoded demo users (@cliender.com)
- Session persistence
- Secure logout

🖼️ **Image Generation**
- KIE.AI integration
- 3 AI models: Nano Banana 2, Nano Banana Pro, GPT Image 2
- 7 aspect ratio formats
- Batch processing with progress

📱 **Content Management**
- Client profiles with brand guidelines
- Reference images for AI guidance
- Calendar organization
- Post editor with preview

## Authentication

**Demo Users** (all use password: `Master123`):
- `nicolas@cliender.com`
- `pablo@cliender.com`
- `toni@cliender.com`
- `dan@cliender.com`

## API Keys Required

**Claude API** (for content generation)
- Get from: https://console.anthropic.com
- Store in: `config/.env.local` → `CLAUDE_API_KEY`

**KIE.AI API** (for image generation)
- Get from: https://kie.ai
- Store in: `config/.env.local` → `KIE_API_KEY`

## Tech Stack

- **Frontend**: Vanilla JavaScript (single-file)
- **Storage**: localStorage (client-side only)
- **Styling**: CSS with design tokens
- **Typography**: Plus Jakarta Sans, Fraunces serif, IBM Plex Mono

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development

```bash
# Clone repo
git clone https://github.com/peralcortes21-arch/RStudio.git
cd RStudio

# Setup
./setup.sh

# Development
open src/index.html

# Commits
git add .
git commit -m "type: description"
git push origin main
```

## File Size

- `src/index.html`: ~165KB (single-file, all-in-one)
- `assets/images/logo.jpg`: ~15KB
- Total bundle: ~180KB

## Privacy

- ✅ All data stored locally (localStorage)
- ✅ No data sent to third-party servers
- ✅ API calls go directly to Anthropic & KIE.AI
- ✅ No analytics or tracking

## License

MIT License - see LICENSE file

## Support

Issues & feature requests: https://github.com/peralcortes21-arch/RStudio/issues

---

**Made with ✦ by CLIENDER Studio**  
*Automate your social media, empower your brand.*
