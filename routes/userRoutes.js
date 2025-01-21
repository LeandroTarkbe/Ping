const express = require('express');
const { readData, writeData } = require('../utils/fileHandler');
const path = require('path');
const bcrypt = require('bcrypt');

const userRouter = express.Router();
const usersPath = path.join(__dirname, '../data/users.json');
let users = readData(usersPath);

// Validar una contraseña
const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;
    return regex.test(password);
};

// Endpoint para registrar un nuevo usuario
userRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son obligatorios' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({
            error: 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula y un número'
        });
    }

    const userExists = users.find((user) => user.username === username);

    if (userExists) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    users.push(newUser);
    writeData(usersPath, users);

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: { username } });
});

// Endpoint para iniciar sesión
userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son obligatorios' });
    }

    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
});

module.exports = userRouter;