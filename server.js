import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import viewsRoutes from './src/routes/viewsRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configurar Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(process.cwd(), 'src/views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src/views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Rutas
app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// WebSocket para actualizar productos en tiempo real
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    socket.on('newProduct', (product) => {
        io.emit('updateProducts', product);
    });
    
    socket.on('deleteProduct', (productId) => {
        io.emit('removeProduct', productId);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Configuración del puerto
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});