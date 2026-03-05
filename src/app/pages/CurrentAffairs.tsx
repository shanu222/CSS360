import { useState } from "react";
import { currentAffairsData } from "../data/mockData";
import { Globe, Search, Newspaper, TrendingUp, ArrowRight, BookmarkPlus, Tag } from "lucide-react";

const categories = ["All", "Pakistan", "International", "Economy", "Environment", "Security"];

const extendedAffairs = [
  ...currentAffairsData,
  {
    id: 7, category: "Security", title: "Afghanistan-Pakistan Border Tensions",
    summary: "The TTP threat from Afghan soil continues to strain Pakistan-Afghanistan relations, with Pakistan urging the Taliban government to take action against militant groups operating from its territory.",
    date: "March 2026", cssRelevance: "High", tags: ["Afghanistan", "Security", "TTP"],
  },
  {
    id: 8, category: "Economy", title: "Pakistan's IT Export Growth",
    summary: "Pakistan's IT sector has shown remarkable growth with exports crossing $3 billion annually. The government's Digital Pakistan initiative aims to quadruple IT exports by 2027.",
    date: "February 2026", cssRelevance: "Medium", tags: ["IT", "Economy", "Digital"],
  },
  {
    id: 9, category: "International", title: "Middle East Geopolitical Shifts",
    summary: "Normalization agreements between Arab states and Israel, Iran's nuclear program, and Saudi Arabia's Vision 2030 are reshaping Middle Eastern geopolitics with direct implications for Pakistan.",
    date: "January 2026", cssRelevance: "High", tags: ["Middle East", "Geopolitics", "Pakistan"],
  },
];

export default function CurrentAffairs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = extendedAffairs.filter(item => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categoryColors: Record<string, string> = {
    Pakistan: "bg-green-100 text-green-700",
    International: "bg-purple-100 text-purple-700",
    Economy: "bg-blue-100 text-blue-700",
    Environment: "bg-emerald-100 text-emerald-700",
    Security: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
      {/* Header */}
      <div
        className="relative rounded-2xl overflow-hidden p-4 sm:p-5 lg:p-6 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,61,43,0.95) 0%, rgba(10,40,28,0.95) 100%), url(https://images.unsplash.com/photo-1722684768315-11fc753354f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 flex-shrink-0" />
          <h2 className="text-lg sm:text-2xl text-white">Current Affairs</h2>
        </div>
        <p className="text-green-200 text-xs sm:text-sm mb-3">Stay updated with CSS-relevant news</p>
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 sm:px-3 py-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Updated Daily</span>
          </div>
          <div className="bg-white/10 rounded-lg px-2 sm:px-3 py-1 text-xs">{extendedAffairs.length} Articles</div>
          <div className="bg-white/10 rounded-lg px-2 sm:px-3 py-1 text-xs">March 2026</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm">
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 outline-none text-xs sm:text-sm text-gray-600 placeholder:text-gray-400 bg-transparent min-w-0"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              activeCategory === cat
                ? "bg-green-600 text-white shadow active:bg-green-700"
                : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 active:opacity-70"
            }`}
          >
            {cat === "All" ? "🌐" : cat === "Pakistan" ? "🇵🇰" : cat === "Economy" ? "📊" : cat === "Environment" ? "🌿" : cat === "Security" ? "🛡️" : "🌍"} <span className="hidden sm:inline">{cat}</span>
          </button>
        ))}
      </div>

      {/* Relevance Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-2.5 sm:p-3 flex items-start gap-2 sm:gap-3">
        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-yellow-800 text-xs sm:text-sm leading-relaxed">
          <strong>CSS Relevance:</strong> <span className="hidden sm:inline">Articles marked "High" are frequently asked in CSS papers. Focus on understanding the issue, Pakistan's stance, and potential solutions.</span>
        </p>
      </div>

      {/* Articles */}
      <div className="space-y-2.5 sm:space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden active:bg-green-50"
          >
            <div
              className="p-3 sm:p-4 cursor-pointer"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                      {item.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                      item.cssRelevance === "High" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      CSS: {item.cssRelevance}
                    </span>
                    <span className="text-gray-400 text-xs hidden sm:inline">{item.date}</span>
                  </div>
                  <h4 className="text-gray-800 font-semibold text-xs sm:text-sm">{item.title}</h4>
                  <p className={`text-gray-500 text-xs mt-1 ${expanded !== item.id ? "line-clamp-2" : ""}`}>
                    {item.summary}
                  </p>
                </div>
                <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0 mt-0.5 sm:mt-1 transition-transform ${expanded === item.id ? "rotate-90" : ""}`} />
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="flex items-center gap-0.5 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                    <Tag className="w-2 h-2" /> <span className="hidden sm:inline">{tag}</span>
                  </span>
                ))}
                {item.tags.length > 2 && <span className="text-xs text-gray-400">+{item.tags.length - 2}</span>}
              </div>
            </div>

            {expanded === item.id && (
              <div className="border-t border-gray-100 p-3 sm:p-4 bg-gray-50 space-y-2.5 sm:space-y-3">
                <div className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 border border-gray-100">
                  <p className="text-gray-500 text-xs font-semibold mb-2 flex items-center gap-1">
                    <Globe className="w-3 h-3 flex-shrink-0" /> CSS Analysis
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{item.summary}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    This connects multiple CSS subjects including Current Affairs and International Relations. Understand the background, developments, stakeholders, and Pakistan's position.
                  </p>
                </div>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  <button className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-green-100 active:opacity-70 transition-colors whitespace-nowrap">
                    <BookmarkPlus className="w-3 h-3" /> <span className="hidden sm:inline">Bookmark</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-blue-100 active:opacity-70 transition-colors whitespace-nowrap">
                    📝 <span className="hidden sm:inline">Notes</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-purple-100 active:opacity-70 transition-colors whitespace-nowrap">
                    🤖 <span className="hidden sm:inline">AI</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
