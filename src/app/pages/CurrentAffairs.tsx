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
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div
        className="relative rounded-2xl overflow-hidden p-6 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,61,43,0.95) 0%, rgba(10,40,28,0.95) 100%), url(https://images.unsplash.com/photo-1722684768315-11fc753354f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Newspaper className="w-6 h-6 text-green-300" />
          <h2 className="text-2xl text-white">Current Affairs Hub</h2>
        </div>
        <p className="text-green-200 text-sm">Stay updated with CSS-relevant news and analysis</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Updated Daily</span>
          </div>
          <div className="bg-white/10 rounded-lg px-3 py-1.5 text-xs">{extendedAffairs.length} Articles</div>
          <div className="bg-white/10 rounded-lg px-3 py-1.5 text-xs">March 2026 Edition</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search current affairs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-600 placeholder:text-gray-400 bg-transparent"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              activeCategory === cat
                ? "bg-green-600 text-white shadow"
                : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
            }`}
          >
            {cat === "All" ? "🌐" : cat === "Pakistan" ? "🇵🇰" : cat === "Economy" ? "📊" : cat === "Environment" ? "🌿" : cat === "Security" ? "🛡️" : "🌍"} {cat}
          </button>
        ))}
      </div>

      {/* Relevance Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center gap-3">
        <TrendingUp className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <p className="text-yellow-800 text-sm">
          <strong>CSS Relevance:</strong> Articles marked "High" are frequently asked in CSS papers. Focus on understanding the issue, Pakistan's stance, and potential solutions.
        </p>
      </div>

      {/* Articles */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                      {item.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.cssRelevance === "High" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      CSS: {item.cssRelevance}
                    </span>
                    <span className="text-gray-400 text-xs">{item.date}</span>
                  </div>
                  <h4 className="text-gray-800 font-semibold text-sm">{item.title}</h4>
                  <p className={`text-gray-500 text-xs mt-1 ${expanded !== item.id ? "line-clamp-2" : ""}`}>
                    {item.summary}
                  </p>
                </div>
                <ArrowRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-transform ${expanded === item.id ? "rotate-90" : ""}`} />
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    <Tag className="w-2.5 h-2.5" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {expanded === item.id && (
              <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-500 text-xs font-semibold mb-2 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> CSS Analysis
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.summary}</p>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    This issue is directly relevant to CSS preparation as it connects multiple subjects including Current Affairs, Pakistan Affairs, and International Relations. Candidates should understand the background, current developments, key stakeholders, and Pakistan's official position.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                    <BookmarkPlus className="w-3 h-3" /> Bookmark
                  </button>
                  <button className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                    📝 Add to Notes
                  </button>
                  <button className="flex items-center gap-1.5 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors">
                    🤖 AI Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
