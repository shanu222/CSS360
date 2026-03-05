import { useState, useEffect } from "react";
import { Search, Plus, Star, BookOpen, FileText, Tag, Clock, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { resourceService } from "../../services/resourceService";

export default function Notes() {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [activeNote, setActiveNote] = useState<any | null>(null);
  const [showStarred, setShowStarred] = useState(false);
  const [notesData, setNotesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await resourceService.getResources({ type: 'note' });
      setNotesData(data);
    } catch (err: any) {
      setError(err.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const subjects = ["All", ...Array.from(new Set(notesData.map(n => n.category)))];

  const filtered = notesData.filter(note => {
    const matchSearch = note.title?.toLowerCase().includes(search.toLowerCase()) ||
      note.category?.toLowerCase().includes(search.toLowerCase()) ||
      note.description?.toLowerCase().includes(search.toLowerCase());
    const matchSub = filterSubject === "All" || note.category === filterSubject;
    const matchStar = !showStarred || note.metadata?.starred;
    return matchSearch && matchSub && matchStar;
  });

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] text-white flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl text-white font-semibold">Notes</h2>
            <p className="text-green-200 text-xs">Topic-wise notes for all CSS subjects</p>
          </div>
          <button className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-xs sm:text-sm px-2.5 sm:px-3 py-2 rounded-xl transition-colors flex-shrink-0 touch-highlight">
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New Note</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Notes List */}
        <div className={`${activeNote ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-200 bg-white`}>
          {/* Search & Filters */}
          <div className="p-2 sm:p-3 border-b border-gray-100 space-y-2 flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400 min-w-0"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              <button
                onClick={() => setShowStarred(!showStarred)}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 active:opacity-80 ${
                  showStarred ? "bg-yellow-100 text-yellow-700 border border-yellow-300" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                <Star className="w-3 h-3" fill={showStarred ? "currentColor" : "none"} /> Starred
              </button>
              {subjects.slice(0, 5).map(sub => (
                <button
                  key={sub}
                  onClick={() => setFilterSubject(sub)}
                  className={`px-2 sm:px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap flex-shrink-0 transition-all active:opacity-80 ${
                    filterSubject === sub ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {sub === "All" ? "All" : sub.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="m-3 bg-red-50 border border-red-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-800 font-medium text-sm">Failed to load notes</p>
              </div>
              <p className="text-red-600 text-xs mb-2">{error}</p>
              <button
                onClick={loadNotes}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {/* Notes List */}
          {!loading && !error && (
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No notes found</p>
              </div>
            ) : (
              filtered.map((note) => {
                const colorOptions = ['bg-sky-500', 'bg-emerald-600', 'bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-600', 'bg-teal-500'];
                const noteColor = colorOptions[Math.abs(note.title?.charCodeAt(0) || 0) % colorOptions.length];
                
                return (
                <button
                  key={note._id}
                  onClick={() => setActiveNote(note)}
                  className={`w-full text-left p-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    activeNote?._id === note._id ? "bg-green-50 border-l-4 border-l-green-500" : ""
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${noteColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-800 text-sm font-medium truncate">{note.title}</p>
                        {note.metadata?.starred && <Star className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 ml-1" fill="currentColor" />}
                      </div>
                      <p className="text-gray-500 text-xs">{note.category}</p>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{note.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Clock className="w-3 h-3 text-gray-300" />
                        <span className="text-gray-300 text-xs">{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </button>
              )})
            )}
          </div>
          )}

          {/* Add Note Button */}
          <div className="p-3 border-t border-gray-100">
            <button className="w-full flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm py-2.5 rounded-xl hover:bg-green-100 transition-colors">
              <Plus className="w-4 h-4" /> Add New Note
            </button>
          </div>
        </div>

        {/* Right Panel - Note Detail */}
        <div className={`${activeNote ? "flex" : "hidden lg:flex"} flex-1 flex-col overflow-hidden bg-gray-50`}>
          {activeNote ? (
            <>
              <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200 flex-shrink-0">
                <button
                  onClick={() => setActiveNote(null)}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  ←
                </button>
                <div className={`w-10 h-10 rounded-xl ${['bg-sky-500', 'bg-emerald-600', 'bg-orange-500'][Math.abs(activeNote.title?.charCodeAt(0) || 0) % 3]} flex items-center justify-center flex-shrink-0`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800 font-semibold">{activeNote.title}</h3>
                  <p className="text-gray-500 text-xs">{activeNote.category}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Star className={`w-4 h-4 ${activeNote.metadata?.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="max-w-2xl mx-auto">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeNote.tags?.map((tag: string) => (
                      <span key={tag} className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" /> {new Date(activeNote.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <p className="text-gray-700 leading-relaxed text-sm">{activeNote.description}</p>
                    {activeNote.fileUrl && (
                      <a
                        href={`/uploads/${activeNote.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" /> View attachment
                      </a>
                    )}
                  </div>

                  {/* Related Topics */}
                  <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <p className="text-gray-500 text-xs font-semibold mb-2 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> Related Notes
                    </p>
                    <div className="space-y-1.5">
                      {notesData.filter(n => n._id !== activeNote._id && n.category === activeNote.category).slice(0, 3).map(n => {
                        const colorOptions = ['bg-sky-500', 'bg-emerald-600', 'bg-orange-500', 'bg-blue-500'];
                        const relatedColor = colorOptions[Math.abs(n.title?.charCodeAt(0) || 0) % colorOptions.length];
                        
                        return (
                        <button
                          key={n._id}
                          onClick={() => setActiveNote(n)}
                          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className={`w-6 h-6 rounded-md ${relatedColor} flex items-center justify-center flex-shrink-0`}>
                            <BookOpen className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-600 text-xs">{n.title}</span>
                        </button>
                      )})}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col gap-3 text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Select a note to read</p>
              <p className="text-gray-400 text-sm">Choose any note from the list to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
