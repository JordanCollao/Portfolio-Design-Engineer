# DESIGN-BRIEF — Portfolio Jordan Collao (rediseño "Timeline")

Brief de traspaso para continuar el rediseño del portfolio en Claude Code.
Referencia visual exacta: `prototypes/redesign-home-timeline.html` (prototipo aprobado del home).
Idioma de trabajo con Jordan: **español**. Idioma del sitio: **inglés**.

---

## 1. Contexto

- **Quién:** Jordan Collao, Design Engineer & Motion Designer, Lima (Perú). Estudio: **Chocolab Studio**. IconScout: `jlossst` (Elite Contributor).
- **Repo:** `JordanCollao/Portfolio-Design-Engineer` — sitio estático (HTML/CSS/JS sin framework), deploy en Netlify.
- **Archivos del sitio:** `index.html`, 8 cases (`case-*.html`), 4 labs (`lab-*.html`), `assets/`.
- **Concepto del rediseño:** el sitio como una **línea de tiempo de After Effects**. Capas, keyframes (rombos), playhead azul, timecodes. Cada interacción se siente como "mover algo en una timeline".
- **Por qué se dejó el diseño anterior:** fondo casi negro + verde ácido + labels mono es un look muy genérico. El nuevo es claro, frío y con un solo acento azul.

## 2. Reglas que no se negocian

1. **Mantener la misma navegación:** brand (avatar + nombre + rol), links `portfolio · lab · about · experience · contact`, CTA `let's talk` (WhatsApp). No agregar links al menú sin preguntar. **Excepción (pedida por Jordan):** en las páginas internas (cases) los links del header son las secciones de esa página (`#context`, `#product`…), generados desde las etiquetas `/label` de cada `.case-section`; el de la sección visible se marca con la línea azul. El brand y "← All projects" llevan al home.
2. **Conservar la transición de cortina entre páginas** del `index.html` actual (incluye el pre-cover que tapa el scroll restore al volver de un case con `sessionStorage 'curtain-transition'`) y el loader de primera visita.
3. **Rutas locales:** en producción todas las imágenes van a `./assets/...`. El prototipo usa URLs externas (raw de GitHub, Contra, IconScout) solo para previsualizar.
4. **`prefers-reduced-motion`:** toda animación debe tener su versión estática.
5. **Sin parallax.** Se probó y Jordan lo rechazó explícitamente.
6. Ver propuestas visuales antes de implementar cambios grandes. Cambios focalizados, no reescrituras amplias.
7. **Nada de guión largo (—)** ni otros tics de texto generado con IA ("not just X but Y", "sits at the intersection", flechas → en prosa, cierres de relleno). Ni en copy, ni en títulos, alt, data-* o comentarios. Nombres de proyecto: nombre en negrita + disciplina como dato ("HidroRoots" / "Responsive web · 2025, Perú"). Las flechas solo en timecodes mono.
8. **Ningún texto cortado.** Los títulos usan `line-height` < 1, así que los descendentes (g, p, y) y los acentos sobresalen de su caja: nunca recortar texto con `overflow` o `clip-path: inset(0)`. Un wipe solo recorta en horizontal (`inset(-50% X -50% -10%)`). Antes de dar algo por terminado, correr `await checkClippedText()` de `tools/check-clipped-text.js` en la consola: debe devolver `clipped: 'none'` a 390, 820 y 1440 px.
9. **Puestos y roles en Title Case:** "Design Engineer & Motion Designer", "UX Motion", "UI Designer Senior", "Visual Design Evaluator", etc. Cuando "Lottie" es un rol o foco se escribe **"Lottie Expert"** (Focus del hero, Role de los cases). Si "Lottie" es el formato ("Lottie animations"), queda igual. Las disciplinas y tipos usados como etiqueta también van en Title Case ("Responsive Web", "App Design", "Lottie Motion", "Public Tool", "Lab"): títulos H1, `<title>`, timeline del home, tarjetas prev/next, estado y Type de los labs. En prosa y en los títulos de sección (h2) siguen en minúscula ("with subtle Lottie motion", "App design").

## 3. Sistema visual

