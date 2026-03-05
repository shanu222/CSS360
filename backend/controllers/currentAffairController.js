import CurrentAffair from '../models/CurrentAffair.js';

// Get all current affairs - returns empty (auth/db removed)
export const getCurrentAffairs = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    // Return empty array since database is not connected
    res.json({ 
      affairs: [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: 0,
        pages: 0,
      },
    });
  } catch (error) {
    console.error('Get current affairs error:', error);
    res.json({ 
      affairs: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 0 }
    });
  }
};

// Get single current affair - returns 404
export const getCurrentAffair = async (req, res) => {
  res.status(404).json({ error: 'Current affair not found' });
};

// Create current affair (admin only) - requires auth
export const createCurrentAffair = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};

// Update current affair (admin only) - requires auth
export const updateCurrentAffair = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};

// Delete current affair (admin only) - requires auth
export const deleteCurrentAffair = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};
