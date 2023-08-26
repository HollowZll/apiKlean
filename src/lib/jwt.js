const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET


//generar la firma del token
function sign(payload = {}) {
   return jsonwebtoken.sign(payload, JWT_SECRET, {expiresIn: '2d'});
}