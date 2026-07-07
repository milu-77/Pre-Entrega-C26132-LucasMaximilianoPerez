 # Pre-Entrega: API REST de Productos con Express y Firestore

¡Bienvenido al repositorio de la Pre-Entrega del proyecto! Esta es una API REST desarrollada con **Node.js** y **Express**, integrada con **Google Cloud Firestore** como base de datos y completamente documentada utilizando **Swagger**.

El sistema cuenta con persistencia de datos real, validaciones de seguridad mediante middlewares, manejo global de errores con bloques `try/catch` y un sistema de filtrado dinámico de alta versatilidad.

---

## 🚀 Características Principales

*   **Arquitectura Limpia:** Separación de responsabilidades clara utilizando Rutas, Controladores y Servicios.
*   **Filtrado 100% Dinámico:** Endpoint optimizado para recibir múltiples parámetros simultáneos por `query params` (categoría, precio máximo, stock mínimo, nombre) procesados de forma automatizada mediante bucles dinámicos.
*   **Persistencia en la Nube:** Conexión e interacción directa con colecciones de Firestore.
*   **Middlewares de Seguridad:** Rutas protegidas que requieren autenticación previa antes de realizar operaciones de escritura o eliminación (`POST`, `PUT`, `DELETE`).
*   **Documentación Interactiva:** Implementación completa de Swagger para probar todos los endpoints directamente desde el navegador de manera visual.

---

## 🛠️ Tecnologías Utilizadas

*   **Runtime:** Node.js (Versión 18 o superior)
*   **Framework Principal:** Express.js
*   **Base de Datos:** Google Cloud Firestore (Firebase Admin SDK)
*   **Documentación:** Swagger UI Express & Swagger JSDoc
*   **Variables de Entorno:** Dotenv (Manejo seguro de credenciales)
*   **Monitoreo en Desarrollo:** Nodemon

---

 

 