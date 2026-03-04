import Note from '../models/Note.js';

// Get user's notes
export const getNotes = async (req, res) => {
  try {
    const { subjectId, tags, isPublic } = req.query;
    
    const query = isPublic === 'true' 
      ? { isPublic: true }
      : { userId: req.userId };

    if (subjectId) {
      query.subjectId = subjectId;
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const notes = await Note.find(query)
      .populate('userId', 'name avatar')
      .sort({ updatedAt: -1 });

    res.json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// Get single note
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    const note = await Note.findById(id)
      .populate('userId', 'name avatar');

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check permission
    if (!note.isPublic && note.userId._id.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

// Create note
export const createNote = async (req, res) => {
  try {
    const { subjectId, subjectName, title, content, tags, isPublic } = req.body;

    const note = new Note({
      userId: req.userId,
      subjectId,
      subjectName,
      title,
      content,
      tags: tags || [],
      isPublic: isPublic || false,
    });

    await note.save();

    res.status(201).json({ 
      message: 'Note created successfully', 
      note 
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, isPublic } = req.body;

    const note = await Note.findOne({ _id: id, userId: req.userId });

    if (!note) {
      return res.status(404).json({ error: 'Note not found or access denied' });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPublic !== undefined) note.isPublic = isPublic;

    await note.save();

    res.json({ 
      message: 'Note updated successfully', 
      note 
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, userId: req.userId });

    if (!note) {
      return res.status(404).json({ error: 'Note not found or access denied' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

// Toggle like on note
export const likeNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const likeIndex = note.likes.indexOf(req.userId);

    if (likeIndex > -1) {
      note.likes.splice(likeIndex, 1);
    } else {
      note.likes.push(req.userId);
    }

    await note.save();

    res.json({ 
      message: 'Like toggled', 
      likes: note.likes.length 
    });
  } catch (error) {
    console.error('Like note error:', error);
    res.status(500).json({ error: 'Failed to update like' });
  }
};
