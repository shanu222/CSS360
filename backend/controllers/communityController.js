import CommunityThread from '../models/CommunityThread.js';

// Get all threads - safe, no auth needed
export const getThreads = async (req, res) => {
  try {
    const { subject, tags, search, page = 1, limit = 20 } = req.query;
    
    const query = {};

    if (subject) {
      query.subject = subject;
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // Return mock threads (database not available without auth)
    res.json({ 
      threads: [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: 0,
        pages: 0,
      },
    });
  } catch (error) {
    console.error('Get threads error:', error);
    res.json({ 
      threads: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 0 }
    });
  }
};

// Get single thread with replies
export const getThread = async (req, res) => {
  res.status(404).json({ error: 'Thread not found' });
};

// Create new thread - requires auth
export const createThread = async (req, res) => {
  res.status(401).json({ error: 'Authentication required (community feature removed)' });
};

// Add reply to thread - requires auth
export const addReply = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};

// Toggle like on thread - requires auth
export const likeThread = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};

// Delete thread - requires auth
export const deleteThread = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};