```css
:root {
  --bg: #E4E7EC;      /* fondo página, gris claro frío */
  --panel: #F3F4F6;   /* header, paneles */
  --ink: #12141A;     /* texto principal, botones sólidos, secciones oscuras */
  --ink-2: #4A505C;   /* texto secundario */
  --ink-3: #7A808C;   /* labels, meta */
  --rule: #C5CAD3;    /* divisores */
  --playhead: #3557FF;/* único acento: playhead, links, hover */
  --sans: 'Schibsted Grotesk', system-ui, sans-serif;  /* 400/500/700/800 */
  --mono: 'IBM Plex Mono', ui-monospace, monospace;    /* 400/500, solo para timecodes/datos */
  --ease: cubic-bezier(0.65, 0, 0.35, 1);
  --gutter: clamp(20px, 4vw, 48px);
  /* Colores de etiqueta de After Effects, uno por proyecto/empresa */
  --l1: #E8B04B; --l2: #7CC7A0; --l3: #6FB6D9; --l4: #9C8FD9;
  --l5: #F0A36B; --l6: #D97FA8; --l7: #5FA8A0; --l8: #C9A3E0;
}
```

- Títulos: Schibsted Grotesk 800, `letter-spacing` negativo, `line-height` ~1.05.
- Mono solo para datos reales (timecodes, años, rutas). No como decoración.
- Radios: 6px botones, 10px cards/media.
- Secciones oscuras (`--ink`): IconScout y Contact.

## 4. Interacciones globales

- **Botones (`.btn`, CTA del nav):** al hover, un relleno azul recorre el botón de izquierda a derecha (scrub de capa) y aparece un keyframe (rombo) junto al texto. `:active` → `scale(.97)`. El ghost se rellena de tinta.
- **Links de texto:** línea fina debajo; al hover, una barra azul de 2px la recorre y el texto se pinta de azul.
- **Nav:** línea azul que crece desde la izquierda bajo cada link.
- **Focus visible:** igual que hover (accesibilidad).

## 5. Secciones del home (en orden)

### 5.1 Hero (persona primero)
- Grid 50/50. Izquierda: estado "Open to work, Lima and remote", **nombre gigante "Jordan / Collao"**, rol "Design engineer & motion designer", intro, bloque de datos tipo panel de propiedades (Based in / Experience / Focus), botones "Contact me" y "See portfolio".
- Derecha: **retrato a todo el alto del hero** dentro de un "viewer" (guías de área segura punteadas + cruz central), con una **capa azul (`--playhead`) desplazada 22px abajo-derecha** detrás, con 2 keyframes blancos en su borde. Debajo: `jordan-collao.aep` + timecode.
- Animación de entrada: un playhead azul barre el hero, el contenido se revela con `clip-path` y el timecode corre de `0:00:00:00` a `0:00:01:12`.
- Hover (desktop): tilt 3D en capas — el marco se inclina, la foto deriva al lado contrario, las guías al otro, glare suave que sigue al cursor, la capa azul se mueve opuesta. Táctil: leve inclinación al hacer scroll.
- Móvil: la foto va primero (4:5, a casi todo el ancho), luego el texto.
- Dato a confirmar: "8+ years, 7 teams in Perú, Chile and the US".

### 5.2 Portfolio (timeline)
- **Desktop:** panel tipo timeline. Columna izquierda con el nombre de cada proyecto; a la derecha, una barra por proyecto ubicada en el eje 2021 → now según su periodo real, con keyframes en los extremos y un playhead "now". Viewer lateral sticky que carga imagen/video, descripción y "Open case study" al hacer hover/focus.
- Hover de fila: fondo blanco, borde izquierdo del color del proyecto, nombre se desplaza 4px, chip crece, barra se engrosa; las demás barras bajan a 45% de opacidad.
- **Tablet (≤1080):** viewer oculto; cada fila muestra miniatura + "View case study".
- **Móvil (≤760): timeline vertical.** Cards independientes (imagen 16:10 arriba, título, año/país, "View case study", mini barra "2021 → now"). A la izquierda corre una columna vertebral con **un keyframe por proyecto** conectado a su card; un **playhead azul llena la columna** hasta el centro de la pantalla al hacer scroll. La card en el centro se activa (fondo blanco, borde de color, leve elevación, zoom de imagen, keyframe relleno); las demás bajan a 62%.

