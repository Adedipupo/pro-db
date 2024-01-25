const jwt = require('jsonwebtoken');


   function generateToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1d' })
  }
   function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }

module.exports = {
    generateToken,
    verifyToken
}

