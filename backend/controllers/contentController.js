import ContentItem from '../models/ContentItem.js';

export const getPublishedContent = async (_req, res) => {
  try {
    const items = await ContentItem.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    return res.json({ items });
  } catch (error) {
    console.error('Get published content error:', error);
    return res.status(500).json({ error: 'Failed to load content' });
  }
};
