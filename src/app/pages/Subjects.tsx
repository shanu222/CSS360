import { useState } from "react";
import { Link } from "react-router";
import { compulsorySubjects, optionalGroups } from "../data/mockData";
import { ChevronRight, BookOpen, CheckCircle, Lock } from "lucide-react";

export default function Subjects() {
  const [tab, setTab] = useState<"compulsory" | "optional">("compulsory");

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-5 text-white">
        <h2 className="text-2xl text-white mb-1">Subjects</h2>
        <p className="text-green-200 text-sm">CSS exam covers 12 papers — 6 compulsory + 6 optional (chosen from groups)</p>
        <div className="flex gap-6 mt-3">
          <div><p className="text-xl text-yellow-400 font-bold">600</p><p className="text-green-300 text-xs">Compulsory Marks</p></div>
          <div><p className="text-xl text-yellow-400 font-bold">600</p><p className="text-green-300 text-xs">Optional Marks</p></div>
          <div><p className="text-xl text-yellow-400 font-bold">6</p><p className="text-green-300 text-xs">Compulsory Papers</p></div>
          <div><p className="text-xl text-yellow-400 font-bold">7</p><p className="text-green-300 text-xs">Optional Groups</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-xl p-1 w-fit">
        {(["compulsory", "optional"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "compulsory" ? "📌 Compulsory Subjects" : "📚 Optional Subjects"}
          </button>
        ))}
      </div>

      {tab === "compulsory" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {compulsorySubjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/subjects/${subject.id}`}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-green-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center text-2xl shadow-md`}>
                  {subject.icon}
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{subject.marks} marks</span>
              </div>
              <h3 className="text-gray-800 font-semibold text-base mb-1 group-hover:text-green-700 transition-colors">{subject.name}</h3>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">{subject.description}</p>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>

              {/* Topics */}
              <div className="mt-3 flex flex-wrap gap-1">
                {subject.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{topic}</span>
                ))}
                {subject.topics.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{subject.topics.length - 3} more</span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2 text-xs text-gray-400">
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
        <div className="space-y-5">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-sm">
              <strong>📌 Selection Rule:</strong> You must choose 6 optional papers from different groups. You can pick maximum 2 papers from any single group.
              Each optional paper is worth 200 marks.
            </p>
          </div>

          {optionalGroups.map((group) => (
            <div key={group.group} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="text-gray-700 font-semibold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-green-600 text-white text-xs flex items-center justify-center font-bold">G{group.group}</span>
                Group {group.group}
                <span className="text-gray-400 text-xs font-normal">— Pick max 2 from this group</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {group.subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    to={`/subjects/${subject.id}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all group cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-xl ${subject.color} flex items-center justify-center text-xl shadow flex-shrink-0`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-sm font-medium group-hover:text-green-700 truncate">{subject.name}</p>
                      <p className="text-gray-400 text-xs">{subject.marks} marks</p>
                      {subject.progress > 0 ? (
                        <div className="mt-1 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${subject.progress}%` }} />
                        </div>
                      ) : (
                        <p className="text-gray-300 text-xs flex items-center gap-1 mt-1">
                          <Lock className="w-2.5 h-2.5" /> Not started
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
