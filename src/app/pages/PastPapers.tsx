import { useEffect, useMemo, useState } from "react";
import {
  Download,
  Eye,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Loader2,
  FolderOpen,
  Folder,
} from "lucide-react";
import { resourceService } from "../../services/resourceService";

type Paper = {
  _id: string;
  title: string;
  fileUrl: string;
  isSolved?: boolean;
};

type PaperIndex = Record<
  number,
  {
    compulsory: Record<string, Paper[]>;
    optional: Record<string, Paper[]>;
  }
>;

type IndexResponse = {
  index: PaperIndex;
  stats: {
    totalPapers: number;
    totalSolved: number;
    yearsAvailable: number[] | number;
  };
};

type SubjectDef = {
  key: string;
  label: string;
  keywords: string[];
};

const YEAR_START = 2016;
const YEAR_END = 2026;
const CSS_YEARS = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_END - i);

const COMPULSORY_SUBJECTS: SubjectDef[] = [
  { key: "essay", label: "Essay", keywords: ["essay"] },
  {
    key: "english_precis_and_composition",
    label: "English Precis & Composition",
    keywords: ["english precis", "english p&c", "english (p&c)", "precis", "composition"],
  },
  {
    key: "pakistan_affairs",
    label: "Pakistan Affairs",
    keywords: ["pakistan affairs", "pak affairs", "gk3"],
  },
  {
    key: "current_affairs",
    label: "Current Affairs",
    keywords: ["current affairs", "gk2"],
  },
  {
    key: "general_science_and_ability",
    label: "General Science & Ability",
    keywords: ["general science", "general ability", "gsa", "gk-i", "gk i", "gk1"],
  },
  {
    key: "islamic_studies",
    label: "Islamic Studies",
    keywords: ["islamic studies", "islamiat"],
  },
];

