# Jordan Collao, Design Engineer & Motion Designer

Portfolio site: **https://jordancollao.vercel.app**

A static site (HTML, CSS and JavaScript, no framework or build step) designed as an After Effects timeline: layers, keyframes, a blue playhead and timecodes. Deployed on Vercel from the `main` branch.

## Pages

| Page | Files |
|---|---|
| Home | `index.html` |
| 8 case studies | `case-*.html` |
| 4 lab experiments | `lab-*.html` |
| Not found | `404.html` |

Case and lab pages share `assets/css/case.css`, `assets/js/case.js` (timeline track, section nav, reading playhead) and `assets/js/transition.js` (the page curtain).

## Updating content

- **Images:** replace the file in `assets/<project>/` keeping the same name and the `.webp` extension. Max width 2400px, WebP quality around 80. Covers work best at 16:10 with the subject centered.
- **IconScout carousel:** replace a Lottie JSON in `assets/iconscout/`, or edit `tools/reel.json` (file, title, collection, url, in carousel order), then run:

  ```bash
  python3 tools/build-reel.py
  ```

- **Project periods:** each case reads `data-start` / `data-end` on `<body>` (fractional years; `"now"` for active work). The home timeline uses the same attributes on each `.track`.

## Checks before publishing

Serve the folder and open it in a browser:

```bash
python3 -m http.server 8765
```

Then run `await checkClippedText()` from `tools/check-clipped-text.js` in the console. It must report `clipped: 'none'`.

`DESIGN-BRIEF.md` holds the design system and the editorial rules. It stays in the repo but is not published (see `.vercelignore`).
