import express from "express"
import morgan from "morgan"
import { engine } from "express-handlebars"
import { connectMongooseDB } from "./db/connection.js"
import userRoutes from "./routes/users.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import productsRoutes from "./routes/products.routes.js"
import {getDirname} from "./utils/dirname.js"
import dotenv from "dotenv"
import cors from "cors"
import viewRoutes from "./routes/view.routes.js"
import path from "path"
import { fileURLToPath } from "url"
import uploadRoutes from "./routes/upload.routes.js"

const port = 8080;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
dotenv.config()

// Inicia la conexión a MongoDB con Mongoose
connectMongooseDB()
    .then(() => console.log("Conexión Exitosa a Mongo Atlas"))
    .catch(err => console.log("Error al conectar con Mongo: ", err))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"public")))
app.use(morgan("dev"))
app.use(cors())

const publicPath = path.join(__dirname, "public")
app.use(express.static(publicPath))
console.log("Trayendo archivos estático desde: ", publicPath)

// Configuración de Handlebars como motor de plantillas
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        extname: ".handlebars",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true, 
            allowProtoMethodsByDefault: true,
        }
    })
)
app.set("view engine", "handlebars")
app.set("views", "./src/views")
app.set("views", path.join(__dirname, "views"))

console.log("Views config en: ", path.join(__dirname, "views"))

// Rutas API
app.use("/api/users", userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/image", uploadRoutes)
app.use("/img", express.static(path.join(__dirname,'public/img')))
app.use(express.static("public"))

// Rutas de vistas
app.use("/", viewRoutes)

// Inicialización en el Servidor
app.listen(port, () => {
    console.log(`\x1b[32mServer is running on http://localhost:${port}\x1b[0m`)
})