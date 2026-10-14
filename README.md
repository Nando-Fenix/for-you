# Un pequeño espacio para ti

Sitio personal estático con cinco secciones, cuatro chibis y cinco escenarios nocturnos. Conserva negro, plomo y rosa palo. El contenido agradece hechos reales e invita a conversar sin presiones. No requiere backend, paquetes de ejecución ni servicios externos.

## Ejecutar y revisar

Desde `C:\laragon\www\pagina-web`, ejecuta una de estas alternativas independientes de Laragon:

```powershell
python -m http.server 8000 --bind 127.0.0.1
# O, si tienes PHP:
php -S 127.0.0.1:8000 -t .
```

Abre `http://127.0.0.1:8000/` en tu navegador habitual. Ctrl+C detiene el servidor. También puedes abrir `index.html` directamente; algunas funciones del portapapeles requieren un contexto seguro como localhost o HTTPS y ofrecen selección manual como alternativa.

Revisa 390, 768, 1024 y 1440 px: texto, encuadres, cuatro personajes, desplazamiento horizontal y tarjetas abiertas. Comprueba Tab, Enter/Espacio, Escape, foco visible, movimiento reducido y el sitio con JavaScript desactivado. El regalo y el sobre pueden cerrarse y abrirse de nuevo. Los recuerdos y los gustos usan desplegables nativos; las siete preguntas incluyen seis temas y una invitación libre.

## Personalizar y sincronizar

`js/content.js` es la fuente editorial principal. Edita allí títulos, navegación, mensajes, recuerdos, personalidad, gustos, preguntas, invitaciones y carta. Puedes incorporar el nombre real de la destinataria en los mensajes apropiados; no hay un nombre supuesto. Añade artistas, canciones o proyectos concretos únicamente si son preferencias reales que deseas compartir. Las preguntas usan `[id estable, tema, pregunta, invitación]`; conserva IDs únicos si agregas o reordenas contenido.

Después de cada cambio:

```powershell
node scripts/sync-content.js
node scripts/sync-content.js --check
node --test scripts/interactions.test.js scripts/backgrounds.test.js scripts/site.test.js
```

Con JavaScript activo prevalece `content.js`. `index.html` contiene una copia generada para lectura sin JavaScript. No edites manualmente los textos `data-content`, atributos `data-content-attr` ni bloques delimitados por comentarios `content:…`. `js/render-content.js` comparte la estructura de tarjetas, recuerdos y carta entre navegador y sincronizador; escapa los textos al generar HTML. No se repite el agradecimiento completo dentro del regalo.

Sin JavaScript siguen disponibles las cinco secciones, los tres recuerdos y las preguntas y toda la carta. Los controles que necesitan scripts permanecen ocultos. Si una imagen falla, se conserva la ambientación CSS o el marcador del personaje.

## WhatsApp opcional y privacidad

`whatsappNumber` queda vacío. No necesitas configurarlo para leer, responder o copiar. Si autorizas publicar tu número, coloca código de país y número real, solo dígitos, sin `+`, espacios ni separadores. Cualquier dato que incluyas en un repositorio público será visible para otras personas.

Solo las respuestas escritas se incluyen en la vista previa. La visitante puede editarla, copiarla o cancelar. Abrir WhatsApp requiere confirmación explícita, que se revoca al editar el mensaje. La página abre una URL `wa.me` con el texto codificado; el envío lo decide la visitante dentro de WhatsApp. No transmite respuestas a un backend ni las guarda entre visitas.

«Prefiero contártelo conversando» muestra una frase tranquila; no abre formularios, no copia ni envía datos. Tampoco borra lo que se haya escrito en los campos durante esa visita.

## Imágenes y rendimiento

| Sección | Fondo servido |
| --- | --- |
| Portada | `assets/backgrounds/bg-portada.webp` |
| Agradecimiento | `assets/backgrounds/bg-agradecimiento.webp` |
| Sobre mí | `assets/backgrounds/bg-sobre-mi.webp` |
| Sobre ti | `assets/backgrounds/bg-sobre-ti.webp` |
| Carta | `assets/backgrounds/bg-carta.webp` |

