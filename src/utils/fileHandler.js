import fs from 'fs/promises';

// Función para leer datos desde un archivo JSON de forma asíncrona
export async function readData(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`El archivo ${filePath} no existe, devolviendo array vacío.`);
            return [];
        }
        console.error('Error al leer el archivo:', error);
        return [];
    }
}

// Función para escribir datos en un archivo JSON de forma asíncrona
export async function writeData(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
    }
}

