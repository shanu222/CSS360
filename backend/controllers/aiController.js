import OpenAI from 'openai';
import {
  buildExaminerPromptContext,
  evaluateAnswerAgainstModel,
  getOrTrainExaminerModel,
} from '../services/examinerModelService.js';

let openai;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
} catch (error) {
  console.warn('OpenAI API key not configured. AI features will be disabled.');
}

async function getExaminerContext(forceRetrain = false) {
  const model = await getOrTrainExaminerModel(forceRetrain);
  return {
    model,
    context: buildExaminerPromptContext(model),
  };
}

async function createCompletion(messages, options = {}) {
  if (!openai) {
    throw new Error('OPENAI_UNAVAILABLE');
  }

  return openai.chat.completions.create({
    model: 'gpt-4',
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1000,
    messages,
  });
}

function summarizeModel(model) {
  return {
    trainedAt: model.metadata?.trainedAt,
    reportCount: model.metadata?.reportCount,
    reportsProcessed: model.metadata?.reportsProcessed,
    rubricWeights: model.rubricWeights,
    topMistakes: (model.commonMistakes || []).slice(0, 10),
    topIndicators: (model.highScoringIndicators || []).slice(0, 10),
    trendTopics: (model.topicTrends?.topTokens || []).slice(0, 12),
    extractionWarnings: model.metadata?.extractionWarnings || [],
  };
}

// Chat with AI Assistant
export const chat = async (req, res) => {
  try {
    const { message, context, subject } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const examiner = await getExaminerContext();

    let systemMessage = `You are an expert CSS (Central Superior Services) exam preparation assistant for Pakistan.
You help students prepare for the CSS examination by providing accurate, detailed, and well-structured information.

Key areas you cover:
- Compulsory subjects: English Essay, English Precis and Composition, General Science, Current Affairs, Pakistan Affairs, Islamic Studies
- Optional subjects: Economics, Political Science, International Relations, Computer Science, and others
- Study strategies and time management
- Essay writing techniques
- Current affairs analysis with CSS relevance
- Past paper analysis and question trends

Always:
- Provide accurate, CSS-specific information
- Structure your responses with clear headings when appropriate
- Reference official sources like FPSC guidelines
- Give practical examples and tips
- Be encouraging and supportive`;

    systemMessage += `\n\n${examiner.context}`;

    if (subject) {
      systemMessage += `\n\nThe student is currently focusing on: ${subject}. Tailor your response to this subject.`;
    }

    if (context) {
      systemMessage += `\n\nAdditional context: ${context}`;
    }

    const completion = await createCompletion(
      [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message },
      ],
      { temperature: 0.7, maxTokens: 1000 }
    );

    res.json({
      reply: completion.choices[0].message.content,
      examinerModel: {
        trainedAt: examiner.model.metadata?.trainedAt,
        reportCount: examiner.model.metadata?.reportCount,
      },
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens,
      },
    });
  } catch (error) {
    console.error('AI chat error:', error);

    if (error.message === 'OPENAI_UNAVAILABLE') {
      return res.status(503).json({
        error: 'AI features are not configured. Please set OPENAI_API_KEY environment variable.',
      });
    }

    if (error.code === 'invalid_api_key' || error.status === 401) {
      return res.status(500).json({
        error: 'AI service configuration error. Please contact administrator.',
      });
    }

    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

// Generate essay outline
export const generateEssayOutline = async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({
        error: 'AI features are not configured. Please set OPENAI_API_KEY environment variable.',
      });
    }

    const { topic } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const examiner = await getExaminerContext();
    const completion = await createCompletion(
      [
        {
          role: 'system',
          content: `You are an expert CSS essay coach.\n\n${examiner.context}`,
        },
        {
          role: 'user',
          content: `Create a detailed CSS essay outline for topic: "${topic}".

Align strictly with examiner expectations from model context.
Include:
1. Introduction with thesis statement
2. 4-5 analytical body segments
3. Evidence/examples under each segment
4. Counter-argument and rebuttal
5. Conclusion with policy-level insight
6. 5 common mistakes to avoid for this topic`,
        },
      ],
      { temperature: 0.6, maxTokens: 1200 }
    );

    res.json({
      outline: completion.choices[0].message.content,
      examinerModel: {
        trainedAt: examiner.model.metadata?.trainedAt,
        reportCount: examiner.model.metadata?.reportCount,
      },
    });
  } catch (error) {
    console.error('Essay outline error:', error);
    res.status(500).json({ error: 'Failed to generate essay outline' });
  }
};

