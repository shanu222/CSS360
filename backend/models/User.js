import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  activeSessionId: {
    type: String,
    default: null,
  },
  activeDeviceId: {
    type: String,
    default: null,
  },
  lastLoginAt: {
    type: Date,
    default: null,
  },
  subjects: [{
    subjectId: String,
    name: String,
    progress: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
  }],
  studyPlan: {
    totalDays: { type: Number, default: 365 },
    daysCompleted: { type: Number, default: 0 },
    weeklyPlan: [{
      day: String,
      tasks: [String],
    }],
  },
  lastActive: {
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

// Update timestamps
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

userSchema.index({ isLoggedIn: 1 });
userSchema.index({ activeSessionId: 1 });

export default mongoose.model('User', userSchema);
