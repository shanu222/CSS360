import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { compulsorySubjects, optionalGroups, subjectBooksHierarchy } from "../data/mockData";
import { ChevronLeft, BookOpen, FileText, ClipboardList, Target, Brain, Download, Star, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { noteService } from "../../services/noteService";

const allSubjects = [
  ...compulsorySubjects,
  ...optionalGroups.flatMap(g => g.subjects.map(s => ({ ...s, topics: s.topics || [], description: s.description || `${s.name} — CSS Optional Subject`, marks: s.marks, progress: s.progress, syllabus: (s as any).syllabus }))),
];

const subjectNotesMap: Record<string, { topic: string; content: string }[]> = {
  "pakistan-affairs": [
    { topic: "Pakistan Movement", content: "The Pakistan Movement was a political movement in the 1940s that aimed to create an independent Muslim state. Key leaders included Muhammad Ali Jinnah, Allama Iqbal, and Liaquat Ali Khan. The Lahore Resolution (1940) called for independent Muslim states in the northwest and northeast of British India..." },
    { topic: "Constitutional Development", content: "Pakistan has had three constitutions: 1956, 1962, and 1973. The current 1973 Constitution established a federal parliamentary system. Key amendments include the 8th (1985) and 18th (2010) amendments. The constitution defines fundamental rights, the federal structure, and the role of Islam..." },
    { topic: "Foreign Policy", content: "Pakistan's foreign policy is shaped by its geographic location, the Kashmir dispute, relations with India, the US alliance, China partnership (CPEC), and its role in the Islamic world. Key pillars: strategic autonomy, economic diplomacy, anti-terrorism cooperation..." },
    { topic: "Economic Issues", content: "Pakistan faces challenges including fiscal deficit, current account deficit, low tax-to-GDP ratio, energy crisis, and high debt. Solutions include expanding the tax base, improving exports, CPEC economic zones, agricultural reforms, and IT sector development..." },
  ],
  "international-relations": [
    { topic: "Realism", content: "Realism holds that states are the primary actors in international relations, driven by self-interest and the pursuit of power. Key thinkers: Thucydides, Machiavelli, Hans Morgenthau, Kenneth Waltz (Neo-realism). Core concepts: balance of power, national interest, security dilemma..." },
    { topic: "Liberalism", content: "Liberalism argues that states can cooperate through institutions, interdependence, and shared norms. Kant's Perpetual Peace, Woodrow Wilson's 14 Points, Liberal institutionalism (Keohane & Nye). Democratic Peace Theory: democracies rarely go to war with each other..." },
    { topic: "Constructivism", content: "Constructivism emphasizes the role of ideas, norms, and identities in shaping state behavior. Key thinker: Alexander Wendt ('Anarchy is what states make of it'). Identity and norms shape national interests. Social structures matter as much as material ones..." },
    { topic: "UN System", content: "The United Nations was founded in 1945 with 51 original members. Main organs: General Assembly, Security Council (5 permanent members with veto), Secretariat, ICJ, ECOSOC, Trusteeship Council. Specialized agencies: WHO, UNESCO, UNICEF, IMF, World Bank..." },
  ],
  "english-essay": [
    { topic: "Essay Structure", content: "A CSS essay should have: Introduction (hook + thesis + roadmap), Body paragraphs (argument + evidence + analysis), Counter-argument + Rebuttal, Conclusion (summary + broader implications). Word limit: approximately 2000 words. Logical flow is essential..." },
    { topic: "Argumentative Technique", content: "Use the PEEL structure: Point, Evidence, Explanation, Link. Support arguments with statistics, historical examples, expert quotes, and case studies. Avoid emotional language; maintain academic tone throughout. Balance perspectives..." },
    { topic: "Vocabulary Building", content: "CSS essays require sophisticated vocabulary. Key areas: academic connectives (however, consequently, nevertheless), analytical terms (implies, suggests, indicates), evaluative language (significant, crucial, problematic)..." },
  ],
};

const defaultNotes = [
  { topic: "Introduction & Overview", content: "This subject covers fundamental concepts and theories relevant to the CSS examination. Candidates should focus on understanding key principles, historical context, and contemporary applications..." },
  { topic: "Key Concepts", content: "Important definitions, theories, and frameworks are covered in this section. Understanding these concepts is crucial for writing well-structured answers in the CSS examination..." },
  { topic: "Pakistan Context", content: "Relate all topics to Pakistan's specific situation. Examiners appreciate when candidates connect theoretical knowledge with Pakistani examples, case studies, and current developments..." },
];

const subjectBooksMap: Record<string, { title: string; author: string; note: string }[]> = {
  "pakistan-affairs": [
    { title: "Pakistan Affairs", author: "Ikram Rabbani", note: "Must-read for compulsory Pakistan Affairs" },
    { title: "The Idea of Pakistan", author: "Stephen Cohen", note: "International perspective on Pakistan" },
    { title: "Pakistan: A Hard Country", author: "Anatol Lieven", note: "Comprehensive political analysis" },
  ],
  "international-relations": [
    { title: "Introduction to International Relations", author: "Joshua Goldstein & Jon Pevehouse", note: "Best textbook for IR theory" },
    { title: "The Clash of Civilizations", author: "Samuel Huntington", note: "Influential theory on civilizational conflicts" },
    { title: "Understanding International Relations", author: "Chris Brown", note: "Clear theoretical explanations" },
  ],
  "english-essay": [
    { title: "CSS Essay", author: "Masood Bhatti", note: "Model essays for practice" },
    { title: "The Economist Style Guide", author: "The Economist", note: "Improve writing style and clarity" },
  ],
};

const defaultBooks = [
  { title: "Recommended Textbook", author: "Standard Author", note: "Core text for this subject" },
  { title: "Reference Book", author: "Expert Author", note: "Supplementary reading" },
];

export default function SubjectDetail() {
  const { subjectId } = useParams();
  const [tab, setTab] = useState("notes");
  const [myNotes, setMyNotes] = useState<any[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>({});

  const subject = allSubjects.find(s => s.id === subjectId);
  const notes = (subjectId && subjectNotesMap[subjectId]) || defaultNotes;
  const books = (subjectId && subjectBooksMap[subjectId]) || defaultBooks;

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    if (!subjectId) return;

    noteService.getNotes({ subjectId }).then((items) => {
      setMyNotes(Array.isArray(items) ? items : []);
    }).catch(() => {
      setMyNotes([]);
    });
  }, [subjectId]);

  if (!subject) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Subject not found.</p>
        <Link to="/subjects" className="text-green-600 hover:underline mt-2 inline-block">Back to Subjects</Link>
      </div>
    );
  }

  const tabs = [
    { id: "notes", label: "Notes", icon: FileText },
    { id: "syllabus", label: "Syllabus", icon: BookOpen },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "past-papers", label: "Past Papers", icon: ClipboardList },
    { id: "practice", label: "Practice", icon: Target },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Back + Header */}
      <div>
        <Link to="/subjects" className="inline-flex items-center gap-1 text-green-600 text-sm hover:underline mb-3">
          <ChevronLeft className="w-4 h-4" /> Back to Subjects
        </Link>
        <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-5 text-white">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl ${subject.color || "bg-green-500"} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
              {(subject as any).icon || "📚"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-1">{subject.name}</h2>
              <p className="text-green-200 text-sm mb-2">{subject.description}</p>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{subject.marks} marks</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Progress: {subject.progress}%</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-green-300 mb-1">
              <span>Your Progress</span>
              <span>{subject.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full" style={{ width: `${subject.progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-gray-100 rounded-xl p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              tab === id ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "notes" && (
        <div className="space-y-4">
          {notes.map((note, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-50 bg-gray-50">
                <div className="w-8 h-8 rounded-lg bg-green-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-gray-700 font-semibold">{note.topic}</h4>
                <button className="ml-auto text-gray-400 hover:text-green-600 transition-colors">
                  <Star className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm leading-relaxed">{note.content}</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">CSS Relevant</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Concept</span>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
            <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 text-sm font-medium">Need more notes on a specific topic?</p>
            <p className="text-green-600 text-xs mt-1">Use the AI Assistant to generate detailed notes instantly</p>
            <Link to="/ai-assistant" className="mt-3 inline-block bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Generate AI Notes
            </Link>
          </div>

          {myNotes.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
              <h4 className="text-gray-800 font-semibold mb-3">My Notes Organized Here</h4>
              <div className="space-y-3">
                {myNotes.map((note) => {
                  const placement = (note.placements || []).find((p: any) => p.subjectId === subjectId);
                  return (
                    <div key={note.id} className="rounded-lg border border-gray-200 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-gray-800">{note.title}</p>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          {placement?.topic || 'General'}
                        </span>
                      </div>
                      {note.content && <p className="text-xs text-gray-600 mt-1 line-clamp-3">{note.content}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "syllabus" && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
          <h3 className="text-gray-700 font-semibold mb-4">Official Syllabus</h3>
          
          {/* Check if detailed syllabus exists */}
          {(subject as any).syllabus ? (
            <div className="space-y-3">
              {(subject as any).syllabus.map((item: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Section Header - Clickable */}
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-semibold">{item.section}</h4>
                        <span className="text-xs text-indigo-600 font-medium">{item.marks} Marks</span>
                      </div>
                    </div>
                    {expandedSections[index] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {/* Subsections - Expandable */}
                  {expandedSections[index] && (
                    <div className="p-4 bg-white border-t border-gray-100">
                      <ul className="space-y-2">
                        {item.subsections.map((subsection: string, subIndex: number) => (
                          <li key={subIndex} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                            <span>{subsection}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                <p className="text-indigo-800 text-xs">
                  💡 <strong>Tip:</strong> Click on each section to expand and see detailed requirements. Total marks: {subject.marks}
                </p>
              </div>
            </div>
          ) : (
            /* Fallback to simple topics list */
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {((subject as any).topics?.length > 0 ? (subject as any).topics : [
                  "Introduction & Scope", "Historical Background", "Theoretical Frameworks",
                  "Contemporary Issues", "Pakistan Perspective", "International Comparisons",
                  "Policy Implications", "Case Studies",
                ]).map((topic: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-gray-700 text-sm">{topic}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-xs">
                  📌 <strong>FPSC Note:</strong> Always refer to the official FPSC syllabus document for the most up-to-date topic list. This is a representative summary.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "books" && (
        <div className="space-y-3">
          {/* Check if subject has hierarchical books */}
          {subjectId && subjectBooksHierarchy[subjectId] && subjectBooksHierarchy[subjectId].isHierarchical ? (
            // Hierarchical Books Structure
            <div className="space-y-4">
              {subjectBooksHierarchy[subjectId].categories.map((category: any, catIndex: number) => (
                <div key={catIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() => setExpandedCategories(prev => ({
                      ...prev,
                      [`cat-${catIndex}`]: !prev[`cat-${catIndex}`]
                    }))}
                    className={`w-full flex items-center justify-between p-4 ${category.color} hover:opacity-90 transition-opacity text-left`}
                  >
                    <div className="flex items-center gap-3 text-white font-semibold">
                      <BookOpen className="w-5 h-5" />
                      <span>{category.name}</span>
                    </div>
                    {expandedCategories[`cat-${catIndex}`] ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Papers inside Category */}
                  {expandedCategories[`cat-${catIndex}`] && (
                    <div className="bg-white p-4 space-y-4 border-t border-gray-200">
                      {category.papers.map((paper: any, paperIndex: number) => (
                        <div key={paperIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                          {/* Paper Header */}
                          <button
                            onClick={() => setExpandedPapers(prev => ({
                              ...prev,
                              [`paper-${catIndex}-${paperIndex}`]: !prev[`paper-${catIndex}-${paperIndex}`]
                            }))}
                            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                          >
                            <span className="font-semibold text-gray-800">{paper.paperName}</span>
                            {expandedPapers[`paper-${catIndex}-${paperIndex}`] ? (
                              <ChevronUp className="w-4 h-4 text-gray-600" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-600" />
                            )}
                          </button>

                          {/* Books List */}
                          {expandedPapers[`paper-${catIndex}-${paperIndex}`] && (
                            <div className="p-3 bg-white space-y-2 border-t border-gray-100">
                              {paper.books.map((book: any, bookIndex: number) => (
                                <div key={bookIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                                  <div className="flex items-start gap-3 flex-1">
                                    <BookOpen className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">{book.name}</p>
                                      {book.author && <p className="text-xs text-gray-500">by {book.author}</p>}
                                    </div>
                                  </div>
                                  <div className="flex gap-2 flex-shrink-0">
                                    <button
                                      disabled={!book.pdfUrl}
                                      className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                                        book.pdfUrl
                                          ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                                          : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      }`}
                                      title={!book.pdfUrl ? "PDF will be available after upload" : "View PDF in browser"}
                                    >
                                      <Eye className="w-3 h-3" /> View
                                    </button>
                                    <button
                                      disabled={!book.downloadUrl}
                                      className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                                        book.downloadUrl
                                          ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                          : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      }`}
                                      title={!book.downloadUrl ? "Download will be available after upload" : "Download PDF"}
                                    >
                                      <Download className="w-3 h-3" /> Download
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Flat Books Structure (default)
            <>
              {books.map((book, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex items-start gap-4">
                  <div className="w-12 h-16 rounded-lg bg-gradient-to-b from-green-500 to-green-700 flex items-center justify-center flex-shrink-0 shadow">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold">{book.title}</h4>
                    <p className="text-gray-500 text-sm">by {book.author}</p>
                    <p className="text-gray-600 text-xs mt-1 italic">"{book.note}"</p>
                  </div>
                  <button className="flex items-center gap-1 text-green-600 text-xs hover:text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex-shrink-0">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              ))}
              <Link to="/books" className="block text-center text-green-600 text-sm hover:underline mt-2">
                View All Books in Library →
              </Link>
            </>
          )}
        </div>
      )}

      {tab === "past-papers" && (
        <div className="space-y-3">
          {[2024, 2023, 2022, 2021, 2020].map((year) => (
            <div key={year} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow">
                {year}
              </div>
              <div className="flex-1">
                <h4 className="text-gray-800 font-medium">{subject.name} — CSS {year}</h4>
                <p className="text-gray-500 text-xs">Annual CSS Examination Paper</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                  View
                </button>
                <button className="text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 flex items-center gap-1 transition-colors">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "practice" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🎯", title: "MCQ Practice", desc: "Topic-wise multiple choice questions", color: "bg-blue-500", link: "/practice" },
            { icon: "✍️", title: "Answer Writing", desc: "Write and get AI feedback on your answers", color: "bg-green-500", link: "/practice" },
            { icon: "🧠", title: "AI Questions", desc: "Generate custom CSS-style questions", color: "bg-purple-500", link: "/ai-assistant" },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-green-200 transition-all text-center group"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform shadow-md`}>
                {item.icon}
              </div>
              <h4 className="text-gray-800 font-semibold mb-1">{item.title}</h4>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
