# Aldu Accesorios

Tienda de accesorios, maquillaje y belleza creada con React, Vite y Firebase Firestore.

La identidad visual usa una paleta neutra de marfil, arena y grafito, botones oscuros y acentos rosados suaves. La portada incluye una composición editorial, accesos por categoría y una selección de productos.

## Para iniciar el proyecto

Necesitás Node.js instalado. Desde la carpeta del proyecto, ejecutá:

```bash
npm install
npm run dev
```

Para generar la versión de publicación:

```bash
npm run build
npm run preview
```

## Catálogo de ejemplo

`src/data/catalogoDemo.js` contiene doce productos de ejemplo repartidos en Maquillajes, Accesorios y Belleza. Se muestran junto con los productos de Firestore y funcionan aunque la colección `productos` esté vacía o no responda.

Los nombres, las fotos reutilizadas, las descripciones, los precios y las cantidades del catálogo local son ilustrativos. Confirmalos y reemplazalos en ese archivo antes de recibir pedidos. Las imágenes que ya estaban en `src/assets/` son las que se usan como referencia para esta muestra.

## Firebase y pedidos

- La conexión existente se configura en `src/firebase/config.js`.
- El proyecto Firebase conectado actualmente es `aldu-accesorios-b45dd`.
- Los productos reales se leen de la colección `productos`.
- Los pedidos se guardan en la colección `ordenes` con estado inicial `pendiente`.
- `firestore.rules` contiene reglas iniciales: permite leer el catálogo, bloquea cambios a productos desde el navegador y permite crear pedidos con campos limitados sin dar acceso para leerlos o editarlos.
- Para aplicarlas, abrí Firebase Console → Firestore → Reglas, reemplazá el contenido por `firestore.rules` y publicá. Probá el checkout después.
- Los pedidos anónimos todavía pueden ser falsos o repetidos, y el precio enviado por el navegador debe confirmarse manualmente. Para una tienda con ventas reales, agregá App Check y validación del pedido/precio en un servidor antes de aceptar pagos.
- El número de pedido se muestra cuando Firestore confirma que guardó la orden. El pago y el envío todavía se coordinan por fuera de la tienda.

## Archivos principales

- `src/components/`: catálogo, navegación, carrito, detalle y checkout.
- `src/context/CartContext.jsx`: estado del carrito y persistencia local.
- `src/data/productosFirebase.js`: combina productos reales y catálogo de ejemplo.
- `src/data/catalogoDemo.js`: productos ilustrativos editables.
- `src/index.css` y `src/App.css`: estilos y diseño adaptable.
- `index.html`: título, descripción e idioma del sitio.

Si publicás en Netlify, `public/_redirects` ya incluye la reescritura para que `/categoria/...`, `/item/...`, `/cart` y `/checkout` sirvan `index.html`. En otros hostings estáticos, configurá la reescritura equivalente.
