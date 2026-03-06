import User from '../models/User.js';
import Session from '../models/Session.js';
import ContentItem from '../models/ContentItem.js';
import Resource from '../models/Resource.js';
import { emitGlobalEvent } from '../services/realtimeService.js';

const userProjection = {
  password: 0,
};

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find({}, userProjection).sort({ createdAt: -1 }).lean();
    return res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({ error: 'Failed to load users' });
  }
};

export const getActiveUsers = async (_req, res) => {
  try {
    const users = await User.find({ isLoggedIn: true }, userProjection).sort({ lastActive: -1 }).lean();
    return res.json({ users });
  } catch (error) {
    console.error('Get active users error:', error);
    return res.status(500).json({ error: 'Failed to load active users' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await User.findById(id);
    if (!target) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Session.updateMany(
      { userId: target._id, active: true },
      { $set: { active: false, logoutTime: new Date() } }
    );

    await ContentItem.deleteMany({ createdBy: target._id });
    await Resource.deleteMany({ uploadedBy: target._id });
    await User.findByIdAndDelete(id);

    emitGlobalEvent('admin:user-deleted', { userId: id, email: target.email });

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const forceLogoutUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.activeSessionId) {
      await Session.updateMany(
        { sessionId: user.activeSessionId, active: true },
        { $set: { active: false, logoutTime: new Date() } }
      );
    }

    user.isLoggedIn = false;
    user.activeSessionId = null;
    user.activeDeviceId = null;
    await user.save();

    emitGlobalEvent('admin:user-force-logout', { userId: id, email: user.email });

    return res.json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Force logout error:', error);
    return res.status(500).json({ error: 'Failed to force logout user' });
  }
};

export const getContentItems = async (_req, res) => {
  try {
    const items = await ContentItem.find({}).sort({ createdAt: -1 }).lean();
    return res.json({ items });
  } catch (error) {
    console.error('Get content items error:', error);
    return res.status(500).json({ error: 'Failed to load content items' });
  }
};

export const createContentItem = async (req, res) => {
  try {
    const { title, type, body, fileUrl, tags, isPublished } = req.body || {};

    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const created = await ContentItem.create({
      title: String(title).trim(),
      type: type || 'announcement',
      body: String(body).trim(),
      fileUrl: fileUrl || null,
      tags: Array.isArray(tags) ? tags : [],
      isPublished: typeof isPublished === 'boolean' ? isPublished : true,
      createdBy: req.userDoc._id,
    });

    emitGlobalEvent('admin:content-created', { item: created.toObject() });

    return res.status(201).json({ item: created });
  } catch (error) {
    console.error('Create content item error:', error);
    return res.status(500).json({ error: 'Failed to create content item' });
  }
};

export const updateContentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, body, fileUrl, tags, isPublished } = req.body || {};

    const item = await ContentItem.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Content item not found' });
    }

    if (typeof title === 'string') item.title = title.trim();
    if (typeof type === 'string') item.type = type;
    if (typeof body === 'string') item.body = body.trim();
    if (typeof fileUrl === 'string' || fileUrl === null) item.fileUrl = fileUrl;
    if (Array.isArray(tags)) item.tags = tags;
    if (typeof isPublished === 'boolean') item.isPublished = isPublished;

    await item.save();

    emitGlobalEvent('admin:content-updated', { item: item.toObject() });

    return res.json({ item });
  } catch (error) {
    console.error('Update content item error:', error);
    return res.status(500).json({ error: 'Failed to update content item' });
  }
};

export const deleteContentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContentItem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Content item not found' });
    }

    emitGlobalEvent('admin:content-deleted', { itemId: id });

    return res.json({ message: 'Content item deleted successfully' });
  } catch (error) {
    console.error('Delete content item error:', error);
    return res.status(500).json({ error: 'Failed to delete content item' });
  }
};
