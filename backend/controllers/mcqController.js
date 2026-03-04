import MCQAttempt from '../models/MCQAttempt.js';

// Mock MCQ bank (in production, store this in database)
const mcqBank = [
  {
    id: '1',
    subject: 'Pakistan Affairs',
    topic: 'Pakistan Movement',
    question: 'The Lahore Resolution was passed in which year?',
    options: ['1938', '1940', '1942', '1945'],
    correct: 1,
    explanation: 'The Lahore Resolution, also known as the Pakistan Resolution, was passed on March 23, 1940 at the annual session of the All India Muslim League.',
  },
  {
    id: '2',
    subject: 'Pakistan Affairs',
    topic: 'Pakistan Movement',
    question: 'Who presided over the Lahore session of the All India Muslim League in 1940?',
    options: ['Liaquat Ali Khan', 'Sir Agha Khan', 'Quaid-i-Azam Muhammad Ali Jinnah', 'Huseyn Shaheed Suhrawardy'],
    correct: 2,
    explanation: 'Quaid-i-Azam Muhammad Ali Jinnah presided over the historic Lahore session where the Pakistan Resolution was passed.',
  },
  {
    id: '3',
    subject: 'General Science',
    topic: 'Physics',
    question: 'The speed of light in vacuum is approximately:',
    options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10¹² m/s'],
    correct: 1,
    explanation: 'The speed of light in vacuum (c) is approximately 3 × 10⁸ meters per second (299,792,458 m/s).',
  },
  // Add more questions...
];

// Get MCQs by subject/topic
export const getMCQs = async (req, res) => {
  try {
    const { subject, topic, count = 10 } = req.query;

    let filtered = mcqBank;

    if (subject) {
      filtered = filtered.filter(q => q.subject === subject);
    }

    if (topic) {
      filtered = filtered.filter(q => q.topic === topic);
    }

    // Get random questions
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const questions = shuffled.slice(0, parseInt(count)).map(q => ({
      ...q,
      correct: undefined, // Don't send correct answer
    }));

    res.json({ questions });
  } catch (error) {
    console.error('Get MCQs error:', error);
    res.status(500).json({ error: 'Failed to fetch MCQs' });
  }
};

// Submit MCQ attempt
export const submitMCQAttempt = async (req, res) => {
  try {
    const { subject, topic, answers, timeTaken } = req.body;

    // Calculate score
    const questions = answers.map(answer => {
      const question = mcqBank.find(q => q.id === answer.questionId);
      const isCorrect = question && question.correct === answer.selectedAnswer;
      
      return {
        questionId: answer.questionId,
        question: question?.question || '',
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question?.correct,
        isCorrect,
      };
    });

    const score = questions.filter(q => q.isCorrect).length;
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    const attempt = new MCQAttempt({
      userId: req.userId,
      subject,
      topic,
      questions,
      score,
      totalQuestions,
      percentage,
      timeTaken,
    });

    await attempt.save();

    res.status(201).json({ 
      message: 'Attempt submitted successfully', 
      result: {
        score,
        totalQuestions,
        percentage,
        questions,
      },
    });
  } catch (error) {
    console.error('Submit MCQ error:', error);
    res.status(500).json({ error: 'Failed to submit attempt' });
  }
};

// Get user's MCQ attempts
export const getMCQAttempts = async (req, res) => {
  try {
    const { subject } = req.query;

    const query = { userId: req.userId };
    if (subject) {
      query.subject = subject;
    }

    const attempts = await MCQAttempt.find(query)
      .sort({ completedAt: -1 })
      .limit(50)
      .select('-questions'); // Don't send full questions for list

    res.json({ attempts });
  } catch (error) {
    console.error('Get attempts error:', error);
    res.status(500).json({ error: 'Failed to fetch attempts' });
  }
};

// Get single attempt with details
export const getMCQAttempt = async (req, res) => {
  try {
    const { id } = req.params;

    const attempt = await MCQAttempt.findOne({ 
      _id: id, 
      userId: req.userId 
    });

    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    res.json({ attempt });
  } catch (error) {
    console.error('Get attempt error:', error);
    res.status(500).json({ error: 'Failed to fetch attempt' });
  }
};

// Get MCQ statistics
export const getMCQStats = async (req, res) => {
  try {
    const attempts = await MCQAttempt.find({ userId: req.userId });

    const stats = {
      totalAttempts: attempts.length,
      averageScore: attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length || 0,
      totalQuestionsSolved: attempts.reduce((sum, a) => sum + a.totalQuestions, 0),
      subjectWise: {},
    };

    attempts.forEach(attempt => {
      if (!stats.subjectWise[attempt.subject]) {
        stats.subjectWise[attempt.subject] = {
          attempts: 0,
          averageScore: 0,
          totalQuestions: 0,
        };
      }

      const subjectStat = stats.subjectWise[attempt.subject];
      subjectStat.attempts += 1;
      subjectStat.averageScore = 
        (subjectStat.averageScore * (subjectStat.attempts - 1) + attempt.percentage) / 
        subjectStat.attempts;
      subjectStat.totalQuestions += attempt.totalQuestions;
    });

    res.json({ stats });
  } catch (error) {
    console.error('Get MCQ stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