Cinco PNG se convirtieron a WebP con calidad 90 y dimensiones originales, pasando de 8 978 774 a 610 462 bytes (aproximadamente 93 % menos). Los PNG se conservan en `assets/backgrounds/`; el sitio no los solicita. `bg-sobre-ti.webp` ya existía y se conserva. La conversión puede repetirse con `python scripts/finalize-assets.py` si Python dispone de Pillow; esta herramienta de mantenimiento no es una dependencia del sitio.

Los cuatro chibis originales mantienen sus rutas, resolución y transparencia. `illustrationsEnabled: true` activa su carga; `false` mantiene los marcadores. La portada tiene prioridad alta; los fondos y personajes secundarios usan carga diferida. El navegador decide cuánto anticipa esa carga.

Las capas separan ambientación, degradados, personajes y contenido. `--scene-image-opacity`, `--scene-image-position`, `--scene-image-fit` y `--scene-mobile-top` controlan los fondos; `--scene-intensity`, `--scene-overlay`, `--scene-texture` y `--scene-light` regulan el respaldo CSS. Las máscaras degradadas suavizan los bordes; Sobre ti conserva su paisaje superior mientras se funde en negro hacia las tarjetas inferiores. No hay parallax ni música automática.

## Pruebas y límites

Las pruebas Node usan un DOM simulado: regalo/carta/relectura, menú/foco, contenido sincronizado, recuerdos/tarjeta musical, preguntas opcionales, vista previa/editado/cancelación, copia y alternativa manual, confirmación/codificación de WhatsApp, opción de conversar, movimiento reducido, rutas y carga/error de imágenes. WhatsApp y portapapeles se simulan; no se envían mensajes. `site.test.js` añade estructura, referencias, accesibilidad básica y contraste de superficies definidas.

Las comprobaciones estáticas y de lógica no sustituyen una revisión visual. En este entorno no se validaron las resoluciones en un navegador funcional: los intentos de acceso local fallaron y el navegador integrado bloqueó `file:`. Permanecen pendientes el renderizado real, consola del navegador, teclado/táctil reales y apertura de WhatsApp con un número autorizado. La inspección de imágenes individuales tampoco demuestra cómo se ve la página completa.

## Preparar GitHub Pages

El proyecto está preparado técnicamente, pendiente de revisión visual final. No se ha publicado ni creado ningún repositorio remoto.

1. Revisa los textos y ejecuta sincronización y pruebas.
2. Crea tú el repositorio que hayas elegido. Incluye `index.html`, `css/`, `js/`, `assets/`, `scripts/` y `README.md`. Conserva los PNG originales para mantenimiento; no se cargan en la página. Excluye conversaciones, teléfonos no autorizados, datos privados, archivos temporales y entornos locales.
3. Sube esos archivos a la raíz de la rama elegida. No hace falta `node_modules`, compilación ni un directorio `dist`.
4. En GitHub, abre **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**, la rama correspondiente y **/(root)**. Guarda la configuración.
5. Espera al despliegue y copia la URL que muestre Pages. Habitualmente es `https://USUARIO.github.io/REPOSITORIO/`, pero utiliza la URL real indicada por GitHub.
6. Verifica recursos, interacciones y móvil sobre esa URL. Las rutas relativas funcionan también dentro de un subdirectorio.
7. Crea el QR únicamente con la URL definitiva y pruébalo desde otro dispositivo. No uses una dirección localhost ni una URL de ejemplo.

La publicación y cualquier funcionalidad adicional requieren nuevas instrucciones.

## Integración final de recursos

La portada usa `chibi-nuevo.webp` y el subtítulo actualizado. Hay un personaje dentro del flujo de cada sección, sin acompañante flotante: se reutiliza `chibi-pensativo.webp` en Sobre mí y Sobre ti, y `chibi-inicio.webp` en Mis gustos. Se mantienen las animaciones de llegada y la carga diferida secundaria.

`pageContent.artStates` define las parejas regalo/sobre cerrado y abierto. El controlador único de `data-disclosure` prepara ambas imágenes antes de habilitar el fundido; si falla alguna, mantiene el dibujo CSS. `pageContent.starThoughts` reúne cinco pensamientos: los botones se crean fuera de las capas ambientales y reutilizan el mismo controlador, con cierre explícito, Escape y retorno de foco. Las tarjetas de gustos conservan `details/summary` y resaltan el estado abierto.

