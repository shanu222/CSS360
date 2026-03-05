import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../../server.js';

test('GET /api/notes/subjects returns available subjects', async () => {
  const response = await request(app)
    .get('/api/notes/subjects')
    .expect(200);

  assert.ok(Array.isArray(response.body.subjects));
  assert.ok(response.body.subjects.length > 0);
  assert.equal(typeof response.body.subjects[0].id, 'string');
});

test('POST /api/notes creates typed note and GET /api/notes lists it', async () => {
  const created = await request(app)
    .post('/api/notes')
    .send({
      title: 'Water Crisis Notes',
      content: 'Pakistan water crisis links with climate change, storage and governance issues.',
    })
    .expect(201);

  assert.ok(created.body.note);
  assert.equal(created.body.note.sourceType, 'typed');

  const listed = await request(app)
    .get('/api/notes')
    .expect(200);

  assert.ok(Array.isArray(listed.body.notes));
  assert.ok(listed.body.notes.some((note) => note.id === created.body.note.id));
});

test('POST /api/notes/my/upload creates image note', async () => {
  const pngBuffer = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const response = await request(app)
    .post('/api/notes/my/upload')
    .field('title', 'IR Handwritten')
    .field('content', 'Realism vs Liberalism quick notes')
    .attach('image', pngBuffer, { filename: 'note.png', contentType: 'image/png' })
    .expect(201);

  assert.ok(response.body.note);
  assert.equal(response.body.note.sourceType, 'image');
  assert.equal(typeof response.body.note.imageUrl, 'string');
});

test('POST /api/notes/my/organize organizes selected notes', async () => {
  const listResponse = await request(app).get('/api/notes').expect(200);
  const notes = listResponse.body.notes || [];
  assert.ok(notes.length > 0);

  const noteIds = notes.slice(0, 2).map((n) => n.id);
  const response = await request(app)
    .post('/api/notes/my/organize')
    .send({
      noteIds,
      subjectIds: ['pakistan-affairs', 'current-affairs-comp'],
      includeAllSubjects: false,
    })
    .expect(200);

  assert.equal(typeof response.body.organizedCount, 'number');
  assert.ok(Array.isArray(response.body.placements));
  assert.ok(response.body.placements.length > 0);
});

test('PUT /api/notes/:id updates note and clears old placements', async () => {
  const created = await request(app)
    .post('/api/notes')
    .send({
      title: 'Old Title',
      content: 'Old content about governance and policy.',
    })
    .expect(201);

  const noteId = created.body.note.id;
  const updated = await request(app)
    .put(`/api/notes/${noteId}`)
    .send({
      title: 'Updated Title',
      content: 'Updated content about economics and inflation.',
    })
    .expect(200);

  assert.equal(updated.body.note.title, 'Updated Title');
  assert.equal(updated.body.note.content, 'Updated content about economics and inflation.');
  assert.equal(updated.body.note.organized, false);
  assert.ok(Array.isArray(updated.body.note.placements));
  assert.equal(updated.body.note.placements.length, 0);
});

test('DELETE /api/notes/:id removes note from store', async () => {
  const created = await request(app)
    .post('/api/notes')
    .send({
      title: 'Delete Me',
      content: 'This note will be deleted.',
    })
    .expect(201);

  const noteId = created.body.note.id;
  await request(app)
    .delete(`/api/notes/${noteId}`)
    .expect(200);

  const listed = await request(app)
    .get('/api/notes')
    .expect(200);

  assert.ok(Array.isArray(listed.body.notes));
  assert.equal(listed.body.notes.some((note) => note.id === noteId), false);
});
