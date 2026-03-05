import { useState } from "react";
import { communityThreads } from "../data/mockData";
import { MessageSquare, Eye, Heart, Search, Plus, TrendingUp, Users, Award, Filter } from "lucide-react";

const categories = ["All", "Essay Writing", "Study Strategy", "Pakistan Affairs", "International Relations", "Current Affairs", "Subject Queries"];

const topUsers = [
  { name: "Sara Malik", avatar: "SM", posts: 89, reputation: 2341, badge: "🏆" },
  { name: "Hassan Ali", avatar: "HA", posts: 45, reputation: 1234, badge: "🥈" },
  { name: "Ahmad Raza", avatar: "AR", posts: 38, reputation: 987, badge: "🥉" },
  { name: "Fatima Khan", avatar: "FK", posts: 32, reputation: 756, badge: "⭐" },
];

export default function Community() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedThreads, setLikedThreads] = useState<Set<number>>(new Set());

  const filtered = communityThreads.filter(thread => {
    const matchCat = activeCategory === "All" || thread.subject === activeCategory;
    const matchSearch = thread.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleLike = (id: number) => {
    setLikedThreads(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-4 sm:p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-6 h-6 text-green-300 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl text-white">Community</h2>
        </div>
        <p className="text-green-200 text-xs sm:text-sm mb-3">Connect with CSS aspirants, share strategies, and get help</p>
        <div className="flex gap-3 sm:gap-5 flex-wrap">
          <div>
            <p className="text-lg sm:text-xl text-yellow-400 font-bold">2.4K</p>
            <p className="text-green-300 text-xs">Members</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl text-yellow-400 font-bold">156</p>
            <p className="text-green-300 text-xs">Discussions</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl text-yellow-400 font-bold">48</p>
            <p className="text-green-300 text-xs">Online Now</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search + New Thread */}
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 shadow-sm">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-600 placeholder:text-gray-400 bg-transparent min-w-0"
              />
            </div>
            <button className="flex items-center gap-1.5 bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-xl hover:bg-green-700 active:bg-green-800 transition-colors whitespace-nowrap flex-shrink-0 touch-highlight">
              <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1\">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1.5" />
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs whitespace-nowrap flex-shrink-0 transition-all active:opacity-80 ${
                  activeCategory === cat
                    ? "bg-green-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                {cat.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Threads */}
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400">No discussions found</p>
            </div>
          ) : (
            filtered.map((thread) => (
              <div
                key={thread.id}
                className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-green-200 transition-all p-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {thread.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-gray-800 font-medium text-sm hover:text-green-700 transition-colors line-clamp-2">
                        {thread.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-gray-600 text-xs font-medium">{thread.author}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{thread.subject}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-xs">{thread.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {thread.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                  <button
                    onClick={e => { e.stopPropagation(); toggleLike(thread.id); }}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      likedThreads.has(thread.id) ? "text-red-500" : "text-gray-400 hover:text-red-400"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedThreads.has(thread.id) ? "fill-current" : ""}`} />
                    {thread.likes + (likedThreads.has(thread.id) ? 1 : 0)}
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {thread.replies} replies
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Eye className="w-3.5 h-3.5" />
                    {thread.views} views
                  </div>
                  <button className="ml-auto text-xs text-green-600 hover:underline font-medium">
                    Read Thread →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Top Contributors */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
            <h3 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Top Contributors
            </h3>
            <div className="space-y-3">
              {topUsers.map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm font-medium">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.posts} posts · {user.reputation} pts</p>
                  </div>
                  <span className="text-lg">{user.badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
            <h3 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Trending Topics
            </h3>
            <div className="space-y-2">
              {["CSS 2026 Date Announced?", "Best IR books for CSS?", "Answer Writing Tips", "Current Affairs March 2026", "Mock Test Schedule"].map((topic, i) => (
                <button key={i} className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-gray-600 text-xs">{topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Community Rules */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="text-green-800 font-semibold mb-2 text-sm">📋 Community Rules</h3>
            <ul className="space-y-1.5">
              {["Be respectful to all members", "Share verified information only", "No spam or irrelevant posts", "Credit sources when quoting"].map((rule, i) => (
                <li key={i} className="text-green-700 text-xs flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span> {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
