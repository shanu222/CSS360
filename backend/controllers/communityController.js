import CommunityThread from '../models/CommunityThread.js';
import User from '../models/User.js';

// Get all threads
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

    const threads = await CommunityThread.find(query)
      .sort({ isPinned: -1, updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-replies');

    const total = await CommunityThread.countDocuments(query);

    res.json({ 
      threads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get threads error:', error);
    res.status(500).json({ error: 'Failed to fetch threads' });
  }
};

// Get single thread with replies
export const getThread = async (req, res) => {
  try {
    const { id } = req.params;

    const thread = await CommunityThread.findById(id);

    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    // Increment views
    thread.views += 1;
    await thread.save();

    res.json({ thread });
  } catch (error) {
    console.error('Get thread error:', error);
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
};

// Create new thread
export const createThread = async (req, res) => {
  try {
    const { subject, title, content, tags } = req.body;

    const user = await User.findById(req.userId);

    const thread = new CommunityThread({
      userId: req.userId,
      author: user.name,
      avatar: user.avatar || user.name.substring(0, 2).toUpperCase(),
      subject,
      title,
      content,
      tags: tags || [],
    });

    await thread.save();

    res.status(201).json({ 
      message: 'Thread created successfully', 
      thread 
    });
  } catch (error) {
    console.error('Create thread error:', error);
    res.status(500).json({ error: 'Failed to create thread' });
  }
};

// Add reply to thread
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
