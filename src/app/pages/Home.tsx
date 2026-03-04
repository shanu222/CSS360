import { Link } from "react-router";
import {
  Award, GraduationCap, Library, ClipboardList, Target,
  Brain, Calendar, Globe, Users, FileText, TrendingUp,
  BookOpen, Flame, CheckCircle, Clock, Star, ArrowRight,
  BarChart2
} from "lucide-react";
import { compulsorySubjects, studyPlanData, currentAffairsData } from "../data/mockData";

const quickCards = [
  { path: "/exam-process", label: "Exam Process", icon: Award, color: "bg-blue-500", desc: "CSS journey & timeline" },
  { path: "/subjects", label: "Subjects", icon: GraduationCap, color: "bg-green-500", desc: "Compulsory & optional" },
  { path: "/books", label: "Books", icon: Library, color: "bg-purple-500", desc: "Recommended readings" },
  { path: "/past-papers", label: "Past Papers", icon: ClipboardList, color: "bg-orange-500", desc: "2020–2024 papers" },
  { path: "/practice", label: "Practice", icon: Target, color: "bg-red-500", desc: "MCQ, Essay, Answers" },
  { path: "/ai-assistant", label: "AI Assistant", icon: Brain, color: "bg-teal-500", desc: "Smart study tools" },
  { path: "/study-planner", label: "Study Planner", icon: Calendar, color: "bg-yellow-500", desc: "Daily & weekly plans" },
  { path: "/current-affairs", label: "Current Affairs", icon: Globe, color: "bg-sky-500", desc: "Latest updates" },
  { path: "/notes", label: "Notes", icon: FileText, color: "bg-indigo-500", desc: "Topic-wise notes" },
  { path: "/community", label: "Community", icon: Users, color: "bg-pink-500", desc: "Discuss & share" },
];

const stats = [
  { label: "Study Streak", value: "14 days", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Topics Covered", value: "38 / 120", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "MCQs Solved", value: "512", icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Study Hours", value: "156 hrs", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
];

export default function Home() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const progressPercent = Math.round((studyPlanData.daysCompleted / studyPlanData.totalDays) * 100);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Hero Banner */}
      <div
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f3d2b] via-[#1a5c3e] to-[#0e4d34] p-6 lg:p-8 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,61,43,0.95) 0%, rgba(26,92,62,0.92) 50%, rgba(14,77,52,0.95) 100%), url(https://images.unsplash.com/photo-1758525861622-f4e7ac86a2d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-green-300 text-sm">{dateStr}</span>
            </div>
            <h2 className="text-2xl lg:text-3xl text-white mb-1">Welcome back, Ahmad! 👋</h2>
            <p className="text-green-200 text-sm lg:text-base max-w-xl">
              You're on day <span className="text-yellow-400 font-semibold">{studyPlanData.daysCompleted}</span> of your CSS preparation journey.
              Keep going — your dream civil service career is within reach!
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <p className="text-green-200 text-xs mb-1">Exam Countdown</p>
              <p className="text-white text-2xl font-bold">223</p>
              <p className="text-green-300 text-xs">Days to CSS 2026</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-green-300 mb-1.5">
            <span>Overall Preparation Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-green-300 text-xs mt-1">{studyPlanData.daysCompleted} of {studyPlanData.totalDays} days completed</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
              <p className="text-gray-800 font-bold text-base">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation */}
      <div>
        <h2 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-green-600" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-green-200 transition-all duration-200 group flex flex-col items-center text-center gap-2"
            >
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-800 text-sm font-medium">{card.label}</p>
                <p className="text-gray-400 text-xs">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Subject Progress */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-semibold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Compulsory Subject Progress
            </h3>
            <Link to="/subjects" className="text-green-600 text-xs flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {compulsorySubjects.map((subject) => (
              <div key={subject.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 flex items-center gap-1">
                    <span>{subject.icon}</span>
                    <span>{subject.name}</span>
                  </span>
                  <span className="text-gray-500">{subject.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Study Plan */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Today's Study Plan
            </h3>
            <Link to="/study-planner" className="text-green-600 text-xs flex items-center gap-1 hover:underline">
              Full Plan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {studyPlanData.weeklyPlan[0].tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg group">
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${i === 0 ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                  {i === 0 && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <p className={`text-sm ${i === 0 ? "line-through text-gray-400" : "text-gray-600"}`}>{task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Current Affairs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Latest Current Affairs
          </h3>
          <Link to="/current-affairs" className="text-green-600 text-xs flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentAffairsData.slice(0, 3).map((item) => (
            <div key={item.id} className="p-3 border border-gray-100 rounded-lg hover:border-green-200 hover:bg-green-50/30 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.category === "Pakistan" ? "bg-green-100 text-green-700" :
                  item.category === "Economy" ? "bg-blue-100 text-blue-700" :
                  item.category === "International" ? "bg-purple-100 text-purple-700" :
                  "bg-orange-100 text-orange-700"
                }`}>{item.category}</span>
                <span className="text-gray-400 text-xs">{item.date}</span>
              </div>
              <p className="text-gray-700 text-sm font-medium line-clamp-2">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
