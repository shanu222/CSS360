import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ['past_paper', 'note', 'video', 'book', 'other'],
    required: true,
  },
  category: {
    type: String,
    required: true, // e.g., 'Pakistan Affairs', 'International Relations'
  },
  year: {
    type: Number, // For past papers
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String, // 'pdf', 'video', 'doc', etc.
    required: true,
  },
  fileSize: {
    type: Number, // in bytes
  },
  solved: {
    type: Boolean,
    default: false, // For past papers, indicates if answers are available
  },
  views: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  tags: [String],
  metadata: {
    author: String,
    publisher: String,
    edition: String,
    pages: Number,
    duration: String, // For videos
  },
}, {
  timestamps: true,
});

// Indexes for faster queries
resourceSchema.index({ type: 1, category: 1, year: -1 });
resourceSchema.index({ uploadedBy: 1 });
resourceSchema.index({ isActive: 1 });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
