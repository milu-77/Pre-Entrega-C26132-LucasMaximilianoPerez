import jwt from 'jsonwebtoken';
import 'dotenv/config';
const secret_key = process.env.JWT_SECRET;

 

export const authentication = (req, res, next) => {
     const authHeader = req.headers['authorization'];
     if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. No se proporcionó el encabezado Authorization.'
        });
    }    
    const partes = authHeader.split(' ');
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({
            success: false,
            message: 'Formato de token inválido. Debe ser: Bearer <TOKEN>'
        });
    }
     const token = partes[1];
    try {
          const verificado = jwt.verify(token, secret_key);
         req.user = verificado; 
        next();
    } catch (error) {
         return res.status(403).json({
            success: false,
            message: 'Token inválido o expirado. Acceso no autorizado.',
         });
    }
};
 export default authentication;