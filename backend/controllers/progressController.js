// Get user progress - returns empty (auth removed)
export const getUserProgress = async (req, res) => {
  try {
    res.json({ progress: [] });
  } catch (error) {
    console.error('Get progress error:', error);
    res.json({ progress: [] });
  }
};

// Get progress for specific subject - returns empty
export const getSubjectProgress = async (req, res) => {
  try {
    const { subjectId } = req.params;
    res.json({ 
      progress: {
        subjectId,
        progress: 0,
        completedTopics: [],
        studyTime: 0,
      }
    });
  } catch (error) {
    console.error('Get subject progress error:', error);
    res.json({ 
      progress: {
        subjectId,
        progress: 0,
        completedTopics: [],
        studyTime: 0,
      }
    });
  }
};

// Update progress - requires auth
export const updateProgress = async (req, res) => {
  res.status(401).json({ error: 'Authentication required (progress feature removed)' });
};

// Add practice score - requires auth
export const addPracticeScore = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};

// Get statistics - requires auth
export const getStatistics = async (req, res) => {
  res.status(401).json({ error: 'Authentication required' });
};
