// Get user's notes - returns empty array (auth removed)
export const getNotes = async (req, res) => {
  try {
    const { subjectId, tags, isPublic } = req.query;
    
    // Without authentication, return empty notes
    res.json({ notes: [] });
  } catch (error) {
    console.error('Get notes error:', error);
    res.json({ notes: [] }); // Return safe empty response
  }
};

// Get single note
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(404).json({ error: 'Note not found' });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(404).json({ error: 'Note not found' });
  }
};

// Create note - requires auth
export const createNote = async (req, res) => {
  res.status(401).json({ error: 'Authentication required (notes feature removed)' });
};

// Update note - requires auth
export const updateNote = async (req, res) => {
  res.status(401).json({ error: 'Authentication required (notes feature removed)' });
};

// Delete note - requires auth
export const deleteNote = async (req, res) => {
  res.status(401).json({ error: 'Authentication required (notes feature removed)' });
};

// Toggle like on note
export const likeNote = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' }); 
      message: 'Like toggled', 
      likes: note.likes.length 
    });
  } catch (error) {
    console.error('Like note error:', error);
    res.status(500).json({ error: 'Failed to update like' });
  }
};
