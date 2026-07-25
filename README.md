# Jordan Collao — Portfolio

A single-page portfolio with 8 case studies and 4 lab experiments.

---

## 📁 File inventory

### Production files (deploy these)

```
portfolio-jordan/
├── portfolio.html              ← Home page (entry point)
│
├── case-tastemakers.html       ← Case 1: Claude Design / TasteMakers
├── case-progresol.html         ← Case 2: Progresol Plus
├── case-vitamin.html           ← Case 3: Vitamin DS
├── case-gawq.html              ← Case 4: Gawq App
├── case-aunalatam.html         ← Case 5: Auna Latam
├── case-foodie.html            ← Case 6: Foodie App
├── case-ticlea.html            ← Case 7: Ticlea
├── case-cometa.html            ← Case 8: Cometa Mexico
│
├── lab-motion-tokens.html      ← Lab 1: Motion Tokens Generator
├── lab-image-compressor.html   ← Lab 2: Image Compressor
├── lab-luz.html                ← Lab 3: Luz App
├── lab-audio-extractor.html    ← Lab 4: Audio Extractor
│
├── motion-tokens-generator.html ← The actual Motion Tokens tool (live)
│
└── assets/
    ├── jordan-avatar.jpg
    └── jordan-portrait.jpg
```

### Local-only files (DO NOT deploy)

```
admin.html         ← Content editor (use locally only)
case-template.html ← Template reference (not linked from anywhere)
README.md          ← This file
```

---

## 🚀 Deploy to Netlify (5 minutes)

1. Visit https://app.netlify.com/drop
2. Drag the folder `portfolio-jordan/` into the drop zone
   - **IMPORTANT**: Remove `admin.html` from the folder first
   - You can keep `case-template.html` (harmless, just unused)
3. Wait ~30-60 seconds for the upload
4. Click the URL to see your live site
5. Sign up to claim the site (use GitHub login if possible)
6. Site settings → Change site name → `jordancollao`
7. Your URL: `https://jordancollao.netlify.app`

---

## ✏️ How to edit content

### Quick edits (via admin.html — recommended)

1. Open `admin.html` locally (double-click)
2. Drag the HTML file(s) you want to edit into the sidebar
3. Edit the fields
4. Click "save this file" → downloads updated HTML
5. Replace the file in your `portfolio-jordan/` folder
6. To deploy: re-drag the folder to Netlify

### Manual edits (via VS Code or any editor)

You can also edit HTMLs directly. Just remember:
- Don't break the structure
- Don't remove `id` attributes (the admin uses them)
- Keep the CSS classes intact

---

## 🔧 Live URL switches

Each case and lab has two toggle attributes on `<body>`:

```html
<body
  data-has-live="true"
  data-has-github="true"
  data-live-url="https://..."
  data-github-url="https://...">
```

When `data-has-live="true"`, the green "view live" button appears.
When `data-has-github="true"`, the outline "view github" button appears.

### Current state

| Page                     | Live | GitHub | URLs |
|--------------------------|------|--------|------|
| TasteMakers              | OFF  | OFF    | -    |
| Progresol Plus           | ON   | OFF    | progresolplus.pe |
| Vitamin                  | OFF  | OFF    | -    |
| Gawq                     | OFF  | OFF    | -    |
| Auna Latam               | ON   | OFF    | auna.org/pe |
| Foodie                   | OFF  | OFF    | -    |
| Ticlea                   | OFF  | OFF    | -    |
| Cometa                   | OFF  | OFF    | -    |
| Lab: Motion Tokens       | ON   | ON     | jordancollao.github.io/motion-tokens-playground/ |
| Lab: Image Compressor    | ON   | ON     | jordancollao.github.io/image-optimizer/ |
| Lab: Luz                 | ON   | ON     | jordancollao.github.io/luz-app/ |
| Lab: Audio Extractor     | ON   | ON     | jordancollao.github.io/extractor-audio/ |

---

## 🖼️ Image placeholders

The site uses placeholder SVGs for project preview hovers, lab card images, and gallery slots within case pages. To replace a placeholder with a real image:

1. Place your image in the appropriate subfolder, e.g.:
   ```
   assets/
   ├── home/             ← project preview images
   ├── tastemakers/      ← Case-specific images
   ├── progresol/
   ├── vitamin/
   ...
   ```
2. Use `admin.html` to set the path on each image field
3. Save the HTML
4. Re-deploy to Netlify

---

## ⚙️ Tech stack

- **HTML / CSS / JS** — Vanilla, no framework
- **Fonts**: Geist (display) + JetBrains Mono (monospace) from Google Fonts
- **No build step**: open files directly in browser

---

## 📞 Contact

- WhatsApp: +51 960 280 858
- Email: jmotionux@gmail.com
- LinkedIn: linkedin.com/in/jordancollao
