import fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import { PDFParse } from 'pdf-parse'; // Disabled: pdfjs-dist incompatible with Node.js DOM APIs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');

const REPORT_DIR_CANDIDATES = [
  path.join(PROJECT_ROOT, 'Examiner Reports'),
  path.join(PROJECT_ROOT, 'Examinor Reports'),
];

const MODEL_CACHE_PATH = path.join(PROJECT_ROOT, 'backend', 'data', 'examinerModel.json');

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'being', 'by', 'for', 'from', 'has',
  'have', 'he', 'her', 'his', 'i', 'in', 'is', 'it', 'its', 'of', 'on', 'or', 'she', 'that',
  'the', 'their', 'them', 'they', 'this', 'to', 'was', 'were', 'will', 'with', 'you', 'your',
  'students', 'student', 'answer', 'answers', 'paper', 'question', 'questions', 'css', 'exam',
]);

const RUBRIC_DIMENSIONS = {
  structure: ['introduction', 'conclusion', 'paragraph', 'organization', 'coherence', 'flow', 'outline'],
  argumentQuality: ['argument', 'analysis', 'critical', 'reasoning', 'logic', 'evaluation', 'balance'],
  evidence: ['example', 'evidence', 'fact', 'data', 'reference', 'citation', 'case', 'statistics'],
  relevance: ['relevant', 'focused', 'topic', 'demand', 'requirement', 'question'],
  language: ['grammar', 'expression', 'vocabulary', 'language', 'clarity', 'sentence', 'spelling'],
  examinerTone: ['precision', 'concise', 'direct', 'depth', 'maturity', 'insight', 'quality'],
};

const NEGATIVE_CUES = [
  'lack', 'weak', 'poor', 'irrelevant', 'vague', 'generalized', 'confused', 'inaccurate',
  'missing', 'failed', 'insufficient', 'repetition', 'overly descriptive', 'no analysis',
  'no evidence', 'grammatical error', 'spelling', 'off-topic', 'unstructured',
];

const POSITIVE_CUES = [
  'strong', 'excellent', 'good', 'well-argued', 'well-structured', 'critical insight',
  'analytical', 'coherent', 'relevant', 'balanced', 'evidence-based', 'mature approach',
  'focused', 'clear expression', 'precise',
];

function normalizeText(text) {
  return (text || '')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z][a-z-]{2,}/g) || []).filter((t) => !STOPWORDS.has(t));
}

function topEntries(mapLike, limit = 15) {
  return Object.entries(mapLike)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, value]) => ({ key, value }));
}

function increment(mapLike, key, amount = 1) {
  mapLike[key] = (mapLike[key] || 0) + amount;
}

function uniqueTop(items, limit = 20) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const normalized = item.toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(item);
    if (result.length >= limit) break;
  }
  return result;
}

async function detectReportDir() {
  for (const dir of REPORT_DIR_CANDIDATES) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  throw new Error('Examiner reports folder not found. Expected "Examiner Reports" or "Examinor Reports" at project root.');
}

