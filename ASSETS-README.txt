ESTRUCTURA DE ASSETS (v3) — estado final
=========================================
Todas las rutas del HTML apuntan a assets/<proyecto>/ y TODOS los archivos
locales existen y resuelven. Listo para subir a GitHub tal cual.

Previews del index  -> assets/<proyecto>/cover.png   (los 8 proyectos)

Detalle por proyecto:
  tastemakers : cover.png, spec.png, spec2.png
  hidroroots  : cover.png, benchmark.webp, wireframes.webp, ui-desktop.webp, ui-mobile.webp
  progresol   : cover.png, flow-checkout.png, home-variants.png
  unacem360   : cover.png, wireframes.webp, ui-desktop.webp, ui-mobile.webp
  cantera     : cover.png, lottie-product-selection.mp4, lottie-choosing-quote.mp4, lottie-store-location.mp4
  vitamin     : cover.png, motion-tokens.png, components.webp, icons.png
  gawq        : cover.png, pull-to-refresh.mp4, splash-screen.mp4, web-transition.mp4
  cometa      : cover.png   (el video es un embed de YouTube)

UNICO asset no-local:
  case-cantera.html -> el video "Complete interactions" (overview) sigue apuntando
  a la URL de Contra porque no había un archivo local. Si quieres tenerlo local,
  descarga:
    https://media.contra.com/video/upload/fl_progressive/q_auto:best,w_1200/sajnvfamvi1eu3xaktuy.mp4
  guárdalo como assets/cantera/overview.mp4 y en case-cantera.html cambia ese src
  por: ./assets/cantera/overview.mp4
