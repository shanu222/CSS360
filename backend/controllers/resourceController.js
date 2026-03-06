import fs from 'fs';
import Resource from '../models/Resource.js';
import { emitGlobalEvent } from '../services/realtimeService.js';

const buildFilters = (query) => {
  const filters = { isActive: true };

  if (query.type) filters.type = query.type;
  if (query.category) filters.category = query.category;
  if (query.year) filters.year = Number(query.year);
  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { tags: { $in: [new RegExp(query.search, 'i')] } },
    ];
  }

  return filters;
};

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find(buildFilters(req.query)).sort({ createdAt: -1 }).lean();
    return res.json(resources);
  } catch (error) {
    console.error('Get resources error:', error);
    return res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

export const getResource = async (req, res) => {
  try {
    const resource = await Resource.findOne({ _id: req.params.id, isActive: true }).lean();
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    return res.json(resource);
  } catch (error) {
    console.error('Get resource error:', error);
    return res.status(500).json({ error: 'Failed to fetch resource' });
  }
};

export const createResource = async (req, res) => {
  try {
    const { title, type, category, fileUrl, fileType } = req.body || {};
    if (!title || !type || !category || !fileUrl || !fileType) {
      return res.status(400).json({ error: 'title, type, category, fileUrl, and fileType are required' });
    }

    const created = await Resource.create({
      ...req.body,
      uploadedBy: req.userDoc._id,
      isActive: true,
    });

    emitGlobalEvent('resources:created', { resource: created.toObject() });

    return res.status(201).json({ resource: created });
  } catch (error) {
    console.error('Create resource error:', error);
    return res.status(500).json({ error: 'Failed to create resource' });
  }
};

export const updateResource = async (req, res) => {
  try {
    const updated = await Resource.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { ...req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    emitGlobalEvent('resources:updated', { resource: updated.toObject() });

    return res.json({ resource: updated });
  } catch (error) {
    console.error('Update resource error:', error);
    return res.status(500).json({ error: 'Failed to update resource' });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    emitGlobalEvent('resources:deleted', { resourceId: req.params.id });

    return res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    return res.status(500).json({ error: 'Failed to delete resource' });
  }
};

export const incrementViews = async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    return res.json({ views: resource.views });
  } catch (error) {
    console.error('Increment views error:', error);
    return res.status(500).json({ error: 'Failed to increment views' });
  }
};

export const incrementDownloads = async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    return res.json({ downloads: resource.downloads });
  } catch (error) {
    console.error('Increment downloads error:', error);
    return res.status(500).json({ error: 'Failed to increment downloads' });
  }
};

export const getStatistics = async (_req, res) => {
  try {
    const [totalResources, byType] = await Promise.all([
      Resource.countDocuments({ isActive: true }),
      Resource.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    return res.json({ totalResources, byType });
  } catch (error) {
    console.error('Get statistics error:', error);
    return res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

export const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const relativePath = `/uploads/${req.file.filename}`;
    return res.status(201).json({
      message: 'File uploaded successfully',
      fileUrl: relativePath,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
    });
  } catch (error) {
    console.error('File upload handler error:', error);

    // Cleanup partially uploaded file when possible
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ error: 'File upload failed' });
  }
};