Orden y periodos (fracción de año) — **el orden es el de Jordan, no cronológico**:

| # | Proyecto | Archivo | País | Periodo |
|---|---|---|---|---|
| 1 | Prompt Designer — TasteMakers/Anthropic (active) | `case-tastemakers.html` | USA | 2026 → now |
| 2 | Web Responsive — HidroRoots | `case-hidroroots.html` | Perú | 2025.58 → now |
| 3 | App Design — Progresol Plus | `case-progresol.html` | Perú | 2023.42 → now (jun 2023, activo) |
| 4 | Web Responsive — Unacem 360 | `case-unacem360.html` | Perú · Ecuador · Chile · USA | 2026.5 → now (jul 2026, activo) |
| 5 | Web Responsive — Cantera | `case-cantera.html` | Perú | 2026.25 → 2026.29 |
| 6 | Vitamin Design System — Auna | `case-vitamin.html` | Perú · Colombia · México | 2021.5 → 2022.5 |
| 7 | Interaction Design — Gawq App | `case-gawq.html` | USA | 2022 → 2022.6 |
| 8 | Motion Design — Cometa | `case-cometa.html` | México | 2023.78 → 2023.92 |

Los meses de Progresol, Unacem 360, Vitamin y Gawq son aproximados: **pedir a Jordan los periodos reales**.

### 5.3 Lab
- 4 cards tipo "clips en un bin": imagen, versión (`v0.2` etc.), título, descripción, link.
  - Motion Tokens Generator → `lab-motion-tokens.html` (`assets/home/lab-motion.png`)
  - Image Compressor → `lab-image-compressor.html` (`lab-image.png`)
  - Luz App (private) → `lab-luz.html` (`lab-luz.png`)
  - Audio Extractor → `lab-audio-extractor.html` (`lab-mp3.png`)
- Desktop: tilt 3D hacia el cursor (hasta ~16°/12°) + leve escala y sombra. Táctil: se inclinan levemente según su posición al hacer scroll.

### 5.4 About
- Izquierda: animación **Dynamic Geometry 02** recreada en SVG + CSS (sin caption). Círculo rosa `#FD506F`, cuadrado azul `#4B6FF4` (al 90% de escala), medio círculo amarillo `#FBBC12`. Giran 90° horario 4 veces por loop de 2s con `cubic-bezier(1, 0, 0.44, 1)`; a mitad de giro el cuadrado y el círculo se acercan al centro; el círculo va ~3 cuadros atrasado. Si aparece el `.json` original, reemplazar por el Lottie real.
- Derecha: "Hi, I'm Jordan, a designer from Perú who animates for a living.", 2 párrafos, botones "Download CV" y "View LinkedIn".

### 5.5 Experience
- Encabezado "Experience" + "8+ years, 2018 to now", etiquetas Period / Role / eje de años. **Un solo divisor.**
- Filas: periodo (+ "active"), empresa, rol, descripción, barra de duración en el eje 2018 → now, ubicación.
- **Reveal por scroll:** el playhead azul recorre cada fila y la va descubriendo (cobertura del color de página que se retira detrás de la línea, controlada por la variable `--p` registrada con `@property`), luego se dibuja la barra. Filas que entran juntas se revelan en cascada (0.18s).
- Empresas: TasteMakers (2026–now), Grupo UNACEM (2023–now), Cencosud S.A. (2022–2023, Santiago), Auna (2021–2022), IconScout (2020–now), Cajalab (2020–2021), Ludik (2018–2020).

