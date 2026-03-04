import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  files: [{
    name: String,
    url: String,
    type: String, // 'pdf', 'image', 'doc'
    uploadedAt: { type: Date, default: Date.now },
  }],
  isPublic: {
    type: Boolean,
    default: false,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

noteSchema.index({ userId: 1, subjectId: 1 });
noteSchema.index({ tags: 1 });
noteSchema.index({ isPublic: 1 });

noteSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Note', noteSchema);
