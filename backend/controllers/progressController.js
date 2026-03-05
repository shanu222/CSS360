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

    if (!progress) {
      progress = new Progress({
        userId: req.userId,
        subjectId,
        subjectName: req.body.subjectName || subjectId,
      });
    }

    if (progressValue !== undefined) {
      progress.progress = Math.min(100, Math.max(0, progressValue));
    }

    if (completedTopics) {
      progress.completedTopics = completedTopics;
    }

    if (studyTime) {
      progress.studyTime += studyTime;
    }

    progress.lastStudied = new Date();
    await progress.save();

    res.json({ 
      message: 'Progress updated successfully', 
      progress 
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

// Add practice score
export const addPracticeScore = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { testType, score, totalQuestions } = req.body;

    let progress = await Progress.findOne({ 
      userId: req.userId, 
      subjectId 
    });

    if (!progress) {
      progress = new Progress({
        userId: req.userId,
        subjectId,
        subjectName: req.body.subjectName || subjectId,
      });
    }

    progress.practiceScores.push({
      testType,
      score,
      totalQuestions,
      date: new Date(),
    });

    await progress.save();

    res.json({ 
      message: 'Score added successfully', 
      progress 
    });
  } catch (error) {
    console.error('Add score error:', error);
    res.status(500).json({ error: 'Failed to add score' });
  }
};

// Get statistics
export const getStatistics = async (req, res) => {
  try {
    const allProgress = await Progress.find({ userId: req.userId });

    const stats = {
      totalSubjects: allProgress.length,
      averageProgress: allProgress.reduce((sum, p) => sum + p.progress, 0) / allProgress.length || 0,
      totalStudyTime: allProgress.reduce((sum, p) => sum + p.studyTime, 0),
      totalPracticeTests: allProgress.reduce((sum, p) => sum + p.practiceScores.length, 0),
      subjectBreakdown: allProgress.map(p => ({
        subject: p.subjectName,
        progress: p.progress,
        studyTime: p.studyTime,
        tests: p.practiceScores.length,
      })),
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