### 5.6 IconScout (fondo oscuro)
- Título "Chocolab Studio on IconScout", intro, badge "Elite Contributor, @jlossst".
- "Render queue": **4,540 Lottie animations** y **15,780 Icons** (cifras exactas, sin "+"), con contador que sube, barras que se llenan y estado "Live on IconScout" en verde al entrar en pantalla.
- **Carrusel de una fila en loop continuo** con 10 Lottie propios servidos desde `assets/iconscout/*.json` (Technology dollar-01 y check-07, StartUp default-01, Security v2 default-13, Productivity check-01, Natural 05, Medical add-06, Education add-01, Ecommerce check-06, Icon Search 05), renderizados con `lottie_light` (cdnjs), que se carga solo cuando la sección está cerca. Los datos se cargan como script desde `assets/iconscout/reel-data.js` (no con `fetch`), para que también funcione abriendo `index.html` desde el disco. **Para cambiar el carrusel:** reemplaza el JSON en `assets/iconscout/` (mismo nombre) o edita `tools/reel.json` (archivo, título, colección, url, en orden) y ejecuta `python3 tools/build-reel.py`. Regenera `reel-data.js` y las piezas del carrusel en `index.html` (entre `<!-- reel:start -->` y `<!-- reel:end -->`); no editar esa zona a mano. Cada pieza solo se reproduce mientras es visible dentro del carrusel; con reduced motion se muestra un cuadro fijo. Hover: el carrusel frena hasta detenerse, la pieza se eleva y crece, las demás se atenúan; al salir, retoma. Táctil: tocar pausa, retoma a los 1.6s. Por ahora cada pieza enlaza al perfil de IconScout (faltan las URLs individuales).
- Tags de colecciones + botón "Browse the library" → `https://iconscout.com/contributors/jlossst`.

### 5.7 Contact + footer
- "Let's build something." + WhatsApp `+51 960 280 858`, `jmotionux@gmail.com`, LinkedIn `/in/jordancollao`.
- Footer: © 2026 Jordan Collao, made in Perú + WhatsApp, LinkedIn, IconScout, Email.

## 6. Pendientes / a confirmar con Jordan

- [x] **Archivo del CV**: `assets/EN_CV_Jordan-Collao_2026-last.pdf`.
- [x] **Cifras de IconScout:** 4,540 Lottie y 15,780 íconos (confirmado por Jordan, oct 2026).
- [x] **Año de Cometa:** 2023 (confirmado por Jordan).
- [x] **Periodos reales:** Progresol jun 2023 → now, Unacem 360 jul 2026 → now; Vitamin y Gawq confirmados como están. "now" se calcula con la fecha actual (`data-end="now"`).
- [x] Previews de IconScout: reemplazadas por los JSON locales en `assets/iconscout/`.
- [x] Carrusel IconScout: sin URLs individuales por decisión de Jordan; todas enlazan al perfil.
- [x] Covers de HidroRoots, Unacem 360 y Gawq: el home usa los `cover.png` locales (los `.webp` siguen sin existir; revisar si los cases los referencian).

## 7. Próximos pasos (en orden)

1. **`index.html` de producción:** portar el prototipo, conservando la cortina y el loader del `index.html` actual, con rutas locales en `./assets/`.
2. **Probar** en desktop, tablet (820px) y móvil (390px): sin scroll horizontal, sin errores en consola, transiciones Home ↔ Case funcionando.
3. **Cases (8):** aplicar el sistema (paleta, tipografía, botones, links, playhead) manteniendo su contenido y la navegación prev/next en el orden de la tabla. Proponer el diseño de un case primero y validarlo con Jordan antes de replicarlo.
   - **Hecho (oct 2026):** los 8 cases usan `assets/css/case.css`, `assets/js/case.js` y `assets/js/transition.js`. Hero con propiedades, barra del proyecto en el eje 2021 → now (`body[data-start][data-end]`), cover en viewer, secciones con etiqueta sticky, prev/next como tracks. Originales en `_backup/`.
   - Cometa: 2023 confirmado. `overview.mp4` no está en el repo: se quitó la sección "Complete interactions" de Cantera.
4. **Labs (4):** mismo sistema.
   - **Hecho (oct 2026):** los 4 labs usan la misma plantilla (`case.css`, `case.js`, `transition.js`): versión y tipo en el estado, botones "Try it live" / "View on GitHub" (los 8 enlaces verificados con 200), barra en la timeline, captura dentro de su sección, header con las secciones del lab, prev/next en el orden del home y "← All experiments" a `#lab`. Originales en `_backup/`.
   - Favicon: el gráfico Dynamic Geometry 02 del About (`assets/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` y `/favicon.ico`), enlazado en las 14 páginas.
5. Commit y push a GitHub; Netlify despliega.
