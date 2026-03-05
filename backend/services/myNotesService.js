import fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'backend', 'data');
const NOTES_FILE = path.join(DATA_DIR, 'myNotes.json');

export const AVAILABLE_SUBJECTS = [
  {
    id: 'english-essay',
    name: 'English Essay',
    topics: ['Argumentative Essays', 'Descriptive Essays', 'Essay Outlines', 'Critical Thinking', 'Vocabulary Building'],
  },
  {
    id: 'english-precis',
    name: 'English Precis & Composition',
    topics: ['Precis Writing', 'Grammar & Usage', 'Comprehension', 'Translation', 'Idioms & Phrases'],
  },
  {
    id: 'general-science',
    name: 'General Science & Ability',
    topics: ['Physics Basics', 'Chemistry Concepts', 'Biology Fundamentals', 'Mental Ability', 'Analytical Reasoning'],
  },
  {
    id: 'current-affairs-comp',
    name: 'Current Affairs',
    topics: ['Pakistan Affairs', 'International Relations', 'Economy', 'Environmental Issues', 'Security Issues'],
  },
  {
    id: 'pakistan-affairs',
    name: 'Pakistan Affairs',
    topics: ['Pakistan Movement', 'Constitutional Development', 'Foreign Policy', 'Economic Issues', 'Governance Challenges'],
  },
  {
    id: 'islamic-studies',
    name: 'Islamic Studies / Comparative Religion',
    topics: ['Quran & Hadith', 'Islamic Jurisprudence', 'Islamic History', 'Comparative Religion', 'Ethics & Morality'],
  },
  {
    id: 'international-relations',
    name: 'International Relations',
    topics: ['Realism', 'Liberalism', 'Constructivism', 'UN System', 'Geopolitics'],
  },
  {
    id: 'political-science',
    name: 'Political Science',
    topics: ['Political Theory', 'Comparative Politics', 'Political Institutions', 'Public Policy'],
  },
  {
    id: 'economics',
    name: 'Economics',
    topics: ['Microeconomics', 'Macroeconomics', 'Fiscal Policy', 'Monetary Policy', 'Development Economics'],
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    topics: ['Programming', 'Data Structures', 'Databases', 'Computer Networks', 'Operating Systems'],
  },
  {
    id: 'public-administration',
    name: 'Public Administration',
    topics: ['Administrative Theory', 'Bureaucracy', 'Public Policy', 'Governance Models'],
  },
  {
    id: 'governance',
    name: 'Governance & Public Policy',
    topics: ['Policy Analysis', 'Institutional Reform', 'Accountability', 'Service Delivery'],
  },
  {
    id: 'environmental-science',
    name: 'Environmental Science',
    topics: ['Climate Change', 'Pollution', 'Biodiversity', 'Sustainability', 'Environmental Policy'],
  },
  {
    id: 'sociology',
    name: 'Sociology',
    topics: ['Social Institutions', 'Social Change', 'Culture', 'Population Studies'],
  },
  {
    id: 'geography',
    name: 'Geography',
    topics: ['Physical Geography', 'Human Geography', 'Climatology', 'GIS Basics'],
  },
  {
    id: 'psychology',
    name: 'Psychology',
    topics: ['Cognitive Psychology', 'Behavior', 'Developmental Psychology', 'Personality'],
  },
];

function normalizeText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function keywordScore(noteText, keywords) {
  const haystack = normalizeText(noteText);
  if (!haystack) return 0;

  return keywords.reduce((score, keyword) => {
    const k = normalizeText(keyword);
    if (!k) return score;
    if (haystack.includes(k)) return score + 3;

    const parts = k.split(' ').filter(Boolean);
    const partials = parts.filter((part) => haystack.includes(part)).length;
    return score + partials;
  }, 0);
}

async function ensureStore() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  if (!fs.existsSync(NOTES_FILE)) {
    await fsp.writeFile(NOTES_FILE, JSON.stringify({ notes: [] }, null, 2), 'utf8');
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fsp.readFile(NOTES_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed.notes) ? parsed : { notes: [] };
}

