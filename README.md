# Jordan Collao, Design Engineer & Motion Designer

Portfolio site: **https://jordancollao.vercel.app**

A static site (HTML, CSS and JavaScript, no framework or build step). Warm black, cream and lime, condensed display type, and a record player that plays Jordan's Lottie animations as a playlist. Deployed on Vercel from the `main` branch.

## Pages

| Page | Files |
|---|---|
| Home | `index.html` |
| 8 case studies | `case-*.html` |
| 4 lab experiments | `lab-*.html` |
| Not found | `404.html` |

Every page uses `assets/css/site.css` and `assets/js/site.js` (cursor, nav, buttons, cards, footer, section nav, reading progress) plus `assets/js/transition.js` (the page curtain). Case and lab pages add `assets/css/case.css`; the home keeps its own CSS and JS inline.

## Updating content

- **Images:** replace the file in `assets/<project>/` keeping the same name and the `.webp` extension. Max width 2400px, WebP quality around 80. Covers work best at 16:10 with the subject centered.
- **IconScout record (playlist):** replace a Lottie JSON in `assets/iconscout/`, or edit `tools/reel.json` (file, title, collection, url, in playlist order), then run:

  ```bash
  python3 tools/build-reel.py
  ```

- **Project facts:** each case and lab shows its role, period and stack in the spec sheet (`<dl>` inside `.spec`). The home cards repeat the period in their footer.

- **CSS / JS changes:** pages load them with a version (`site.css?v=2026100704`). After editing a file in `assets/css/` or `assets/js/`, change that number in every page so browsers fetch the new file instead of a cached one:

  ```bash
  grep -rl "?v=2026100704" --include=*.html . | xargs sed -i '' "s/?v=2026100704/?v=$(date +%Y%m%d)/g"
  ```

- **Links:** anything that leaves the site (WhatsApp, LinkedIn, IconScout, GitHub, lab apps, the CV) opens in a new tab: `target="_blank" rel="noopener"`.

## Checks before publishing

Serve the folder and open it in a browser:

```bash
python3 -m http.server 8765
```

Then run `await checkClippedText()` from `tools/check-clipped-text.js` in the console. It must report `clipped: 'none'`.

`DESIGN-BRIEF.md` holds the design system and the editorial rules. It stays in the repo but is not published (see `.vercelignore`).
