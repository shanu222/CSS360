// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  try {
    // User is already attached to req by auth middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: 'Authorization check failed' });
  }
};