const OPTIONAL_SUBJECTS: SubjectDef[] = [
  { key: "accountancy_and_auditing", label: "Accountancy & Auditing", keywords: ["accountancy", "auditing"] },
  { key: "agriculture_and_forestry", label: "Agriculture & Forestry", keywords: ["agriculture", "forestry"] },
  { key: "anthropology", label: "Anthropology", keywords: ["anthropology"] },
  { key: "applied_mathematics", label: "Applied Mathematics", keywords: ["applied maths", "applied mathematics"] },
  { key: "arabic", label: "Arabic", keywords: ["arabic"] },
  { key: "balochi", label: "Balochi", keywords: ["balochi"] },
  { key: "botany", label: "Botany", keywords: ["botany"] },
  { key: "british_history", label: "British History", keywords: ["british history"] },
  { key: "business_administration", label: "Business Administration", keywords: ["business administration", "business admn"] },
  { key: "chemistry", label: "Chemistry", keywords: ["chemistry"] },
  { key: "comparative_study_of_major_religions", label: "Comparative Study of Major Religions", keywords: ["comparative", "major religions", "comparitive", "st. nm"] },
  { key: "computer_science", label: "Computer Science", keywords: ["computer science"] },
  { key: "constitutional_law", label: "Constitutional Law", keywords: ["constitutional law"] },
  { key: "criminology", label: "Criminology", keywords: ["criminology"] },
  { key: "economics", label: "Economics", keywords: ["economics"] },
  { key: "english_literature", label: "English Literature", keywords: ["english literature"] },
  { key: "environmental_science", label: "Environmental Science", keywords: ["environmental science", "environmental sc"] },
  { key: "european_history", label: "European History", keywords: ["european history"] },
  { key: "gender_studies", label: "Gender Studies", keywords: ["gender studies"] },
  { key: "geography", label: "Geography", keywords: ["geography"] },
  { key: "geology", label: "Geology", keywords: ["geology"] },
  { key: "governance_and_public_policies", label: "Governance & Public Policies", keywords: ["governance", "public policies", "p.p"] },
  { key: "history_of_pakistan_and_india", label: "History of Pakistan & India", keywords: ["history of pakistan", "pakistan & india", "pakistan and india", "pak india"] },
  { key: "history_of_usa", label: "History of USA", keywords: ["history of usa", "history of the usa", "usa"] },
  { key: "international_law", label: "International Law", keywords: ["international law"] },
  { key: "international_relations", label: "International Relations", keywords: ["international relations", "ir-"] },
  { key: "islamic_history_and_culture", label: "Islamic History & Culture", keywords: ["islamic history", "history and culture"] },
  { key: "journalism_and_mass_communication", label: "Journalism & Mass Communication", keywords: ["journalism", "mass communication", "mass com"] },
  { key: "law", label: "Law", keywords: [" law", "law"] },
  { key: "mercantile_law", label: "Mercantile Law", keywords: ["mercantile law"] },
  { key: "muslim_law_and_jurisprudence", label: "Muslim Law & Jurisprudence", keywords: ["muslim law", "jurisprudence"] },
  { key: "pashto", label: "Pashto", keywords: ["pashto", "pushto"] },
  { key: "persian", label: "Persian", keywords: ["persian"] },
  { key: "philosophy", label: "Philosophy", keywords: ["philosophy"] },
  { key: "physics", label: "Physics", keywords: ["physics"] },
  { key: "political_science", label: "Political Science", keywords: ["political science", "pol.science", "pol science"] },
  { key: "psychology", label: "Psychology", keywords: ["psychology"] },
  { key: "public_administration", label: "Public Administration", keywords: ["public administration", "public admn"] },
  { key: "punjabi", label: "Punjabi", keywords: ["punjabi"] },
  { key: "pure_mathematics", label: "Pure Mathematics", keywords: ["pure mathematics", "pure maths"] },
  { key: "sindhi", label: "Sindhi", keywords: ["sindhi"] },
  { key: "sociology", label: "Sociology", keywords: ["sociology"] },
  { key: "statistics", label: "Statistics", keywords: ["statistics"] },
  { key: "town_planning_and_urban_management", label: "Town Planning & Urban Management", keywords: ["town planning", "urban management", "urban mngt"] },
  { key: "urdu_literature", label: "Urdu Literature", keywords: ["urdu literature"] },
  { key: "zoology", label: "Zoology", keywords: ["zoology"] },
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

export default function PastPapers() {
  const [expandedYear, setExpandedYear] = useState<number | null>(2024);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "2024-compulsory": true,
    "2024-optional": false,
  });
  const [paperIndex, setPaperIndex] = useState<PaperIndex>({});
  const [stats, setStats] = useState({ totalPapers: 0, totalSolved: 0, yearsAvailable: [] as number[] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: IndexResponse = await resourceService.getPastPapersIndex();
      const safeIndex = data?.index || {};
      const safeStats = data?.stats || { totalPapers: 0, totalSolved: 0, yearsAvailable: [] as number[] };

      setPaperIndex(safeIndex);
      setStats({
        totalPapers: safeStats.totalPapers || 0,
        totalSolved: safeStats.totalSolved || 0,
        yearsAvailable: Array.isArray(safeStats.yearsAvailable)
          ? safeStats.yearsAvailable
          : [],
      });
    } catch (err) {
      console.error("Failed to load past papers:", err);
      setError("Failed to load past papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (year: number, category: "compulsory" | "optional") => {
    const key = `${year}-${category}`;
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleView = (paper: Paper) => {
    window.open(paper.fileUrl, "_blank");
  };

  const handleDownload = (paper: Paper) => {
    const link = document.createElement("a");
    link.href = paper.fileUrl;
    link.download = paper.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600">Loading past papers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-700">{error}</p>
          <button onClick={loadPapers} className="mt-3 text-red-600 hover:underline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-5 text-white">
        <h2 className="text-2xl text-white mb-1">Past Papers</h2>
        <p className="text-green-200 text-sm">Browse CSS past papers year-wise, then subject-wise</p>
        <div className="flex gap-6 mt-3">
          <div>
            <p className="text-xl text-yellow-400 font-bold">{CSS_YEARS.length}</p>
            <p className="text-green-300 text-xs">Years Covered (2016-2026)</p>
          </div>
          <div>
            <p className="text-xl text-yellow-400 font-bold">{stats.totalPapers}</p>
            <p className="text-green-300 text-xs">Available Papers</p>
          </div>
          <div>
            <p className="text-xl text-yellow-400 font-bold">{stats.totalSolved}</p>
            <p className="text-green-300 text-xs">Solved Papers</p>
          </div>
        </div>
      </div>

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

      <div className="space-y-3">
        {CSS_YEARS.map((year) => {
          const yearData = paperIndex[year] || { compulsory: {}, optional: {} };
          const yearPapers = [
            ...Object.values(yearData.compulsory).flat(),
            ...Object.values(yearData.optional).flat(),
          ];
          const solvedCount = yearPapers.filter((paper) => paper.isSolved).length;

          return (
            <div key={year} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0 ${
                    year >= 2024
                      ? "bg-gradient-to-br from-green-500 to-emerald-600"
                      : year >= 2020
                        ? "bg-gradient-to-br from-blue-500 to-blue-600"
                        : "bg-gradient-to-br from-orange-400 to-orange-600"
                  }`}
                >
                  {year}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 font-semibold">CSS {year} Papers</p>
                  <p className="text-gray-500 text-xs">
                    {yearPapers.length} available · {solvedCount} solved
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {solvedCount}/{yearPapers.length || 0} solved
                  </span>
                  {expandedYear === year ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedYear === year && (
                <div className="border-t border-gray-100 px-4 py-4 space-y-4">
                  {([
                    { key: "compulsory", label: "Compulsory Subjects", subjects: COMPULSORY_SUBJECTS },
                    { key: "optional", label: "Optional Subjects", subjects: OPTIONAL_SUBJECTS },
                  ] as const).map((section) => {
                    const sectionKey = `${year}-${section.key}`;
                    const isExpanded = !!expandedCategories[sectionKey];

                    return (
                      <div key={section.key} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleCategory(year, section.key)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <FolderOpen className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Folder className="w-4 h-4 text-gray-500" />
                            )}
                            <span className="text-sm font-semibold text-gray-800">{section.label}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="divide-y divide-gray-100">
                            {section.subjects.map((subject) => {
                              const subjectPapers = paperIndex[year][section.key][subject.key] || [];
                              return (
                                <div key={subject.key} className="px-4 py-3">
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">{subject.label}</p>
                                      <p className="text-xs text-gray-500">
                                        {subjectPapers.length > 0
                                          ? `${subjectPapers.length} file${subjectPapers.length > 1 ? "s" : ""} available`
                                          : "No paper uploaded yet"}
                                      </p>
                                    </div>
                                    {subjectPapers.length === 0 && (
                                      <div className="flex items-center gap-2">
                                        <button
                                          disabled
                                          className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-not-allowed"
                                        >
                                          <Eye className="w-3 h-3" /> View
                                        </button>
                                        <button
                                          disabled
                                          className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-not-allowed"
                                        >
                                          <Download className="w-3 h-3" /> Download
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {subjectPapers.length > 0 && (
                                    <div className="mt-2 space-y-2">
                                      {subjectPapers.map((paper) => (
                                        <div
                                          key={paper._id}
                                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-gray-50 border border-gray-100 rounded-lg p-2"
                                        >
                                          <div className="min-w-0">
                                            <p className="text-xs md:text-sm text-gray-700 font-medium truncate">{paper.title}</p>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            {paper.isSolved ? (
                                              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                <CheckCircle className="w-3 h-3" /> Solved
                                              </span>
                                            ) : (
                                              <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                                                <XCircle className="w-3 h-3" /> Unsolved
                                              </span>
                                            )}
                                            <button
                                              onClick={() => handleView(paper)}
                                              className="text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                                            >
                                              <Eye className="w-3 h-3" /> View
                                            </button>
                                            <button
                                              onClick={() => handleDownload(paper)}
                                              className="text-xs text-green-600 hover:text-green-700 bg-green-50 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                                            >
                                              <Download className="w-3 h-3" /> Download
                                            </button>
                                          </div>
                                        </div>
                                      ))}
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
          );
        })}
      </div>

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
