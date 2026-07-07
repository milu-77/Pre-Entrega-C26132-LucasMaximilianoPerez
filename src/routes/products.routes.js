import express from 'express';
import * as productController from '../controllers/product.controllers.js'
import { authentication } from '../middlewares/authentication.js'

const router = express.Router();
router.get('/filter', (req, res) => {
  const category = req.query.category;
  const price = req.query.price;
  res.send(`Producto filtrado por ${category} y ${price}  `);
});
/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Mostrar todos los productos desde Firestore
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       401:
 *         description: No autorizado (Falta token o formato inválido)
 *       403:
 *         description: Token inválido o expirado
 */
router.get('/', productController.getAllProducts);
/**
 * @swagger
 * /api/products/rubicon:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Vaciar o limpiar la colección de productos en Firestore
 *     description: Este endpoint elimina de forma masiva los productos (operación crítica).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Colección limpiada con éxito
 *       401:
 *         description: No autorizado (Falta token o formato inválido)
 *       403:
 *         description: Token inválido o expirado
 */

router.delete('/rubicon', authentication, productController.clearProductsCollection);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener un producto por su ID de Firestore
 *     description: Devuelve los detalles de un único producto basado en su identificador alfanumérico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 11fDwJN3XYE7VSVRtZiP
 *         description: El ID aleatorio del producto generado por Firebase (ej. 11fDwJN3XYE7VSVRtZiP)
 *     responses:
 *       200:
 *         description: Producto encontrado y devuelto con éxito
 *       400:
 *         description: El ID provisto no es válido o está mal formateado
 *       404:
 *         description: No se encontró ningún producto con ese ID
 */


router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crea un nuevo producto en Firestore
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Crónicas marcianas"
 *               price:
 *                 type: number
 *                 example: 21500
 *               category:
 *                 type: string
 *                 example: "ciencia-ficcion"
 *               stock:
 *                 type: number
 *                 example: 14
 *               description:
 *                 type: string
 *                 example: "Una deslumbrante colección de relatos de Ray Bradbury que narra la llegada del ser humano a Marte y la progresiva colonización del planeta, reflejando las ansiedades y la naturaleza de la humanidad."
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Error de validación (Faltan campos obligatorios o datos incorrectos)
 *       401:
 *         description: No autorizado (Falta token o formato inválido)
 *       500:
 *         description: Error interno del servidor o Firestore no responde
 */

router.post('/create', authentication, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Eliminar un producto por su ID de Firestore
 *     description: Borra de forma permanente un producto de la base de datos. Requiere token de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 11fDwJN3XYE7VSVRtZiP   
 *         description: El ID alfanumérico del producto que se desea eliminar de Firebase
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       400:
 *         description: El ID provisto no es válido
 *       401:
 *         description: No autorizado (Falta token o formato inválido)
 *       403:
 *         description: Token inválido o expirado
 *       404:
 *         description: No se encontró ningún producto con el ID especificado
 */
router.delete('/:id', authentication, productController.deleteProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Productos
 *     summary: Actualizar un producto existente
 *     description: Modifica los datos de un producto en Firestore mediante su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 45VDV8VNcIuWESe7buD
 *         description: El ID del producto que se desea actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Crónicas marcianas (Edición Especial)"
 *               price:
 *                 type: number
 *                 example: 25000
 *               category:
 *                 type: string
 *                 example: "ciencia-ficcion"
 *               stock:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       400:
 *         description: El ID o los datos enviados no son válidos
 *       401:
 *         description: No autorizado (Falta token)
 *       403:
 *         description: Token inválido o expirado
 *       404:
 *         description: No se encontró el producto con ese ID
 */
router.put('/:id', authentication, productController.updateProduct);





 



export default router;