// Analyze essay
export const analyzeEssay = async (req, res) => {
  try {
    const { essay, topic } = req.body;

    if (!essay || essay.trim().length === 0) {
      return res.status(400).json({ error: 'Essay text is required' });
    }

    const examiner = await getExaminerContext();
    const modelEvaluation = evaluateAnswerAgainstModel({
      answer: essay,
      question: topic,
      model: examiner.model,
    });

    if (!openai) {
      return res.json({
        analysis: modelEvaluation,
        note: 'Returned examiner-model heuristic analysis because OPENAI_API_KEY is not configured.',
      });
    }

    const completion = await createCompletion(
      [
        {
          role: 'system',
          content: `You are an experienced CSS examiner.\n\n${examiner.context}`,
        },
        {
          role: 'user',
          content: `Analyze this CSS essay with examiner-model alignment.

Topic: ${topic || 'Not specified'}

Essay:
${essay}

Heuristic evaluation from trained examiner model:
${JSON.stringify(modelEvaluation, null, 2)}

Provide:
1. Final score out of 100
2. Criterion-wise comments
3. Top strengths
4. Top weaknesses
5. Actionable remodeling steps
6. A revised high-scoring answer framework`,
        },
      ],
      { temperature: 0.5, maxTokens: 1500 }
    );

    res.json({
      analysis: completion.choices[0].message.content,
      examinerModelEvaluation: modelEvaluation,
    });
  } catch (error) {
    console.error('Essay analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze essay' });
  }
};

// Get study suggestions
export const getStudySuggestions = async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({
        error: 'AI features are not configured. Please set OPENAI_API_KEY environment variable.',
      });
    }

    const { subjects, timeAvailable, examDate } = req.body;
    const examiner = await getExaminerContext();

    const completion = await createCompletion(
      [
        {
          role: 'system',
          content: `You are a CSS exam preparation strategist.\n\n${examiner.context}`,
        },
        {
          role: 'user',
          content: `Create a personalized CSS study plan:
Selected subjects: ${subjects.join(', ')}
Daily study time: ${timeAvailable} hours
Exam date: ${examDate}

Use examiner-model priorities for what gets tested and what earns higher marks.
Provide:
1. Subject-wise time allocation
2. Weekly schedule
3. High-impact question practice plan
4. Examiner-expectation checklist`,
        },
      ],
      { temperature: 0.7, maxTokens: 1200 }
    );

    res.json({ suggestions: completion.choices[0].message.content });
  } catch (error) {
    console.error('Study suggestions error:', error);
    res.status(500).json({ error: 'Failed to generate study suggestions' });
  }
};

// Train or retrain examiner model
export const trainExaminerModel = async (req, res) => {
  try {
    const examiner = await getExaminerContext(true);
    res.json({
      message: 'Examiner model trained successfully from report PDFs.',
      model: summarizeModel(examiner.model),
    });
  } catch (error) {
    console.error('Examiner model training error:', error);
    res.status(500).json({ error: error.message || 'Failed to train examiner model' });
  }
};

// Get current examiner profile
export const getExaminerProfile = async (req, res) => {
  try {
    const examiner = await getExaminerContext();
    res.json({ profile: summarizeModel(examiner.model) });
  } catch (error) {
    console.error('Examiner profile error:', error);
    res.status(500).json({ error: error.message || 'Failed to load examiner profile' });
  }
};

