import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../../server.js';

function expectCommonModelShape(model) {
  assert.ok(model);
  assert.equal(typeof model.trainedAt, 'string');
  assert.equal(typeof model.reportCount, 'number');
  assert.ok(Array.isArray(model.reportsProcessed));
  assert.ok(model.rubricWeights);
}

test('GET /api/ai/examiner/profile returns profile contract', async () => {
  const response = await request(app)
    .get('/api/ai/examiner/profile')
    .expect(200);

  assert.ok(response.body.profile);
  expectCommonModelShape(response.body.profile);
  assert.ok(Array.isArray(response.body.profile.topMistakes));
  assert.ok(Array.isArray(response.body.profile.topIndicators));
  assert.ok(Array.isArray(response.body.profile.trendTopics));
});

test('POST /api/ai/examiner/train retrains and returns model contract', async () => {
  const response = await request(app)
    .post('/api/ai/examiner/train')
    .send({})
    .expect(200);

  assert.equal(response.body.message, 'Examiner model trained successfully from report PDFs.');
  expectCommonModelShape(response.body.model);
});

test('POST /api/ai/examiner/evaluate returns evaluation contract', async () => {
  const payload = {
    question: 'Discuss causes of water scarcity in Pakistan.',
    answer: 'Pakistan faces water scarcity due to population growth, inefficient irrigation, and climate change. It needs storage reforms and governance improvements.',
  };

  const response = await request(app)
    .post('/api/ai/examiner/evaluate')
    .send(payload)
    .expect(200);

  assert.ok(response.body.evaluation);
  assert.equal(typeof response.body.evaluation.overallScore, 'number');
  assert.ok(response.body.evaluation.criterionScores);
  assert.ok(Array.isArray(response.body.evaluation.strengths));
  assert.ok(Array.isArray(response.body.evaluation.weaknesses));
  assert.ok(Array.isArray(response.body.evaluation.prioritizedImprovements));
});

test('POST /api/ai/examiner/predict-questions returns fallback predictions without OPENAI key', async () => {
  const response = await request(app)
    .post('/api/ai/examiner/predict-questions')
    .send({ subject: 'Current Affairs', count: 3 })
    .expect(200);

  assert.ok(Array.isArray(response.body.predictedQuestions));
  assert.equal(response.body.predictedQuestions.length, 3);
});

test('POST /api/ai/examiner/refine returns 503 when OPENAI key is missing', async () => {
  const payload = {
    question: 'Discuss causes of water scarcity in Pakistan.',
    answer: 'Water issues are serious in Pakistan and government should do more.',
  };

  const response = await request(app)
    .post('/api/ai/examiner/refine')
    .send(payload)
    .expect(503);

  assert.equal(
    response.body.error,
    'AI refinement requires OPENAI_API_KEY. Examiner-model evaluation endpoint is still available.'
  );
});
