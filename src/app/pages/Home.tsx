import { Link } from "react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Award, GraduationCap, Library, ClipboardList, Target,
  Brain, Calendar, Globe, Users, FileText, TrendingUp,
  BookOpen, Flame, CheckCircle, Clock, Star, ArrowRight,
  BarChart2
} from "lucide-react";
import { compulsorySubjects, studyPlanData, currentAffairsData } from "../data/mockData";
import { useAuth } from "../../contexts/AuthContext";
import { contentService } from "../../services/contentService";
import { getSocket } from "../../services/socketService";

interface PublishedContent {
  _id: string;
  title: string;
  type: 'announcement' | 'resource' | 'update' | 'notice';
  body: string;
  tags: string[];
}

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
  const { user, isAuthenticated, login, register } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [liveContent, setLiveContent] = useState<PublishedContent[]>([]);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const progressPercent = Math.round((studyPlanData.daysCompleted / studyPlanData.totalDays) * 100);

  const handleAuthSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (isLoginMode) {
        await login(authEmail, authPassword);
      } else {
        await register(authEmail, authPassword, authName);
      }

      setAuthEmail('');
      setAuthPassword('');
      setAuthName('');
    } catch (error: any) {
      setAuthError(error?.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await contentService.getPublishedContent();
        setLiveContent(data);
      } catch (_error) {
        setLiveContent([]);
      }
    };

    void loadContent();

    const socket = getSocket();
    const refresh = () => {
      void loadContent();
    };

    socket.on('admin:content-created', refresh);
    socket.on('admin:content-updated', refresh);
    socket.on('admin:content-deleted', refresh);

    return () => {
      socket.off('admin:content-created', refresh);
      socket.off('admin:content-updated', refresh);
      socket.off('admin:content-deleted', refresh);
    };
  }, []);

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-5 sm:space-y-6 overflow-y-auto">
      {!isAuthenticated && (
        <div className="rounded-2xl border border-emerald-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-900">Login or Signup</h2>
            <p className="text-sm text-gray-600">Use your credentials to access personalized features on any device.</p>
          </div>

          {authError && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{authError}</div>
          )}

          <form onSubmit={handleAuthSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {!isLoginMode && (
              <input
                type="text"
                value={authName}
                onChange={(event) => setAuthName(event.target.value)}
                placeholder="Full name"
                required
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
            )}
            <input
              type="email"
              value={authEmail}
              onChange={(event) => setAuthEmail(event.target.value)}
              placeholder="Email"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
            <input
              type="password"
              value={authPassword}
              onChange={(event) => setAuthPassword(event.target.value)}
              placeholder="Password"
              minLength={6}
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              disabled={authLoading}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {authLoading ? 'Please wait...' : isLoginMode ? 'Login' : 'Signup'}
            </button>
          </form>

          <div className="mt-3 flex items-center justify-between text-sm">
            <button
              type="button"
              className="text-emerald-700 hover:underline"
              onClick={() => {
                setIsLoginMode((prev) => !prev);
                setAuthError('');
              }}
            >
              {isLoginMode ? 'Need an account? Signup' : 'Already have an account? Login'}
            </button>
            <Link to="/admin/login" className="text-slate-700 hover:underline">Admin login</Link>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f3d2b] via-[#1a5c3e] to-[#0e4d34] p-4 sm:p-6 lg:p-8 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,61,43,0.95) 0%, rgba(26,92,62,0.92) 50%, rgba(14,77,52,0.95) 100%), url(https://images.unsplash.com/photo-1758525861622-f4e7ac86a2d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" />
              <span className="text-green-300 text-xs sm:text-sm truncate">{dateStr}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-white mb-1 leading-tight">Welcome back, {user?.name || 'Aspirant'}! 👋</h2>
            <p className="text-green-200 text-xs sm:text-sm lg:text-base max-w-xl">
              You're on day <span className="text-yellow-400 font-semibold">{studyPlanData.daysCompleted}</span> of your CSS preparation journey.
              Keep going — your dream civil service career is within reach!
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-center lg:items-end gap-2 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <p className="text-green-200 text-xs mb-1">Exam Countdown</p>
              <p className="text-white text-xl sm:text-2xl font-bold">223</p>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm flex items-center gap-2 sm:gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs">{stat.label}</p>
              <p className="text-gray-800 font-bold text-sm sm:text-base truncate">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation */}
      <div>
        <h2 className="text-gray-700 font-semibold mb-3 text-sm sm:text-base flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {quickCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 hover:shadow-md hover:border-green-200 transition-all duration-200 group flex flex-col items-center text-center gap-2 active:bg-gray-50"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${card.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0`}>
                <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-800 text-xs sm:text-sm font-medium">{card.label}</p>
                <p className="text-gray-400 text-xs line-clamp-1">{card.desc}</p>
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

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-semibold">Live Admin Updates</h3>
          <span className="text-xs text-gray-500">Real-time</span>
        </div>
        <div className="space-y-3">
          {liveContent.slice(0, 5).map((item) => (
            <div key={item._id} className="rounded-lg border border-gray-100 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 uppercase">{item.type}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.body}</p>
            </div>
          ))}
          {liveContent.length === 0 && (
            <p className="text-sm text-gray-500">No live updates published yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