// Evaluate descriptive answer using examiner model
export const evaluateAnswerWithExaminerModel = async (req, res) => {
  try {
    const { answer, question } = req.body;
    if (!answer || answer.trim().length === 0) {
      return res.status(400).json({ error: 'Answer text is required' });
    }

    const examiner = await getExaminerContext();
    const evaluation = evaluateAnswerAgainstModel({
      answer,
      question,
      model: examiner.model,
    });

    if (!openai) {
      return res.json({ evaluation });
    }

    const completion = await createCompletion(
      [
        {
          role: 'system',
          content: `You are a CSS examiner. Explain model-based evaluation in clear student-friendly terms.\n\n${examiner.context}`,
        },
        {
          role: 'user',
          content: `Question: ${question || 'Not provided'}\n\nAnswer:\n${answer}\n\nModel evaluation:\n${JSON.stringify(evaluation, null, 2)}\n\nConvert this into final examiner-style feedback with mark-boosting guidance.`,
        },
      ],
      { temperature: 0.4, maxTokens: 1000 }
    );

    res.json({
      evaluation,
      examinerFeedback: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Examiner evaluation error:', error);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
};

// Refine/remodel answer to match examiner standards
export const refineAnswerWithExaminerModel = async (req, res) => {
  try {
    const { answer, question } = req.body;
    if (!answer || answer.trim().length === 0) {
      return res.status(400).json({ error: 'Answer text is required' });
    }

    if (!openai) {
      return res.status(503).json({
        error: 'AI refinement requires OPENAI_API_KEY. Examiner-model evaluation endpoint is still available.',
      });
    }

    const examiner = await getExaminerContext();
    const evaluation = evaluateAnswerAgainstModel({
      answer,
      question,
      model: examiner.model,
    });

    const completion = await createCompletion(
      [
        {
          role: 'system',
          content: `You are a senior CSS paper checker. Remodel answers to match examiner marking standards.\n\n${examiner.context}`,
        },
        {
          role: 'user',
          content: `Question: ${question || 'Not provided'}\n\nOriginal answer:\n${answer}\n\nExaminer-model gaps:\n${JSON.stringify(evaluation, null, 2)}\n\nReturn:\n1. Refined answer\n2. What was changed and why\n3. Quick checklist for future answers`,
        },
      ],
      { temperature: 0.45, maxTokens: 1600 }
    );

    res.json({
      refined: completion.choices[0].message.content,
      baselineEvaluation: evaluation,
    });
  } catch (error) {
    console.error('Answer refinement error:', error);
    res.status(500).json({ error: 'Failed to refine answer' });
  }
};

// Predict likely future questions from examiner trend signals
export const predictFutureQuestions = async (req, res) => {
  try {
    const { subject, count = 5 } = req.body || {};
    const examiner = await getExaminerContext();

    if (!openai) {
      const trends = (examiner.model.topicTrends?.directivePatterns || []).slice(0, Number(count));
      return res.json({
        predictedQuestions: trends.map((trend, idx) => `Q${idx + 1}: Discuss ${trend} with critical analysis and evidence.`),
        note: 'Heuristic predictions returned because OPENAI_API_KEY is not configured.',
      });
    }

    const completion = await createCompletion(
      [
        {
          role: 'system',
          content: `You generate CSS-style future question predictions based on examiner trend behavior.\n\n${examiner.context}`,
        },
        {
          role: 'user',
          content: `Generate ${Number(count)} probable future CSS descriptive questions${subject ? ` for subject ${subject}` : ''}.\nFocus on recurring examiner directives, topic trends, and expected analytical depth.`,
        },
      ],
      { temperature: 0.75, maxTokens: 1000 }
    );

    res.json({
      predictedQuestions: completion.choices[0].message.content,
      trendSignalsUsed: {
        topTokens: (examiner.model.topicTrends?.topTokens || []).slice(0, 15),
        directives: (examiner.model.topicTrends?.directivePatterns || []).slice(0, 10),
      },
    });
  } catch (error) {
    console.error('Question prediction error:', error);
    res.status(500).json({ error: 'Failed to predict future questions' });
  }
};
