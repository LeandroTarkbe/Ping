import express from 'express';

const router = express.Router();

// Datos de productos de ejemplo
const products = [
    { id: 1, name: "Producto A", price: 100 },
    { id: 2, name: "Producto B", price: 150 },
];

// Ruta para home
router.get('/', (req, res) => {
    res.render('home', { products });
});

// Ruta para productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

export default router;