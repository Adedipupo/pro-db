const {verifyToken} = require("../utils/authToken")
const User = require('../model/user');

const authToken = async(req, res, next) => {   
    let token;

  if (
    (req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer "))
  ) {
     try {
       token = req.headers.authorization.split(" ")[1] || req.cookies.authorization;
      const {id} = verifyToken(token);
      req.user = await User.findById(id).select("-password");
      next();
     } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(`Invaliad token`);
   }
   }

  if (!token) {
    res.status(401);
    throw new Error(`Not Authorized`);
  }
}

module.exports = {
    authToken
  }
  
  