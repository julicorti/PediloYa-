const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];  // Obtener el token del header Authorization
    if (!token) {
      return res.status(401).send('Acceso denegado');
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');  // Verificar el token con la misma clave secreta
      req.user = decoded;  // Guardar la información decodificada del usuario en req.user
      next();  // Pasar al siguiente middleware o ruta
    } catch (err) {
      console.error(err)
      res.status(400).send('Token no valido');
    }
  }
  
  module.exports = verifyToken;