async function writeStore(store) {
  await ensureStore();
  await fsp.writeFile(NOTES_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function buildPlacement(note, subjects) {
  const sourceText = `${note.title || ''} ${note.content || ''} ${note.ocrText || ''}`.trim();

  const ranked = subjects
    .map((subject) => {
      const subjectKeywords = [subject.name, ...(subject.topics || [])];
      const score = keywordScore(sourceText, subjectKeywords);

      const bestTopic = (subject.topics || [])
        .map((topic) => ({ topic, score: keywordScore(sourceText, [topic]) }))
        .sort((a, b) => b.score - a.score)[0];

      return {
        subjectId: subject.id,
        subjectName: subject.name,
        score,
        topic: (bestTopic && bestTopic.score > 0) ? bestTopic.topic : (subject.topics?.[0] || 'General'),
      };
    })
    .sort((a, b) => b.score - a.score);

  const top = ranked.slice(0, 2).filter((item, idx) => item.score > 0 || idx === 0);
  return top.map((item) => ({
    subjectId: item.subjectId,
    subjectName: item.subjectName,
    topic: item.topic,
    confidence: Number(Math.min(0.99, 0.55 + item.score * 0.04).toFixed(2)),
  }));
}

export async function getMyNotes(filters = {}) {
  const store = await readStore();
  let notes = [...store.notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (filters.subjectId) {
    notes = notes.filter((note) => (note.placements || []).some((p) => p.subjectId === filters.subjectId));
  }

  if (filters.sourceType) {
    notes = notes.filter((note) => note.sourceType === filters.sourceType);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    notes = notes.filter((note) =>
      note.title?.toLowerCase().includes(search) ||
      note.content?.toLowerCase().includes(search) ||
      note.ocrText?.toLowerCase().includes(search) ||
      (note.placements || []).some((p) => p.subjectName.toLowerCase().includes(search) || p.topic.toLowerCase().includes(search))
    );
  }

  return notes;
}

export async function createTypedNote({ title, content }) {
  const store = await readStore();
  const now = new Date().toISOString();
  const note = {
    id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: title?.trim() || 'Untitled Note',
    content: content?.trim() || '',
    sourceType: 'typed',
    imageUrl: null,
    imageName: null,
    ocrText: '',
    ocrConfidence: 0,
    ocrEngine: null,
    ocrError: null,
    placements: [],
    organized: false,
    createdAt: now,
    updatedAt: now,
  };

  store.notes.push(note);
  await writeStore(store);
  return note;
}

export async function createImageNote({
  title,
  content,
  imageUrl,
  imageName,
  ocrText,
  ocrConfidence,
  ocrEngine,
  ocrError,
}) {
  const store = await readStore();
  const now = new Date().toISOString();
  const note = {
    id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: title?.trim() || imageName || 'Image Note',
    content: content?.trim() || '',
    sourceType: 'image',
    imageUrl,
    imageName,
    ocrText: ocrText?.trim() || '',
    ocrConfidence: Number(ocrConfidence || 0),
    ocrEngine: ocrEngine || null,
    ocrError: ocrError || null,
    placements: [],
    organized: false,
    createdAt: now,
    updatedAt: now,
  };

  store.notes.push(note);
  await writeStore(store);
  return note;
}

export async function updateMyNote(noteId, updates = {}) {
  const store = await readStore();
  const target = store.notes.find((note) => note.id === noteId);
  if (!target) {
    throw new Error('Note not found');
  }

  const nextTitle = typeof updates.title === 'string' ? updates.title.trim() : target.title;
  const nextContent = typeof updates.content === 'string' ? updates.content.trim() : target.content;

  target.title = nextTitle || target.title;
  target.content = nextContent;
  target.organized = false;
  target.placements = [];
  target.updatedAt = new Date().toISOString();

  await writeStore(store);
  return target;
}

export async function deleteMyNote(noteId) {
  const store = await readStore();
  const before = store.notes.length;
  store.notes = store.notes.filter((note) => note.id !== noteId);

  if (store.notes.length === before) {
    throw new Error('Note not found');
  }

  await writeStore(store);
  return { deleted: true };
}

export async function organizeNotes({ noteIds, targetSubjectIds, useAllSubjects }) {
  const store = await readStore();
  const selectedNotes = (noteIds && noteIds.length > 0)
    ? store.notes.filter((note) => noteIds.includes(note.id))
    : [...store.notes];

  const subjects = useAllSubjects
    ? AVAILABLE_SUBJECTS
    : AVAILABLE_SUBJECTS.filter((subject) => (targetSubjectIds || []).includes(subject.id));

  if (subjects.length === 0) {
    throw new Error('No target subjects selected for organization.');
  }

  const now = new Date().toISOString();
  const results = selectedNotes.map((note) => {
    const placements = buildPlacement(note, subjects);

    const target = store.notes.find((n) => n.id === note.id);
    if (target) {
      target.placements = placements;
      target.organized = true;
      target.updatedAt = now;
    }

    return {
      noteId: note.id,
      title: note.title,
      placements,
    };
  });

  await writeStore(store);

  return {
    organizedCount: results.length,
    placements: results,
    aiEngine: 'heuristic-organizer',
  };
}
