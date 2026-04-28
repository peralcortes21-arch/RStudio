# RStudio — AI-Powered Social Media Calendar & Content Generator

**RStudio** is a professional-grade, single-file web application for creating, managing, and automatically generating Instagram content calendars using Claude AI and Freepik image generation.

## Features

✦ **Prompt Studio** — Generate entire content calendars from a single prompt
- AI-powered post creation with psychological angles (Pain, Fear, Results, Proof, Desire)
- Automatic Freepik prompt generation
- Batch image generation with multiple AI engines
- 15 predefined content angles (SALES, TECH, BRAND, EDU, PROMO)

📋 **Client Management**
- Complete client profiles: brand voice, colors, industry, audience
- Document analysis with Claude Vision
- Link calendars to clients for smart content generation

🎨 **Visual References**
- Upload and organize brand reference images
- AI-powered automatic tagging
- Use references to guide both prompts and Mystic model styling

📱 **Post Editor**
- Create posts manually or with AI assistance
- Full control over hooks, copy, CTAs, and visual concepts
- Real-time preview

⬡ **Image Generation**
- 7 AI engines: Classic, Flux Dev/Turbo/Pro, Mystic, Imagen3, Seedream
- Support for 7 common formats (1:1, 4:5, 9:16, 16:9, etc.)
- Batch generation with progress tracking
- Download as PNG or raw image

✓ **All Data Local**
- Fully client-side — localStorage based
- No server required
- Works completely offline after first load

## Quick Start

1. Open `index.html` in a modern browser
2. Create a client profile (e.g., your brand)
3. Go to **Calendarios** → **Prompt Studio**
4. Write a prompt describing your desired content
5. Select content angles you want
6. Click **✦ CREAR CALENDARIO CON IA**
7. Customize and export

## Demo

A demo client "Dental Premium Madrid" is preloaded with 5 sample posts so you can immediately:
- Generate Freepik prompts for existing posts
- Create images with the batch image generator
- Explore the full workflow

## API Keys Required

Place your API keys in the app (they stay in your browser):

- **Freepik API**: Get from https://www.freepik.com/api
  - Used for all image generation (Classic, Flux, Mystic, Imagen3, Seedream)
  
- **Claude API**: Get from https://console.anthropic.com
  - Used for prompt generation, post creation, client document analysis

## Usage

### Creating a Calendar with AI

1. **Clients** tab → Create or select a client
2. **Calendarios** → **Prompt Studio** tab
3. Write what you want (e.g. "Instagram posts for a premium dental clinic, navy blue and gold colors, professional but approachable")
4. Choose content angles (SALES 01-05 by default, TECH, BRAND, etc.)
5. Pick image style (dark editorial, cinematic, neon, etc.)
6. Optionally check "Auto-generate Freepik prompts" and "Auto-generate images"
7. Click **✦ CREAR CALENDARIO CON IA**

Claude will:
- Generate 3 posts per angle with hooks, subtitles, body copy, CTAs
- If enabled: create Freepik prompts for each post
- If enabled: generate all images automatically

### Manual Post Generation

**Generador** tab:
- Select a calendar (or create one)
- Click **"+ Post"** to add manually
- Use **"✦ Rellenar con IA"** button (appears if calendar has a client) to auto-fill content
- Click **"✦ Prompt IA"** to generate Freepik prompt
- Click **"⬡ Crear imagen"** to generate image

**Batch operations:**
- **"✦ Todos los prompts"** — generate Freepik prompts for all visible posts
- **"⬡ Todas las imágenes"** — generate all images (auto-generates missing prompts first)

### Managing References

1. Go to **Referencias** tab
2. Upload brand/style images via drag-drop
3. Claude auto-analyzes and tags each one
4. Click to select/deselect
5. Selected refs will:
   - Guide prompt generation
   - Be applied as style reference in Mystic model
   - Show up in Prompt Studio context

## Architecture

- **Single HTML file** — no build process, no dependencies
- **Canvas grid background** — animated node grid with pulsing data points
- **localStorage persistence** — all data saved locally
- **Dark premium UI** — Syne + JetBrains Mono fonts, custom cursor, glassmorphism
- **Responsive design** — works on desktop, tablet, mobile

## File Structure

```
RStudio/
├── index.html          # Entire application (single file)
├── README.md           # This file
└── LICENSE             # MIT License
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires localStorage and Fetch API

## Privacy & Data

- All data stays in your browser (localStorage)
- API calls go directly to Freepik & Anthropic
- No data sent to third-party servers
- No analytics or tracking

## Troubleshooting

**Images not generating?**
- Check Freepik API key is correct
- Async models (Flux, Mystic) may take 15-30s per image
- Check browser console for error messages

**Posts not saving?**
- Verify localStorage is enabled
- Check available storage space
- Try refreshing the page

**Prompt quality issues?**
- Add more detail to your prompt
- Upload reference images for better context
- Use the client profile feature for consistent voice

## Customization

Edit the `DEFAULT_ANGLES` array in the JavaScript to add your own content angles:

```javascript
{key:'YOUR_01', label:'Your Label', desc:'Description', sel:true}
```

Edit `STUDIO_STYLE_PRESETS` to add image style templates.

## License

MIT License — see LICENSE file

## Support

For issues, feature requests, or contributions, please visit the GitHub repository.

---

**Made with ✦ by CLIENDER Studio**  
*Automate your social media, empower your brand.*
