Coloca tu imagen de fondo en esta carpeta con este nombre exacto:

fondo.jpg

Ruta usada por el juego:
images/fondo.jpg

Si quieres usar otro nombre o formato, cambia esta línea en sketch.js:
loadImage("images/fondo.jpg", ...)

Agregar imagen de la tortuga (opcional)

Si quieres que aparezca la imagen "Turtuga" al lado derecho del menú, coloca la imagen en esta carpeta con alguno de estos nombres (el juego intentará cargarlos en este orden):

- Turtuga 2.png
- Turtuga2.png
- turtuga2.png
- Turtuga 2.jpg
- Turtuga2.jpg

Si usas otro nombre, abre [sketch.js](sketch.js) y modifica la lista `turtugaCandidates` en `preload()`.

Agregar imagen del sapito (opcional)

Si quieres que aparezca la imagen "sapito" en la esquina inferior izquierda del menú, coloca la imagen en esta carpeta con alguno de estos nombres (el juego intentará cargarlos en este orden):

- Sapito.png
- sapito.png
- Sapito 1.png
- Sapito1.png
- Sapito.jpg

Si usas otro nombre, abre [sketch.js](sketch.js) y modifica la lista `sapitoCandidates` en `preload()`.
