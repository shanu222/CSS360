import { useState } from "react";
import { Link } from "react-router";
import { compulsorySubjects, optionalGroups } from "../data/mockData";
import { ChevronRight, BookOpen, CheckCircle, Lock } from "lucide-react";

export default function Subjects() {
  const [tab, setTab] = useState<"compulsory" | "optional">("compulsory");

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
              <strong>📌 Rule:</strong> <span className="hidden sm:inline">You must choose 6 optional papers from different groups. Max 2 from any single group. Each is 200 marks.</span>
              <span className="sm:hidden">Pick 6 papers from different groups (max 2 per group).</span>
            </p>
          </div>

          {optionalGroups.map((group) => (
            <div key={group.group} className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm">
              <h3 className="text-gray-700 font-semibold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-green-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">G{group.group}</span>
                <span>Group {group.group}</span>
                <span className="text-gray-400 text-xs font-normal hidden sm:inline">— Max 2 from group</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {group.subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    to={`/subjects/${subject.id}`}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all active:opacity-70 group cursor-pointer"
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${subject.color} flex items-center justify-center text-lg sm:text-xl shadow flex-shrink-0`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-xs sm:text-sm font-medium group-hover:text-green-700 truncate">{subject.name}</p>
                      <p className="text-gray-400 text-xs">{subject.marks}M</p>
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
