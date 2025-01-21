const express = require('express');
const { readData, writeData } = require('../utils/fileHandler');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const productRouter = express.Router();
const productsPath = path.join(__dirname, '../data/products.json');
let products = readData(productsPath);

// Endpoint para obtener todos los productos
productRouter.get('/', (req, res) => {
    res.status(200).json({ products });
});

// Endpoint para agregar un producto
productRouter.post('/', (req, res) => {
    const { titulo, descripcion, codigo, precio, status, stock, categoria, thumbnails } = req.body;

    if (!titulo || !descripcion || !codigo || !precio || typeof status !== 'boolean' || !stock || !categoria || !Array.isArray(thumbnails)) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios: titulo, descripcion, codigo, precio, status, stock, categoria, thumbnails (array de strings)'
        });
    }

    const newProduct = {
        id: uuidv4(), // Generar ID único
        titulo,
        descripcion,
        codigo,
        precio,
        status,
        stock,
        categoria,
        thumbnails
    };

    products.push(newProduct);
    writeData(productsPath, products);

    res.status(201).json({ message: 'Producto agregado', product: newProduct });
});

// Endpoint para actualizar un producto
productRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, codigo, precio, status, stock, categoria, thumbnails } = req.body;

    const product = products.find(item => item.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (titulo) product.titulo = titulo;
    if (descripcion) product.descripcion = descripcion;
    if (codigo) product.codigo = codigo;
    if (precio) product.precio = precio;
    if (typeof status === 'boolean') product.status = status;
    if (stock) product.stock = stock;
    if (categoria) product.categoria = categoria;
    if (Array.isArray(thumbnails)) product.thumbnails = thumbnails;

    writeData(productsPath, products);
    res.status(200).json({ message: 'Producto actualizado', product });
});

// Endpoint para eliminar un producto
productRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    const initialLength = products.length;
    products = products.filter(item => item.id !== id);

    if (products.length === initialLength) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    writeData(productsPath, products);
    res.status(200).json({ message: 'Producto eliminado', products });
});

module.exports = productRouter;
