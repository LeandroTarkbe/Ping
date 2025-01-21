const express = require('express');
const { readData, writeData } = require('../utils/fileHandler');
const path = require('path');

const cartRouter = express.Router();
const cartsPath = path.join(__dirname, '../data/carts.json');
let carts = readData(cartsPath);

// Endpoint para crear un carrito
cartRouter.post('/', (req, res) => {
    const { id, products } = req.body;

    if (!id || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Los campos id y products (array) son obligatorios' });
    }

    carts.push({ id, products });
    writeData(cartsPath, carts);

    res.status(201).json({ message: 'Carrito creado', carts });
});

// Endpoint para obtener el contenido de todos los carritos
cartRouter.get('/', (req, res) => {
    res.status(200).json({ carts });
});

// Endpoint para realixar la lista de productos de un carrito
cartRouter.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(c => c.id === cid);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.status(200).json({ products: cart.products });
});

// Endpoint para agregar un producto a un carrito
cartRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const cart = carts.find(c => c.id === cid);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const product = cart.products.find(p => p.product === pid);

    if (product) {
        product.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    writeData(cartsPath, carts);
    res.status(200).json({ message: 'Producto agregado al carrito', cart });
});

module.exports = cartRouter;
