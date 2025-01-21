const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = 8080;

app.use(bodyParser.json());

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});