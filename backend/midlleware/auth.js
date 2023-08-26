
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, 'webbrain', (err,decodedToken)=>{
      if(err){
        console.log(err.message)
      }
      else{
        console.log(decodedToken)
        next()
      }
    });
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { requireAuth };
