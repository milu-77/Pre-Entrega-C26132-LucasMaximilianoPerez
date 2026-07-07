import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';
import productsRouter from './src/routes/products.routes.js';
import routerAuth from './src/routes/auth.routes.js';
import { authentication } from './src/middlewares/authentication.js';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"
];
const swaggerOptions = {

  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Libros - Mi Tienda',
      version: '1.0.0',
      description: 'Documentación de los endpoints de mi e-commerce con autenticación JWT y Firestore',
    },
    servers: [
      {
        url: 'https://final-c26132-lmp-git-main-lucas-lmps-projects.vercel.app',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(cors({
  origin: (origin, callback) => {
    // Lista de orígenes permitidos (Localhost y cualquier subdominio de Vercel de tu proyecto)
    if (!origin || origin.startsWith('http://localhost') || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));
// app.use(authentication);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'main.html'));
});
app.use('/api/products', productsRouter);
app.use('/auth', routerAuth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    operationsSorter: 'method',
    persistAuthorization: true,
  },customCssUrl: CSS_URL,   
    customJs: JS_URLS
}));

app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada (404)'
  });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app; // O server, dependiendo de cómo se llame tu constante de Express