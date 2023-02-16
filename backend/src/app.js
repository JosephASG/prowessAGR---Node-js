import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config.js";

// importar las rutas para cada uno de los puntos finales
import seedRouter from "./routes/seedRoutes.js";
import CategoryRouter from "./routes/categoryRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";


//servidor
const app = express();

//intermediarios
app.use(cors());

// utilizar morgan para registrar peticiones HTTP
app.use(morgan(config.LOG_FORMAT || "development" ? "combined" : "dev"));

// utilizar express para analizar cuerpos JSON y cuerpos codificados mediante URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use(`${config.API_PREFIX}/seed/`, seedRouter);
app.use(`${config.API_PREFIX}/category/`, CategoryRouter);
app.use(`${config.API_PREFIX}/products/`, ProductRouter);
app.use(`${config.API_PREFIX}/users/`, UserRouter);
app.use(`${config.API_PREFIX}/orders/`, OrderRouter);

// exportar la aplicación para que pueda utilizarse enin index.js
export default app;