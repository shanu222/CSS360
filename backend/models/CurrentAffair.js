import mongoose from 'mongoose';

const currentAffairSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Pakistan', 'International', 'Economy', 'Environment', 'Security', 'Technology', 'Social'],
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
  },
  detailedContent: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cssRelevance: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  sources: [{
    name: String,
    url: String,
  }],
  relatedSubjects: [{
    type: String,
  }],
  isPublished: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

currentAffairSchema.index({ category: 1, date: -1 });
currentAffairSchema.index({ tags: 1 });
currentAffairSchema.index({ cssRelevance: 1 });

currentAffairSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('CurrentAffair', currentAffairSchema);
