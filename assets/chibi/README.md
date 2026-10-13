# Personaje chibi integrado

Se conservaron los cuatro WebP originales sin editar ni convertir. En `js/content.js` se asignan por el contenido de cada ilustración:

- Inicio: `chibi-nuevo.webp` (reservado, sonrisa natural).
- Agradecimiento: `chibi-gracias.webp` (regalo).
- Sobre mí: `chibi-pensativo.webp` (pose seria).
- Sobre ti: `chibi-pensativo.webp` (pose reutilizada; no hay ilustración atenta exclusiva).
- Mis gustos: `chibi-inicio.webp` (taza y auriculares, pose relajada).
- Carta: `chibi-sonrisa.webp` (sobre sin corazón).

`illustrationsEnabled` permite activar o desactivar la carga. El marcador HTML permanece si la carga falla. Las imágenes usan `object-fit: contain`, sin recortes CSS. Para sustituirlas, actualiza las rutas y textos alternativos en la configuración.
