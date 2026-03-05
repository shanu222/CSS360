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
export const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const thread = await CommunityThread.findById(id);

    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    if (thread.isClosed) {
      return res.status(403).json({ error: 'Thread is closed' });
    }

    const user = await User.findById(req.userId);

    thread.replies.push({
      userId: req.userId,
      author: user.name,
      avatar: user.avatar || user.name.substring(0, 2).toUpperCase(),
      content,
      createdAt: new Date(),
    });

    thread.updatedAt = new Date();
    await thread.save();

    res.status(201).json({ 
      message: 'Reply added successfully', 
      thread 
    });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({ error: 'Failed to add reply' });
  }
};

// Toggle like on thread
export const likeThread = async (req, res) => {
  try {
    const { id } = req.params;

    const thread = await CommunityThread.findById(id);

    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    const likeIndex = thread.likes.indexOf(req.userId);

    if (likeIndex > -1) {
      thread.likes.splice(likeIndex, 1);
    } else {
      thread.likes.push(req.userId);
    }

    await thread.save();

    res.json({ 
      message: 'Like toggled', 
      likes: thread.likes.length 
    });
  } catch (error) {
    console.error('Like thread error:', error);
    res.status(500).json({ error: 'Failed to update like' });
  }
};

// Delete thread (owner or admin)
export const deleteThread = async (req, res) => {
  try {
    const { id } = req.params;

    const thread = await CommunityThread.findById(id);

    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    // Check permission
    if (thread.userId.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await thread.deleteOne();

    res.json({ message: 'Thread deleted successfully' });
  } catch (error) {
    console.error('Delete thread error:', error);
    res.status(500).json({ error: 'Failed to delete thread' });
  }
};
