import { useState } from "react";
import { Link } from "react-router";
import { compulsorySubjects, optionalGroups } from "../data/mockData";
import { ChevronRight, BookOpen, CheckCircle, ChevronDown } from "lucide-react";

export default function Subjects() {
  const [tab, setTab] = useState<"compulsory" | "optional">("compulsory");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggle = (setter: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void, key: string) => {
    setter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getPapers = (subject: any) => {
    const buckets = new Map<string, any[]>();
    (subject.syllabus || []).forEach((section: any, idx: number) => {
      const matched = section.section.match(/^(Paper\s+[IVX]+)\s*[\-–:]\s*(.*)$/i);
      const paperName = matched ? matched[1].replace(/^PAPER/i, "Paper") : "Subject Outline";
      const cleanedSection = matched ? matched[2] : section.section;
      if (!buckets.has(paperName)) buckets.set(paperName, []);
      buckets.get(paperName)!.push({ ...section, section: cleanedSection, originalIndex: idx });
    });

    return Array.from(buckets.entries()).map(([name, sections]) => ({ name, sections }));
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-4 sm:p-5 text-white">
        <h2 className="text-xl sm:text-2xl text-white mb-1">Subjects</h2>
        <p className="text-green-200 text-xs sm:text-sm">CSS: 12 papers — 6 compulsory + 6 optional</p>
        <div className="flex gap-3 sm:gap-6 mt-3 flex-wrap">
          <div><p className="text-lg sm:text-xl text-yellow-400 font-bold">600</p><p className="text-green-300 text-xs">Compulsory</p></div>
          <div><p className="text-lg sm:text-xl text-yellow-400 font-bold">600</p><p className="text-green-300 text-xs">Optional</p></div>
          <div><p className="text-lg sm:text-xl text-yellow-400 font-bold">6</p><p className="text-green-300 text-xs">Papers</p></div>
          <div><p className="text-lg sm:text-xl text-yellow-400 font-bold">7</p><p className="text-green-300 text-xs">Groups</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 sm:gap-2 bg-gray-100 rounded-xl p-1 w-fit">
        {(["compulsory", "optional"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all capitalize ${
              tab === t ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "compulsory" ? "📌 Compulsory" : "📚 Optional"}
          </button>
        ))}
      </div>

      {tab === "compulsory" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {compulsorySubjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/subjects/${subject.id}`}
              className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 lg:p-5 hover:shadow-md hover:border-green-200 transition-all active:bg-green-50 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${subject.color} flex items-center justify-center text-lg sm:text-2xl shadow-md flex-shrink-0`}>
                  {subject.icon}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">{subject.marks}M</span>
              </div>
              <h3 className="text-gray-800 font-semibold text-xs sm:text-base mb-1 group-hover:text-green-700 transition-colors line-clamp-2">{subject.name}</h3>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">{subject.description}</p>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="w-full h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>

              {/* Topics */}
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
                {subject.topics.slice(0, 2).map((topic) => (
                  <span key={topic} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{topic}</span>
                ))}
                {subject.topics.length > 2 && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">+{subject.topics.length - 2}</span>
                )}
              </div>

              <div className="mt-2 sm:mt-3 flex items-center justify-between">
                <div className="flex gap-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Notes</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> MCQs</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === "optional" && (
        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-2.5 sm:p-3 lg:p-4">
            <p className="text-yellow-800 text-xs sm:text-sm leading-relaxed">
              <strong>📌 Navigation:</strong> Expand by <strong>Group → Subject/Paper → Section → Subsection</strong> to explore the full syllabus hierarchy.
            </p>
          </div>

          {optionalGroups.map((group) => (
            <div key={group.group} className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm">
              <button
                onClick={() => toggle(setExpandedGroups, String(group.group))}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-green-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                    G{group.group}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-gray-700 font-semibold text-sm sm:text-base">{group.name || `Group ${group.group}`}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">{group.selectionCriteria || "Optional subjects"}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedGroups[group.group] ? "rotate-180" : ""}`} />
              </button>

              {expandedGroups[group.group] && (
                <div className="mt-3 space-y-2">
                  {group.subjects.map((subject) => {
                    const subjectKey = `${group.group}:${subject.id}`;
                    const papers = getPapers(subject);
                    return (
                      <div key={subject.id} className="border border-gray-100 rounded-xl bg-gray-50">
                        <button
                          onClick={() => toggle(setExpandedSubjects, subjectKey)}
                          className="w-full p-3 flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-8 h-8 rounded-lg ${subject.color} flex items-center justify-center text-base shadow flex-shrink-0`}>
                              {subject.icon}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{subject.name}</p>
                              <p className="text-xs text-gray-500">{subject.marks} marks</p>
                            </div>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSubjects[subjectKey] ? "rotate-180" : ""}`} />
                        </button>

                        {expandedSubjects[subjectKey] && (
                          <div className="px-3 pb-3 space-y-2">
                            {papers.map((paper) => {
                              const paperKey = `${subjectKey}:${paper.name}`;
                              return (
                                <div key={paper.name} className="bg-white border border-gray-100 rounded-lg">
                                  <button
                                    onClick={() => toggle(setExpandedPapers, paperKey)}
                                    className="w-full p-2.5 flex items-center justify-between text-left"
                                  >
                                    <p className="text-xs sm:text-sm font-medium text-gray-700">{paper.name}</p>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedPapers[paperKey] ? "rotate-180" : ""}`} />
                                  </button>

                                  {expandedPapers[paperKey] && (
                                    <div className="px-2.5 pb-2.5 space-y-1.5">
                                      {paper.sections.map((section: any, idx: number) => {
                                        const sectionKey = `${paperKey}:${idx}`;
                                        return (
                                          <div key={sectionKey} className="border border-gray-100 rounded-md">
                                            <button
                                              onClick={() => toggle(setExpandedSections, sectionKey)}
                                              className="w-full p-2 flex items-center justify-between text-left"
                                            >
                                              <div className="min-w-0">
                                                <p className="text-xs sm:text-sm text-gray-700 truncate">{section.section}</p>
                                                <p className="text-[11px] text-gray-500">{section.marks} marks</p>
                                              </div>
                                              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${expandedSections[sectionKey] ? "rotate-180" : ""}`} />
                                            </button>

                                            {expandedSections[sectionKey] && (
                                              <ul className="px-4 pb-2.5 list-disc space-y-1 text-xs text-gray-600">
                                                {section.subsections.map((sub: string) => (
                                                  <li key={sub}>{sub}</li>
                                                ))}
                                              </ul>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
