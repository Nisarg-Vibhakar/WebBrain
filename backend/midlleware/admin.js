
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
  
  module.exports = { requireAdmin };
  