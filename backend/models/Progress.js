import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  completedTopics: [{
    topicName: String,
    completedAt: Date,
  }],
  notes: [{
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }],
  practiceScores: [{
    testType: String, // 'mcq', 'essay', 'pastpaper'
    score: Number,
    totalQuestions: Number,
    date: { type: Date, default: Date.now },
  }],
  studyTime: {
    type: Number, // in minutes
    default: 0,
  },
  lastStudied: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for faster queries
progressSchema.index({ userId: 1, subjectId: 1 }, { unique: true });

progressSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Progress', progressSchema);
