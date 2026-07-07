import express from 'express';
import { login } from '../controllers/auth.controllers.js';
const router = express.Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Iniciar sesión de usuario
 *     description: Envía las credenciales para obtener un token JWT válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve el token JWT
 *       401:
 *         description: Credenciales incorrectas (Email o contraseña inválidos)
 */
router.post('/login', login);
export default router;