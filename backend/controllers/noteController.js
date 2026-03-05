import {
  AVAILABLE_SUBJECTS,
  createImageNote,
  createTypedNote,
  deleteMyNote,
  getMyNotes,
  organizeNotes,
  updateMyNote,
} from '../services/myNotesService.js';
import { extractTextFromImage } from '../services/ocrService.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await getMyNotes({
      subjectId: req.query.subjectId,
      sourceType: req.query.sourceType,
      search: req.query.search,
    });

    res.json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to load notes' });
  }
};

export const getAvailableSubjects = async (req, res) => {
  res.json({ subjects: AVAILABLE_SUBJECTS });
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!content || String(content).trim().length === 0) {
      return res.status(400).json({ error: 'Note content is required' });
    }

    const note = await createTypedNote({ title, content });
    res.status(201).json({ note });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const uploadImageNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const ocrResult = await extractTextFromImage(req.file.path, { minimumBytes: 1024 });

    const note = await createImageNote({
      title: req.body?.title,
      content: req.body?.content,
      imageUrl,
      imageName: req.file.originalname,
      ocrText: ocrResult.text,
      ocrConfidence: ocrResult.confidence,
      ocrEngine: ocrResult.engine,
      ocrError: ocrResult.error || null,
    });

    res.status(201).json({ note });
  } catch (error) {
    console.error('Upload image note error:', error);
    res.status(500).json({ error: 'Failed to upload image note' });
  }
};

export const organizeMyNotes = async (req, res) => {
  try {
    const { noteIds = [], subjectIds = [], includeAllSubjects = false } = req.body || {};

    const result = await organizeNotes({
      noteIds,
      targetSubjectIds: subjectIds,
      useAllSubjects: Boolean(includeAllSubjects),
    });

    res.json(result);
  } catch (error) {
    console.error('Organize notes error:', error);
    res.status(400).json({ error: error.message || 'Failed to organize notes' });
  }
};

// Legacy endpoints retained for compatibility
export const getNote = async (req, res) => {
  const notes = await getMyNotes();
  const note = notes.find((n) => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json({ note });
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body || {};

    if (typeof title !== 'string' && typeof content !== 'string') {
      return res.status(400).json({ error: 'Provide title and/or content to update' });
    }

    const note = await updateMyNote(id, { title, content });
    res.json({ note });
  } catch (error) {
    console.error('Update note error:', error);
    const status = error.message === 'Note not found' ? 404 : 500;
    res.status(status).json({ error: error.message || 'Failed to update note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMyNote(id);
    res.json(result);
  } catch (error) {
    console.error('Delete note error:', error);
    const status = error.message === 'Note not found' ? 404 : 500;
    res.status(status).json({ error: error.message || 'Failed to delete note' });
  }
};

export const likeNote = async (req, res) => {
  res.status(501).json({ error: 'Like endpoint not implemented for My Notes' });
};
