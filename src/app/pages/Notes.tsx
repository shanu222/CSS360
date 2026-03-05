import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Brain,
  Check,
  FileText,
  Image as ImageIcon,
  Loader2,
  Plus,
  Sparkles,
  Upload,
} from 'lucide-react';
import { noteService } from '../../services/noteService';

type SubjectItem = {
  id: string;
  name: string;
  topics?: string[];
};

type NoteItem = {
  id: string;
  title: string;
  content: string;
  sourceType: 'typed' | 'image';
  imageUrl?: string | null;
  ocrText?: string;
  ocrConfidence?: number;
  ocrError?: string | null;
  organized?: boolean;
  placements?: Array<{
    subjectId: string;
    subjectName: string;
    topic: string;
    confidence: number;
  }>;
  createdAt: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageText, setImageText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [savingTyped, setSavingTyped] = useState(false);
  const [savingImage, setSavingImage] = useState(false);
  const [organizing, setOrganizing] = useState(false);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const [includeAllSubjects, setIncludeAllSubjects] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [lastOrganizeSummary, setLastOrganizeSummary] = useState<string>('');

  const selectedNotes = useMemo(
    () => notes.filter((note) => selectedNoteIds.includes(note.id)),
    [notes, selectedNoteIds]
  );

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [myNotes, subjectList] = await Promise.all([
        noteService.getNotes(),
        noteService.getAvailableSubjects(),
      ]);

      setNotes(Array.isArray(myNotes) ? myNotes : []);
      setSubjects(Array.isArray(subjectList) ? subjectList : []);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to load My Notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const clearAlerts = () => {
    setError(null);
    setSuccess(null);
  };

  const toggleNoteSelection = (noteId: string) => {
    setSelectedNoteIds((prev) =>
      prev.includes(noteId) ? prev.filter((id) => id !== noteId) : [...prev, noteId]
    );
  };

  const toggleSubjectSelection = (subjectId: string) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  };

  const saveTypedNote = async () => {
    clearAlerts();

    if (!content.trim()) {
      setError('Please write note content before saving.');
      return;
    }

    try {
      setSavingTyped(true);
      await noteService.createNote({ title: title.trim() || undefined, content });
      setTitle('');
      setContent('');
      setSuccess('Typed note saved in My Notes.');
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to save note');
    } finally {
      setSavingTyped(false);
    }
  };

  const uploadImageNote = async () => {
    clearAlerts();

    if (!imageFile) {
      setError('Please select an image to upload.');
      return;
    }

    try {
      setSavingImage(true);
      await noteService.uploadImageNote({
        image: imageFile,
        title: imageTitle.trim() || undefined,
        content: imageText.trim() || undefined,
      });
      setImageTitle('');
      setImageText('');
      setImageFile(null);
      setSuccess('Image note uploaded successfully.');
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to upload image note');
    } finally {
      setSavingImage(false);
    }
  };

  const organizeWithAI = async () => {
    clearAlerts();

    const noteIds = selectedNoteIds.length > 0 ? selectedNoteIds : notes.map((n) => n.id);
    if (noteIds.length === 0) {
      setError('Please add at least one note before organizing.');
      return;
    }

    if (!includeAllSubjects && selectedSubjectIds.length === 0) {
      setError('Select at least one subject or choose All Subjects.');
      return;
    }

    try {
      setOrganizing(true);
      const result = await noteService.organizeMyNotes({
        noteIds,
        subjectIds: selectedSubjectIds,
        includeAllSubjects,
      });

      setShowSubjectPicker(false);
      setLastOrganizeSummary(`${result.organizedCount} note(s) organized with ${result.aiEngine}.`);
      setSuccess('AI organization completed.');
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to organize notes');
    } finally {
      setOrganizing(false);
    }
  };

  const startEdit = (note: NoteItem) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title || '');
    setEditContent(note.content || '');
    clearAlerts();
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditTitle('');
    setEditContent('');
  };

  const saveEdit = async () => {
    if (!editingNoteId) return;
    try {
      setUpdating(true);
      await noteService.updateNote(editingNoteId, {
        title: editTitle,
        content: editContent,
      });
      setSuccess('Note updated successfully.');
      cancelEdit();
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to update note');
    } finally {
      setUpdating(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!window.confirm('Delete this note? This action cannot be undone.')) return;

    try {
      setDeletingNoteId(noteId);
      await noteService.deleteNote(noteId);
      setSelectedNoteIds((prev) => prev.filter((id) => id !== noteId));
      setSuccess('Note deleted successfully.');
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to delete note');
    } finally {
      setDeletingNoteId(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] text-white">
        <h2 className="text-xl font-semibold text-white">My Notes</h2>
        <p className="text-green-200 text-xs mt-1">
          Upload handwritten or typed notes, then organize them with AI into relevant CSS subjects and topics.
        </p>
      </div>

      {(error || success) && (
        <div className="px-4 pt-3">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-green-700 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{success}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-600" />
              Write Note in Editor
            </h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-2"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your notes here..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[140px]"
            />
            <button
              onClick={saveTypedNote}
              disabled={savingTyped}
              className="mt-3 w-full rounded-lg bg-green-600 text-white text-sm py-2 hover:bg-green-700 disabled:opacity-60"
            >
              {savingTyped ? 'Saving...' : 'Save Typed Note'}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-600" />
              Upload Image Note
            </h3>
            <input
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              placeholder="Image note title"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-2"
            />
            <textarea
              value={imageText}
              onChange={(e) => setImageText(e.target.value)}
              placeholder="Optional text context for this image"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[90px] mb-2"
            />
            <label className="w-full rounded-lg border border-dashed border-gray-300 px-3 py-3 text-sm text-gray-600 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              <span>{imageFile ? imageFile.name : 'Choose image (JPG, PNG, WEBP)'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </label>
            <button
              onClick={uploadImageNote}
              disabled={savingImage}
              className="mt-3 w-full rounded-lg bg-blue-600 text-white text-sm py-2 hover:bg-blue-700 disabled:opacity-60"
            >
              {savingImage ? 'Uploading...' : 'Upload Image Note'}
            </button>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-semibold text-gray-800">My Notes Library</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSubjectPicker(true)}
                disabled={organizing || notes.length === 0}
                className="rounded-lg bg-purple-600 text-white text-xs px-3 py-2 hover:bg-purple-700 disabled:opacity-60 flex items-center gap-1"
              >
                {organizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Brain className="w-3.5 h-3.5" />}
                Organize with AI
              </button>
              <button
                onClick={loadData}
                className="rounded-lg border border-gray-300 text-gray-600 text-xs px-3 py-2 hover:bg-gray-50"
              >
                Refresh
              </button>
            </div>
          </div>

          {lastOrganizeSummary && (
            <div className="mb-3 rounded-lg bg-purple-50 border border-purple-200 p-2 text-purple-700 text-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {lastOrganizeSummary}
            </div>
          )}

          {loading ? (
            <div className="h-56 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
            </div>
          ) : notes.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-center text-gray-500 text-sm">
              <div>
                <Plus className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                Add your first note using the editor or image upload.
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-[62vh] overflow-y-auto pr-1">
              {notes.map((note) => (
                <div key={note.id} className="rounded-lg border border-gray-200 p-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedNoteIds.includes(note.id)}
                      onChange={() => toggleNoteSelection(note.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-gray-800 truncate">{note.title}</p>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          {note.sourceType === 'image' ? 'Image Note' : 'Typed Note'}
                        </span>
                        {note.organized && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">Organized</span>
                        )}
                        <div className="ml-auto flex items-center gap-1">
                          <button
                            onClick={() => startEdit(note)}
                            className="text-[11px] px-2 py-0.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            disabled={deletingNoteId === note.id}
                            className="text-[11px] px-2 py-0.5 rounded border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-60"
                          >
                            {deletingNoteId === note.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                      {note.content && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-3">{note.content}</p>
                      )}
                      {note.imageUrl && (
                        <a
                          href={note.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block text-xs text-blue-600 mt-1 hover:underline"
                        >
                          View uploaded image
                        </a>
                      )}
                      {note.ocrText && (
                        <div className="mt-1 text-[11px] text-gray-500">
                          OCR: {note.ocrText.slice(0, 220)}{note.ocrText.length > 220 ? '...' : ''}
                          {typeof note.ocrConfidence === 'number' && ` (confidence ${(note.ocrConfidence * 100).toFixed(0)}%)`}
                        </div>
                      )}
                      {note.ocrError && (
                        <div className="mt-1 text-[11px] text-orange-600">OCR issue: {note.ocrError}</div>
                      )}

                      {editingNoteId === note.id && (
                        <div className="mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2 space-y-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Edit title"
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            placeholder="Edit note content"
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs min-h-[72px]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={cancelEdit}
                              className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-600 hover:bg-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveEdit}
                              disabled={updating}
                              className="text-xs px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                            >
                              {updating ? 'Saving...' : 'Save'}
                            </button>
                          </div>
                        </div>
                      )}
                      {(note.placements || []).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {note.placements?.map((placement) => (
                            <span key={`${note.id}-${placement.subjectId}-${placement.topic}`} className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                              {placement.subjectName} / {placement.topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showSubjectPicker && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white border border-gray-200 shadow-xl p-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-base font-semibold text-gray-800">Choose Subject Scope for AI Organization</h3>
            <p className="text-xs text-gray-500 mt-1">
              Selected notes: {selectedNotes.length > 0 ? selectedNotes.length : notes.length}.
              You can select one, multiple, or all subjects.
            </p>

            <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={includeAllSubjects}
                onChange={(e) => setIncludeAllSubjects(e.target.checked)}
              />
              Organize across all subjects
            </label>

            {!includeAllSubjects && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <label key={subject.id} className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedSubjectIds.includes(subject.id)}
                      onChange={() => toggleSubjectSelection(subject.id)}
                    />
                    <span className="truncate">{subject.name}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowSubjectPicker(false)}
                className="rounded-lg border border-gray-300 text-gray-700 text-sm px-3 py-2 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={organizeWithAI}
                disabled={organizing}
                className="rounded-lg bg-purple-600 text-white text-sm px-3 py-2 hover:bg-purple-700 disabled:opacity-60"
              >
                {organizing ? 'Organizing...' : 'Run AI Organizer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
