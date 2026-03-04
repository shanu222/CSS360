import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CurrentAffair from '../models/CurrentAffair.js';

dotenv.config();

const currentAffairsData = [
  {
    category: 'Pakistan',
    title: "Pakistan's Economic Recovery Program 2026",
    summary: "Pakistan has secured a new IMF bailout package worth $3 billion to stabilize its economy amid fiscal challenges. The program includes structural reforms in taxation and energy sectors.",
    detailedContent: "The International Monetary Fund has approved a comprehensive economic recovery program for Pakistan, marking a crucial step in the country's financial stabilization efforts...",
    date: new Date('2026-03-01'),
    cssRelevance: 'High',
    tags: ['Economy', 'IMF', 'Pakistan', 'Reforms'],
    relatedSubjects: ['Economics', 'Pakistan Affairs'],
    sources: [
      { name: 'IMF Official', url: 'https://imf.org' },
    ],
  },
  {
    category: 'International',
    title: 'US-China Strategic Competition Intensifies',
    summary: 'Tensions between the United States and China continue to escalate over Taiwan, South China Sea disputes, and trade wars, reshaping global geopolitical alignments.',
    detailedContent: 'The strategic competition between the two superpowers has entered a new phase...',
    date: new Date('2026-03-02'),
    cssRelevance: 'High',
    tags: ['US', 'China', 'Geopolitics', 'Taiwan'],
    relatedSubjects: ['International Relations', 'Current Affairs'],
    sources: [],
  },
  {
    category: 'Environment',
    title: 'COP30 Climate Commitments and Pakistan',
    summary: 'Nations at the latest COP summit pledged enhanced Nationally Determined Contributions (NDCs) to limit global warming to 1.5°C, with developing nations demanding climate finance.',
    detailedContent: 'The 30th Conference of Parties on climate change concluded with significant commitments...',
    date: new Date('2026-02-28'),
    cssRelevance: 'High',
    tags: ['Climate', 'Environment', 'International', 'COP30'],
    relatedSubjects: ['Environmental Science', 'International Relations'],
    sources: [],
  },
  {
    category: 'Pakistan',
    title: 'CPEC Phase II: New Developments',
    summary: 'Pakistan and China have launched the second phase of CPEC focusing on industrial cooperation, agricultural development, and digital connectivity.',
    detailedContent: 'The China-Pakistan Economic Corridor enters its transformative second phase...',
    date: new Date('2026-01-15'),
    cssRelevance: 'High',
    tags: ['CPEC', 'China', 'Development', 'Pakistan'],
    relatedSubjects: ['Pakistan Affairs', 'Economics', 'International Relations'],
    sources: [],
  },
];

async function seedCurrentAffairs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/css360-academy');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await CurrentAffair.deleteMany({});
    console.log('🗑️ Cleared existing current affairs');

    // Insert new data
    await  CurrentAffair.insertMany(currentAffairsData);
    console.log('✅ Seeded current affairs data');

    console.log(`📊 Total records: ${currentAffairsData.length}`);
  } catch (error) {
    console.error('❌ Seed error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  }
}

seedCurrentAffairs();
