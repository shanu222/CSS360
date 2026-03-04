import Resource from '../models/Resource.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all resources (with filters)
export const getResources = async (req, res) => {
  try {
    const { type, category, year, search } = req.query;
    
    const filter = { isActive: true };
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (year) filter.year = parseInt(year);
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const resources = await Resource.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ year: -1, createdAt: -1 });

    res.json(resources);
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

// Get single resource
export const getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('uploadedBy', 'name email');

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
};

// Create resource (admin only)
export const createResource = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      category,
      year,
      fileUrl,
      fileType,
      fileSize,
      solved,
      tags,
      metadata,
    } = req.body;

    // Validate required fields
    if (!title || !type || !category || !fileUrl || !fileType) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, type, category, fileUrl, fileType' 
      });
    }

    const resource = new Resource({
      title,
      description,
      type,
      category,
      year,
      fileUrl,
      fileType,
      fileSize,
      solved: solved || false,
      tags: tags || [],
      metadata: metadata || {},
      uploadedBy: req.user._id,
    });

    await resource.save();

    await resource.populate('uploadedBy', 'name email');

    res.status(201).json(resource);
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

// Update resource (admin only)
export const updateResource = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.uploadedBy; // Prevent changing uploader

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('uploadedBy', 'name email');

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ error: 'Failed to update resource' });
  }
};

// Delete resource (admin only)
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Soft delete (set isActive to false)
    resource.isActive = false;
    await resource.save();

    // Or hard delete:
    // await resource.deleteOne();

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};

// Increment view count
export const incrementViews = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ views: resource.views });
  } catch (error) {
    console.error('Increment views error:', error);
    res.status(500).json({ error: 'Failed to update views' });
  }
};

// Increment download count
export const incrementDownloads = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ downloads: resource.downloads });
  } catch (error) {
    console.error('Increment downloads error:', error);
    res.status(500).json({ error: 'Failed to update downloads' });
  }
};

// Get resource statistics (admin only)
export const getStatistics = async (req, res) => {
  try {
    const stats = await Resource.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalDownloads: { $sum: '$downloads' },
        },
      },
    ]);

    const totalResources = await Resource.countDocuments({ isActive: true });

    res.json({
      totalResources,
      byType: stats,
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

// Upload file handler
export const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // File is already saved by multer
    // Return file URL
    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      fileUrl,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
