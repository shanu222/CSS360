import mongoose from 'mongoose';

const communityThreadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  subject: {
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
  replies: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    author: String,
    avatar: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
  }],
  views: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isPinned: {
    type: Boolean,
    default: false,
  },
  isClosed: {
    type: Boolean,
    default: false,
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

communityThreadSchema.index({ subject: 1 });
communityThreadSchema.index({ tags: 1 });
communityThreadSchema.index({ createdAt: -1 });

communityThreadSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('CommunityThread', communityThreadSchema);
