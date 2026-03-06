import mongoose from 'mongoose';

const contentItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['announcement', 'resource', 'update', 'notice'],
    default: 'announcement',
    required: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  fileUrl: {
    type: String,
    default: null,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
}, {
  timestamps: true,
});

contentItemSchema.index({ createdAt: -1 });
contentItemSchema.index({ isPublished: 1, type: 1 });

export default mongoose.model('ContentItem', contentItemSchema);
