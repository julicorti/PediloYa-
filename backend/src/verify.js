const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; 
    if (!token) {
      return res.status(401).send('Acceso denegado');
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');  
      req.user = decoded; 
      next();  
    } catch (err) {
      console.error(err)
      res.status(400).send('Token no valido');
    }
  }
  
  module.exports = verifyToken;