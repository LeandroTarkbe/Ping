import express from 'express';
import { readData, writeData } from '../utils/fileHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartRouter = express.Router();
const cartsPath = path.join(__dirname, '../data/carts.json');
let carts = readData(cartsPath);

// Endpoint para crear un carrito
cartRouter.post(
    '/',
    [
        body('products').isArray().withMessage('Los productos deben ser un array'),
        body('products.*.id').isString().withMessage('Cada producto debe tener un ID válido'),
        body('products.*.quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newCart = { id: uuidv4(), ...req.body };
        carts.push(newCart);
        writeData(cartsPath, carts);
        res.status(201).json(newCart);
    }
);

// Endpoint para obtener el contenido de todos los carritos
cartRouter.get('/', (req, res) => {
    res.status(200).json({ carts });
});

// Endpoint para obtener la lista de productos de un carrito
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

// Exportar correctamente en ES Modules
export default cartRouter;
