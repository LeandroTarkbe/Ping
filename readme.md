📦 Aplicación de Tienda Online con Carrito de Compras

📌 Descripción

Esta aplicación es una tienda en línea que permite a los usuarios:

Visualizar productos con sus imágenes, nombres y precios.

Agregar productos al carrito de compras.

Modificar las cantidades de los productos en el carrito.

Vaciar el carrito.

Finalizar la compra con un mensaje de confirmación.

La aplicación está construida con Node.js, Express, MongoDB (Mongoose) y utiliza Handlebars para el renderizado de vistas.

🛠 Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1️⃣ Clonar el repositorio

 git clone https://github.com/tu-usuario/tu-repositorio.git
 cd tu-repositorio

2️⃣ Instalar dependencias

 npm install

3️⃣ Configurar las variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega la conexión a tu base de datos MongoDB Atlas:

MONGO_URI=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/tienda
PORT=8080

4️⃣ Ejecutar el servidor

 npm start

El servidor se ejecutará en http://localhost:8080

🚀 Uso

📌 Funcionalidades

1️⃣ Visualizar productos: La página principal muestra todos los productos disponibles. 2️⃣ Agregar al carrito: Cada producto tiene un botón para ser agregado al carrito. 3️⃣ Gestionar carrito:

Eliminar productos del carrito.

Vaciar el carrito.

Ajustar la cantidad de productos en el carrito. 4️⃣ Finalizar compra: Se muestra un mensaje con SweetAlert confirmando la compra.

📌 Endpoints

📂 Productos

GET /api/products → Obtiene todos los productos.

POST /api/products → Agrega un nuevo producto.

📂 Carrito

GET /api/cart/:userId → Obtiene el carrito de un usuario.

POST /api/cart/:userId/add → Agrega un producto al carrito.

DELETE /api/cart/:userId/clear → Vacía el carrito.

DELETE /api/cart/:userId/remove → Elimina un producto del carrito.

POST /api/cart/:userId/checkout → Finaliza la compra.



🔹 Página de productos 🔹 Carrito de compras 🔹 Confirmación de compra con SweetAlert



🏗 Tecnologías Utilizadas

✅ Backend: Node.js, Express, MongoDB (Mongoose).✅ Frontend: Handlebars, Bootstrap, JavaScript.✅ Autenticación y seguridad: JWT (JSON Web Token).✅ Gestión de imágenes: Multer para la carga de imágenes de productos.✅ Notificaciones: SweetAlert para alertas y confirmaciones.

📝 Mejoras Futuras

🚀 Integración con MercadoPago.🚀 Implementación de usuarios con roles (admin/cliente).🚀 Mejora del sistema de stock.

📌 Autor
📌 Leandro Ariel Tarkbe
📌 ltarkbe@gmail.com
📌 https://github.com/LeandroTarkbe

📜 Licencia

Este proyecto está bajo la licencia MIT - Puedes ver más detalles en el archivo LICENSE.