La ambientación lateral reutiliza `bg-portada.webp` y `bg-carta.webp` únicamente en pantallas mayores de 1250 px, sin ampliar los párrafos. WhatsApp conserva el valor configurado por el propietario y su vista previa/confirmación; no hay envío automático.

Validación de esta integración: 20 pruebas Node aprobadas, respaldo HTML sincronizado y comprobaciones de sintaxis JavaScript aprobadas. La revisión visual de la página, responsive, consola y teclado real permanece pendiente: la herramienta de navegador falló al iniciar con «failed to write kernel assets». No se publicó en GitHub Pages.

## Cielo nocturno global

`#night-sky` cubre todo el documento y genera 90 estrellas decorativas en dos bandas laterales, con distribución determinista no uniforme, tamaños distintos y brillo lento desfasado. En móvil se muestran 30 estrellas más pequeñas y estáticas. La capa está recortada, detrás del contenido y no recibe eventos. La ambientación lateral y los seis escenarios se conservan.

`assets/images/star-white.webp` es apto para máscara alfa: 512 × 512 px y canal alfa 0–255. El color se mantiene mediante CSS, independientemente del color blanco del archivo. CSS lo pinta blanco, sin generar otra imagen. Si el navegador no soporta máscaras, se conserva una forma CSS.

Los mismos cinco botones y pensamientos siguen usando `data-disclosure`. En pantallas de al menos 1320 px, los botones se sitúan en los márgenes de sus secciones; en pantallas menores mantienen espacio propio en el flujo. Los mensajes siempre ocupan espacio dentro del contenido y conservan cierre, Escape y retorno de foco. El área táctil es de 44 × 44 px, aunque el icono sea pequeño. Se respeta movimiento reducido.

Validación: 22 pruebas Node aprobadas; respaldo sincronizado y sintaxis de `interactions.js` correcta. Las comprobaciones de distribución/márgenes son estáticas y las interacciones se prueban con DOM simulado. Quedan pendientes renderizado responsive, desplazamiento horizontal real, toque, teclado y consola de navegador: la herramienta falló al iniciar con «failed to write kernel assets». No se publicó.

## Actualización de textos y carta

La sección Mis gustos se retiró del HTML, configuración, renderizador y controladores; sus archivos gráficos se conservan para no borrar originales. Quedan Inicio, Agradecimiento, Sobre mí, Sobre ti y Carta. Las siete preguntas siguen siendo opcionales y conservan sus temas. El número de WhatsApp configurado se mantiene; no se reproduce en esta documentación.

La carta incluye once párrafos, el fragmento solicitado con la referencia Juan 3:16 encima del bloque musical editable en `pageContent.music`. El enlace abre YouTube por acción de la visitante, con reproductor responsive sin reproducción automática y enlace alternativo. Los cinco pensamientos se reparten entre las cinco secciones.

La portada incluye una pista sobre las estrellas. Se ajustó el espaciado de portada/agradecimiento y se alineó su introducción arriba para que la altura del regalo y del chibi no cree un vacío sobre el texto. El cielo conserva sus posiciones deterministas; únicamente se retira la banda local de la sección eliminada.

Revisión manual pendiente: encuadres, separación entre portada y agradecimiento, brillo de los cinco controles y lectura de la carta larga a 390, 768, 1024 y 1440 px. No se ha publicado el sitio.

## Portada alegre y canción integrada

Solo `poses.inicio` utiliza `assets/chibi/chibi-portada-alegre.webp`; las otras poses se conservan. El archivo mantiene transparencia alfa y usa la carga prioritaria existente.

El bloque musical no incluye el párrafo descriptivo anterior. El versículo aparece primero, seguido de un iframe de YouTube con carga diferida, `autoplay=0`, título accesible y tamaño responsive. Se conserva un enlace visible para abrir la canción si la incrustación no funciona. La disponibilidad del video depende de YouTube y de los permisos del propietario; debe comprobarse en navegador sobre HTTP/HTTPS.

Los controles y acentos con máscara usan ahora `assets/images/star-white.webp`. El cielo pequeño conserva su SVG normalizado y su distribución; el recurso original no se borra, pero ya no se referencia.

Formato y parámetros del reproductor: [documentación de YouTube](https://developers.google.com/youtube/player_parameters).
