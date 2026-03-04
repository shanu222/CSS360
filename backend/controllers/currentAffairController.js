import CurrentAffair from '../models/CurrentAffair.js';

// Get all current affairs
export const getCurrentAffairs = async (req, res) => {
  try {
    const { category, cssRelevance, tags, search, page = 1, limit = 20 } = req.query;
    
    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (cssRelevance) {
      query.cssRelevance = cssRelevance;
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    const affairs = await CurrentAffair.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await CurrentAffair.countDocuments(query);

    res.json({ 
      affairs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get current affairs error:', error);
    res.status(500).json({ error: 'Failed to fetch current affairs' });
  }
};

// Get single current affair
export const getCurrentAffair = async (req, res) => {
  try {
    const { id } = req.params;

    const affair = await CurrentAffair.findById(id);

    if (!affair) {
      return res.status(404).json({ error: 'Current affair not found' });
    }

    // Increment views
    affair.views += 1;
    await affair.save();

    res.json({ affair });
  } catch (error) {
    console.error('Get current affair error:', error);
    res.status(500).json({ error: 'Failed to fetch current affair' });
  }
};

// Create current affair (admin only)
export const createCurrentAffair = async (req, res) => {
  try {
    const { 
      category, 
      title, 
      summary, 
      detailedContent, 
      cssRelevance, 
      tags, 
      sources, 
      relatedSubjects 
    } = req.body;

    const affair = new CurrentAffair({
      category,
      title,
      summary,
      detailedContent,
      cssRelevance,
      tags: tags || [],
      sources: sources || [],
      relatedSubjects: relatedSubjects || [],
      createdBy: req.userId,
    });

    await affair.save();

    res.status(201).json({ 
      message: 'Current affair created successfully', 
      affair 
    });
  } catch (error) {
    console.error('Create current affair error:', error);
    res.status(500).json({ error: 'Failed to create current affair' });
  }
};

// Update current affair (admin only)
export const updateCurrentAffair = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const affair = await CurrentAffair.findById(id);

    if (!affair) {
      return res.status(404).json({ error: 'Current affair not found' });
    }

    Object.keys(updates).forEach(key => {
      affair[key] = updates[key];
    });

    await affair.save();

    res.json({ 
      message: 'Current affair updated successfully', 
      affair 
    });
  } catch (error) {
    console.error('Update current affair error:', error);
    res.status(500).json({ error: 'Failed to update current affair' });
  }
};

// Delete current affair (admin only)
export const deleteCurrentAffair = async (req, res) => {
  try {
    const { id } = req.params;

    const affair = await CurrentAffair.findByIdAndDelete(id);

    if (!affair) {
      return res.status(404).json({ error: 'Current affair not found' });
    }

    res.json({ message: 'Current affair deleted successfully' });
  } catch (error) {
    console.error('Delete current affair error:', error);
    res.status(500).json({ error: 'Failed to delete current affair' });
  }
};