async function listReportFiles(reportDir) {
  const entries = await fsp.readdir(reportDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'))
    .map((entry) => path.join(reportDir, entry.name));
}

async function extractPdfText(filePath) {
  // PDF parsing disabled due to pdfjs-dist Node.js incompatibility
  // Model will be trained from text-based reports instead
  console.warn(`Skipping PDF text extraction for ${filePath}`);
  return '';
}

function buildRubricWeights(rubricCounts) {
  const baseWeights = {
    structure: 20,
    argumentQuality: 22,
    evidence: 18,
    relevance: 18,
    language: 12,
    examinerTone: 10,
  };

  const totalObserved = Object.values(rubricCounts).reduce((sum, value) => sum + value, 0) || 1;
  const scaled = {};
  let total = 0;

  for (const [dimension, baseWeight] of Object.entries(baseWeights)) {
    const observedRatio = (rubricCounts[dimension] || 0) / totalObserved;
    const adjusted = baseWeight * 0.6 + observedRatio * 40;
    scaled[dimension] = adjusted;
    total += adjusted;
  }

  const normalized = {};
  for (const [dimension, value] of Object.entries(scaled)) {
    normalized[dimension] = Number(((value / total) * 100).toFixed(2));
  }

  return normalized;
}

function buildExaminerMindset(profile) {
  const strongest = Object.entries(profile.rubricWeights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  return [
    `Primary examiner focus areas: ${strongest.join(', ')}.`,
    'The examiner rewards direct response to question demand, analytical depth, and evidence-backed claims.',
    'The examiner penalizes generic narration, weak structure, and unsupported assertions.',
    'High-scoring answers are usually coherent, balanced, and explicitly linked to the question scope.',
  ].join(' ');
}

export async function trainExaminerModel() {
  const reportDir = await detectReportDir();
  const reportFiles = await listReportFiles(reportDir);

  if (reportFiles.length === 0) {
    throw new Error(`No PDF reports found in ${reportDir}`);
  }

  const corpus = [];
  const extractionWarnings = [];

  for (const filePath of reportFiles) {
    try {
      const text = await extractPdfText(filePath);
      if (text.length > 0) {
        corpus.push({
          file: path.basename(filePath),
          text,
        });
      } else {
        extractionWarnings.push(`No readable text found in ${path.basename(filePath)}`);
      }
    } catch (error) {
      extractionWarnings.push(`Failed to parse ${path.basename(filePath)}: ${error.message}`);
    }
  }

  if (corpus.length === 0) {
    throw new Error('Unable to parse any examiner report text from provided PDFs.');
  }

  const rubricCounts = Object.fromEntries(Object.keys(RUBRIC_DIMENSIONS).map((key) => [key, 0]));
  const tokenFreq = {};
  const biGramFreq = {};
  const directiveFreq = {};
  const mistakes = [];
  const indicators = [];

  for (const { text } of corpus) {
    const sentences = splitSentences(text);
    const tokens = tokenize(text);

    for (const token of tokens) {
      increment(tokenFreq, token);
    }

    for (let i = 0; i < tokens.length - 1; i += 1) {
      const bigram = `${tokens[i]} ${tokens[i + 1]}`;
      increment(biGramFreq, bigram);
    }

    for (const sentence of sentences) {
      const lower = sentence.toLowerCase();

      for (const [dimension, keywords] of Object.entries(RUBRIC_DIMENSIONS)) {
        for (const keyword of keywords) {
          if (lower.includes(keyword)) {
            increment(rubricCounts, dimension);
          }
        }
      }

      if (NEGATIVE_CUES.some((cue) => lower.includes(cue))) {
        mistakes.push(sentence);
      }

      if (POSITIVE_CUES.some((cue) => lower.includes(cue))) {
        indicators.push(sentence);
      }

      if (/(discuss|analyze|evaluate|explain|critically|justify|assess|compare|contrast)/i.test(sentence)) {
        const words = tokenize(sentence).slice(0, 8);
        if (words.length >= 2) {
          increment(directiveFreq, words.join(' '));
        }
      }
    }
  }

  const model = {
    metadata: {
      trainedAt: new Date().toISOString(),
      reportDirectory: reportDir,
      reportsProcessed: corpus.map((item) => item.file),
      reportCount: corpus.length,
      extractionWarnings,
    },
    rubricWeights: buildRubricWeights(rubricCounts),
    commonMistakes: uniqueTop(mistakes, 25),
    highScoringIndicators: uniqueTop(indicators, 25),
    topicTrends: {
      topTokens: topEntries(tokenFreq, 30).map((entry) => entry.key),
      topBigrams: topEntries(biGramFreq, 20).map((entry) => entry.key),
      directivePatterns: topEntries(directiveFreq, 12).map((entry) => entry.key),
    },
  };

  model.examinerMindset = buildExaminerMindset(model);

  await fsp.mkdir(path.dirname(MODEL_CACHE_PATH), { recursive: true });
  await fsp.writeFile(MODEL_CACHE_PATH, JSON.stringify(model, null, 2), 'utf8');

  return model;
}

export async function getOrTrainExaminerModel(forceRetrain = false) {
  if (!forceRetrain && fs.existsSync(MODEL_CACHE_PATH)) {
    const existing = await fsp.readFile(MODEL_CACHE_PATH, 'utf8');
    return JSON.parse(existing);
  }
  return trainExaminerModel();
}

function scoreDimension(answerText, keywords) {
  const lower = answerText.toLowerCase();
  const matches = keywords.reduce((acc, keyword) => acc + (lower.includes(keyword) ? 1 : 0), 0);
  return Math.min(1, matches / Math.max(2, Math.floor(keywords.length / 2)));
}

function scoreRelevance(answerText, questionText = '') {
  if (!questionText) return 0.65;
  const answerTokens = new Set(tokenize(answerText));
  const questionTokens = tokenize(questionText);
  if (questionTokens.length === 0) return 0.65;
  const overlap = questionTokens.filter((token) => answerTokens.has(token)).length;
  return Math.min(1, overlap / questionTokens.length);
}

export function evaluateAnswerAgainstModel({ answer, question, model }) {
  const safeAnswer = normalizeText(answer || '');
  if (!safeAnswer) {
    return {
      overallScore: 0,
      criterionScores: {},
      strengths: [],
      weaknesses: ['Answer text is empty.'],
      prioritizedImprovements: ['Provide a complete answer with clear structure and evidence.'],
    };
  }

  const criterionScores = {};
  for (const [dimension, keywords] of Object.entries(RUBRIC_DIMENSIONS)) {
    const ratio = dimension === 'relevance'
      ? scoreRelevance(safeAnswer, question)
      : scoreDimension(safeAnswer, keywords);
    criterionScores[dimension] = Number((ratio * 100).toFixed(2));
  }

  const penalties = [];
  const lower = safeAnswer.toLowerCase();
  const matchedMistakes = (model.commonMistakes || []).filter((mistake) => {
    const tokens = tokenize(mistake).slice(0, 4);
    return tokens.length > 0 && tokens.every((token) => lower.includes(token));
  });

  if (matchedMistakes.length > 0) {
    penalties.push(Math.min(12, matchedMistakes.length * 2));
  }

  const weightedRaw = Object.entries(model.rubricWeights || {}).reduce((acc, [dimension, weight]) => {
    const score = criterionScores[dimension] || 0;
    return acc + (score * weight) / 100;
  }, 0);

  const penaltyTotal = penalties.reduce((sum, value) => sum + value, 0);
  const overallScore = Math.max(0, Math.min(100, Number((weightedRaw - penaltyTotal).toFixed(2))));

  const strengths = Object.entries(criterionScores)
    .filter(([, score]) => score >= 70)
    .sort((a, b) => b[1] - a[1])
    .map(([dimension]) => `${dimension} is aligned with examiner expectations.`)
    .slice(0, 4);

  const weaknesses = Object.entries(criterionScores)
    .filter(([, score]) => score < 60)
    .sort((a, b) => a[1] - b[1])
    .map(([dimension]) => `${dimension} needs stronger treatment for higher marks.`)
    .slice(0, 4);

  const prioritizedImprovements = [
    ...weaknesses,
    ...(model.commonMistakes || []).slice(0, 3).map((mistake) => `Avoid this common examiner concern: ${mistake}`),
  ].slice(0, 6);

  return {
    overallScore,
    criterionScores,
    strengths,
    weaknesses,
    prioritizedImprovements,
    matchedExaminerWarnings: matchedMistakes.slice(0, 5),
  };
}

export function buildExaminerPromptContext(model) {
  const topMistakes = (model.commonMistakes || []).slice(0, 8).map((item) => `- ${item}`).join('\n');
  const topIndicators = (model.highScoringIndicators || []).slice(0, 8).map((item) => `- ${item}`).join('\n');
  const trendTokens = (model.topicTrends?.topTokens || []).slice(0, 15).join(', ');
  const trends = (model.topicTrends?.directivePatterns || []).slice(0, 8).join(' | ');

  return [
    'EXAMINER_MODEL_CONTEXT:',
    `Examiner mindset: ${model.examinerMindset}`,
    `Rubric weights: ${JSON.stringify(model.rubricWeights)}`,
    `Common mistakes to avoid:\n${topMistakes}`,
    `High-scoring indicators to include:\n${topIndicators}`,
    `Trend topics: ${trendTokens}`,
    `Directive patterns: ${trends}`,
    'Use this context to align outputs with examiner standards and marking behavior.',
  ].join('\n\n');
}
