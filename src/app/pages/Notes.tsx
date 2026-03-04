import { useState } from "react";
import { Search, Plus, Star, BookOpen, FileText, Tag, Clock, ChevronRight } from "lucide-react";

const notesData = [
  {
    id: 1, subject: "International Relations", topic: "Realism Theory",
    content: "Realism holds that states are the primary actors in IR, driven by self-interest and power. Key thinkers: Thucydides, Morgenthau, Waltz. Core concepts: balance of power, national interest, security dilemma, anarchy of international system.",
    tags: ["IR", "Theory"], starred: true, lastEdited: "2 hours ago", color: "bg-sky-500",
  },
  {
    id: 2, subject: "Pakistan Affairs", topic: "Constitutional Development",
    content: "Pakistan has had 3 constitutions (1956, 1962, 1973). Current 1973 Constitution: Federal parliamentary system, 270 National Assembly seats, Bicameral legislature, Role of Islam, Fundamental rights (Article 8-28), Emergency provisions.",
    tags: ["Pakistan", "Constitution"], starred: false, lastEdited: "Yesterday", color: "bg-emerald-600",
  },
  {
    id: 3, subject: "Current Affairs", topic: "CPEC Overview",
    content: "CPEC is a $62bn initiative connecting Xinjiang (China) to Gwadar (Pakistan). Phase I: Energy & infrastructure. Phase II: Industrial cooperation, Agriculture, IT. Key projects: Motorways, Power plants, Gwadar port, SEZs.",
    tags: ["CPEC", "China"], starred: true, lastEdited: "3 days ago", color: "bg-orange-500",
  },
  {
    id: 4, subject: "International Relations", topic: "UN System",
    content: "UN founded 1945 with 51 members (now 193). Main organs: General Assembly (all members, 1 vote), Security Council (5 P5 + 10 non-permanent, VETO power), ICJ, Secretariat, ECOSOC. Budget 2024: ~$3.2 billion.",
    tags: ["UN", "International"], starred: false, lastEdited: "1 week ago", color: "bg-blue-500",
  },
  {
    id: 5, subject: "English Essay", topic: "Essay Structure",
    content: "CSS Essay: 2000 words. Structure: Hook → Thesis → Body (PEEL: Point, Evidence, Explanation, Link) → Counter-argument & rebuttal → Conclusion. Key: Academic tone, diverse vocabulary, balanced arguments, strong conclusion.",
    tags: ["Essay", "Writing"], starred: true, lastEdited: "4 days ago", color: "bg-purple-500",
  },
  {
    id: 6, subject: "Pakistan Affairs", topic: "Pakistan Movement",
    content: "Key events: Simla Deputation (1906) → Khilafat Movement (1919) → Nehru Report (1928) → Allahabad Address (1930) → Lahore Resolution (1940) → Cabinet Mission Plan (1946) → Independence (Aug 14, 1947). Key figures: Jinnah, Iqbal, Liaquat Ali Khan.",
    tags: ["History", "Pakistan"], starred: false, lastEdited: "5 days ago", color: "bg-green-600",
  },
  {
    id: 7, subject: "Islamic Studies", topic: "Pillars of Islam",
    content: "Five Pillars: 1) Shahadah (Declaration of faith) 2) Salat (5 daily prayers) 3) Zakat (2.5% on savings annually) 4) Sawm (Ramadan fasting) 5) Hajj (pilgrimage once in lifetime for able). Foundation of Islamic practice.",
    tags: ["Islam", "Basics"], starred: false, lastEdited: "1 week ago", color: "bg-teal-500",
  },
];

export default function Notes() {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [activeNote, setActiveNote] = useState<typeof notesData[0] | null>(null);
  const [showStarred, setShowStarred] = useState(false);

  const subjects = ["All", ...Array.from(new Set(notesData.map(n => n.subject)))];

  const filtered = notesData.filter(note => {
    const matchSearch = note.topic.toLowerCase().includes(search.toLowerCase()) ||
      note.subject.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    const matchSub = filterSubject === "All" || note.subject === filterSubject;
    const matchStar = !showStarred || note.starred;
    return matchSearch && matchSub && matchStar;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-5 bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl text-white font-semibold">Notes</h2>
            <p className="text-green-200 text-xs">Topic-wise notes for all CSS subjects</p>
          </div>
          <button className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-2 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> New Note
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Notes List */}
        <div className={`${activeNote ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-200 bg-white`}>
          {/* Search & Filters */}
          <div className="p-3 border-b border-gray-100 space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              <button
                onClick={() => setShowStarred(!showStarred)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  showStarred ? "bg-yellow-100 text-yellow-700 border border-yellow-300" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Star className="w-3 h-3" fill={showStarred ? "currentColor" : "none"} /> Starred
              </button>
              {subjects.map(sub => (
                <button
                  key={sub}
                  onClick={() => setFilterSubject(sub)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap flex-shrink-0 transition-all ${
                    filterSubject === sub ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {sub === "All" ? "All" : sub.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No notes found</p>
              </div>
            ) : (
              filtered.map((note) => (
                <button
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className={`w-full text-left p-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    activeNote?.id === note.id ? "bg-green-50 border-l-4 border-l-green-500" : ""
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${note.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-800 text-sm font-medium truncate">{note.topic}</p>
                        {note.starred && <Star className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 ml-1" fill="currentColor" />}
                      </div>
                      <p className="text-gray-500 text-xs">{note.subject}</p>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{note.content}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Clock className="w-3 h-3 text-gray-300" />
                        <span className="text-gray-300 text-xs">{note.lastEdited}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

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
                <div className={`w-10 h-10 rounded-xl ${activeNote.color} flex items-center justify-center flex-shrink-0`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800 font-semibold">{activeNote.topic}</h3>
                  <p className="text-gray-500 text-xs">{activeNote.subject}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Star className={`w-4 h-4 ${activeNote.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="max-w-2xl mx-auto">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeNote.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" /> {activeNote.lastEdited}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <p className="text-gray-700 leading-relaxed text-sm">{activeNote.content}</p>
                  </div>

                  {/* Related Topics */}
                  <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <p className="text-gray-500 text-xs font-semibold mb-2 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> Related Notes
                    </p>
                    <div className="space-y-1.5">
                      {notesData.filter(n => n.id !== activeNote.id && n.subject === activeNote.subject).slice(0, 3).map(n => (
                        <button
                          key={n.id}
                          onClick={() => setActiveNote(n)}
                          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className={`w-6 h-6 rounded-md ${n.color} flex items-center justify-center flex-shrink-0`}>
                            <BookOpen className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-600 text-xs">{n.topic}</span>
                        </button>
                      ))}
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
