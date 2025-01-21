El proyecto trata del armado de un e-commerce dedicado a la comercialización de productos de tecnología y computación. La empresa que comercializa se llama "Ping"
A continuación, realizaré un resumen de las funcionalidades que he tratado de implementar:

Funcionalidad de productRoutes.js

OBJETIVO: Manejar las operaciones CRUD relacionadas con productos. Los datos de los productos se guardan en un archivo JSON (products.json) para persistencia.
ENDPOINTS IMPLEMNETADOS:
GET /api/products:
Obtiene todos los productos disponibles.
Responde con un arreglo de productos en formato JSON.

POST /api/products:
Agrega un nuevo producto al sistema.
Valida que todos los campos requeridos (titulo, descripcion, codigo, etc.) estén presentes y en el formato correcto.
Genera automáticamente un id único para el producto usando uuid.
Guarda el nuevo producto en el archivo products.json.

PUT /api/products/:id:
Actualiza un producto existente identificado por su id.
Permite modificar los campos (titulo, descripcion, codigo, etc.) excepto el id.
Devuelve un error 404 si el producto no existe.

DELETE /api/products/:id:
Elimina un producto identificado por su id.
Devuelve un error 404 si el producto no existe.

Funcionalidad de cartRoutes.js

OBJETIVO: Gestionar los endpoints relacionados con los carritos de compras. Los datos del carrito están persistidos en un archivo JSON (carts.json).
ENDPOINTS IMPLEMENTADOS:
POST /api/carts:
Crea un nuevo carrito.
Acepta un id único generado automáticamente.
Inicializa el carrito con un arreglo vacío de productos.

GET /api/carts/:id:
Recupera un carrito específico por su id.
Devuelve el carrito junto con los productos que contiene.

POST /api/carts/:cid/product/:pid:
Agrega un producto al carrito identificado por cid.
Si el producto ya existe en el carrito, incrementa su cantidad.
Si no existe, lo agrega con una cantidad inicial de 1.

DELETE /api/carts/:cid/product/:pid:
Elimina un producto del carrito identificado por cid.

DELETE /api/carts/:cid:
Vacía todos los productos del carrito identificado por cid.

Funcionalidad de userRoutes.js

OBJETIVO: Gestionar las rutas relacionadas con los usuarios. Validar contraseñas y nombres de usuario durante el registro. Manejar el inicio de sesión mediante comparación de credenciales. Persistir los datos de usuario en un archivo JSON (users.json).
ENDPOINTS IMPLEMENTADOS:
POST /api/users/register:
Permite registrar un nuevo usuario.
Valida que el nombre de usuario sea único.
Valida que la contraseña cumpla ciertos criterios (longitud mínima, letras, números, etc.).
Encripta la contraseña antes de guardarla.

POST /api/users/login:
Permite a un usuario iniciar sesión.
Verifica las credenciales proporcionadas (nombre de usuario y contraseña).
Devuelve un mensaje de éxito si las credenciales son válidas.

DELETE /api/users/:id: Elimina un usuario específico.

PUT /api/users/:id: Actualiza información del usuario, como el nombre o la contraseña.
