import { useState } from "react";
import { pastPapers } from "../data/mockData";
import { Download, Eye, CheckCircle, XCircle, ChevronDown, ChevronRight, FileText } from "lucide-react";

export default function PastPapers() {
  const [expandedYear, setExpandedYear] = useState<number | null>(2024);

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-5 text-white">
        <h2 className="text-2xl text-white mb-1">Past Papers</h2>
        <p className="text-green-200 text-sm">CSS examination papers from 2020 to 2024 with suggested answers</p>
        <div className="flex gap-6 mt-3">
          <div><p className="text-xl text-yellow-400 font-bold">5</p><p className="text-green-300 text-xs">Years Available</p></div>
          <div><p className="text-xl text-yellow-400 font-bold">40+</p><p className="text-green-300 text-xs">Paper Sets</p></div>
          <div><p className="text-xl text-yellow-400 font-bold">24</p><p className="text-green-300 text-xs">Solved Papers</p></div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Solved/Answers Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <XCircle className="w-4 h-4 text-gray-300" />
          <span>Unsolved</span>
        </div>
      </div>

      {/* Papers by Year */}
      <div className="space-y-3">
        {pastPapers.map(({ year, subjects }) => (
          <div key={year} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {/* Year Header */}
            <button
              onClick={() => setExpandedYear(expandedYear === year ? null : year)}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0 ${
                year === 2024 ? "bg-gradient-to-br from-green-500 to-emerald-600" :
                year === 2023 ? "bg-gradient-to-br from-blue-500 to-blue-600" :
                "bg-gradient-to-br from-orange-400 to-orange-600"
              }`}>
                {year}
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-800 font-semibold">CSS {year} Papers</p>
                <p className="text-gray-500 text-xs">
                  {subjects.length} subjects available · {subjects.filter(s => s.solved).length} solved
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {subjects.filter(s => s.solved).length}/{subjects.length} solved
                </span>
                {expandedYear === year ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
              </div>
            </button>

            {/* Subjects */}
            {expandedYear === year && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {subjects.map((subject, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="flex-1 text-gray-700 text-sm">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      {subject.solved ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Solved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" /> Unsolved
                        </span>
                      )}
                      <button className="text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors">
                        <Eye className="w-3 h-3" /> View
                      </button>
                      <button className="text-xs text-green-600 hover:text-green-700 bg-green-50 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </div>
                  </div>
                ))}

                {/* Download All Button */}
                <div className="px-4 py-3 bg-gray-50">
                  <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-sm py-2.5 rounded-xl hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Download All CSS {year} Papers
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Answer Writing CTA */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white text-xl flex-shrink-0">
            🧠
          </div>
          <div>
            <h3 className="text-purple-900 font-semibold">Practice with AI Answer Checker</h3>
            <p className="text-purple-700 text-sm mt-1">
              Pick any past paper question, write your answer, and get instant AI feedback on structure, arguments, grammar, and CSS scoring criteria.
            </p>
            <button className="mt-3 bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Start Answer Writing Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
