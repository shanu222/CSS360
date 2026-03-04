import mongoose from 'mongoose';

const mcqAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  questions: [{
    questionId: String,
    question: String,
    selectedAnswer: Number,
    correctAnswer: Number,
    isCorrect: Boolean,
  }],
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number, // in seconds
    default: 0,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

mcqAttemptSchema.index({ userId: 1, subject: 1 });
mcqAttemptSchema.index({ completedAt: -1 });

export default mongoose.model('MCQAttempt', mcqAttemptSchema);
