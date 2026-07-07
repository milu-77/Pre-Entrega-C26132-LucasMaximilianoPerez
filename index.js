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
        url: 'http://localhost:3000',
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
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));
// app.use(authentication);
 app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'main.html'));
 });
app.use('/api/products', productsRouter);
app.use('/auth' , routerAuth); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      operationsSorter: 'method',
      persistAuthorization: true,  
    }
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