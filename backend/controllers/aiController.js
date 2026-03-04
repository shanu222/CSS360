import OpenAI from 'openai';

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

// Chat with AI Assistant
export const chat = async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ 
        error: 'AI features are not configured. Please set OPENAI_API_KEY environment variable.' 
      });
    }

    const { message, context, subject } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build system message based on context
    let systemMessage = `You are an expert CSS (Central Superior Services) exam preparation assistant for Pakistan. 
You help students prepare for the CSS examination by providing accurate, detailed, and well-structured information.

Key areas you cover:
- Compulsory subjects: English Essay, English Precis & Composition, General Science, Current Affairs, Pakistan Affairs, Islamic Studies
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

    if (subject) {
      systemMessage += `\n\nThe student is currently focusing on: ${subject}.
Tailor your response to this subject.`;
    }

    if (context) {
      systemMessage += `\n\nAdditional context: ${context}`;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0].message.content;

    res.json({ 
      reply,
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens,
      },
    });
  } catch (error) {
    console.error('AI chat error:', error);

    // Handle API key issues
    if (error.code === 'invalid_api_key' || error.status === 401) {
      return res.status(500).json({ 
        error: 'AI service configuration error. Please contact administrator.' 
      });
    }

    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

// Generate essay outline
export const generateEssayOutline = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const prompt = `Create a detailed essay outline for CSS examination on the topic: "${topic}"

The outline should include:
1. Introduction with thesis statement
2. 3-4 main body paragraphs with key points
3. Conclusion
4. Suggested key arguments and examples
5. CSS-relevant perspectives

Format the outline clearly with main points and sub-points.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are an expert CSS essay writing coach. Create structured, comprehensive essay outlines." 
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const outline = completion.choices[0].message.content;

    res.json({ outline });
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

    const prompt = `Analyze this CSS examination essay and provide detailed feedback:

Topic: ${topic || 'Not specified'}

Essay:
${essay}

Provide feedback on:
1. Structure and organization
2. Thesis and arguments
3 Language and writing style
4. CSS relevance and perspective
5. Strengths and weaknesses
6. Suggestions for improvement
7. Estimated score range (out of 100)`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are an experienced CSS examiner analyzing essays. Provide constructive, detailed feedback." 
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const analysis = completion.choices[0].message.content;

    res.json({ analysis });
  } catch (error) {
    console.error('Essay analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze essay' });
  }
};

// Get study suggestions
export const getStudySuggestions = async (req, res) => {
  try {
    const { subjects, timeAvailable, examDate } = req.body;

    const prompt = `Create a personalized study plan for CSS examination:

Selected subjects: ${subjects.join(', ')}
Daily study time available: ${timeAvailable} hours
Exam date: ${examDate}

Provide:
1. Subject-wise time allocation
2. Weekly study schedule
3. Priority areas for each subject
4. Revision strategy
5. Practice test schedule
6. Tips for time management`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a CSS exam preparation strategist. Create practical, effective study plans." 
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const suggestions = completion.choices[0].message.content;

    res.json({ suggestions });
  } catch (error) {
    console.error('Study suggestions error:', error);
    res.status(500).json({ error: 'Failed to generate study suggestions' });
  }
};
