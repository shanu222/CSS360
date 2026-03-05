import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import {
  Home, BookOpen, GraduationCap, FileText, ChevronLeft,
  ChevronRight, Brain, Calendar, Globe, Users, Newspaper,
  Menu, X, Star, Zap, Target, Award, Search, Bell, User,
  ClipboardList, Library
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/exam-process", label: "Exam Process", icon: Award },
  { path: "/subjects", label: "Subjects", icon: GraduationCap },
  { path: "/notes", label: "Notes", icon: FileText },
  { path: "/books", label: "Books Library", icon: Library },
  { path: "/past-papers", label: "Past Papers", icon: ClipboardList },
  { path: "/practice", label: "Practice", icon: Target },
  { path: "/ai-assistant", label: "AI Assistant", icon: Brain },
  { path: "/study-planner", label: "Study Planner", icon: Calendar },
  { path: "/current-affairs", label: "Current Affairs", icon: Globe },
  { path: "/community", label: "Community", icon: Users },
];

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find(item =>
    item.path === location.pathname || (item.path !== "/" && location.pathname.startsWith(item.path))
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 flex flex-col bg-[#0f3d2b] text-white h-screen lg:h-full
          transition-all duration-300 ease-in-out flex-shrink-0
          ${collapsed ? "w-[68px]" : "w-64 sm:w-72"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 sm:px-4 py-5 border-b border-white/10 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Star className="w-5 h-5 text-white" fill="white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-white leading-tight text-sm sm:text-[15px]">CSS360 ACADEMY</p>
              <p className="text-green-300 text-xs">Pakistan Civil Service</p>
            </div>
          )}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden p-1 text-white/70 hover:text-white active:bg-white/20 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 sm:py-4 px-1.5 sm:px-2 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-lg transition-all duration-150 group relative active:bg-white/20 touch-highlight
                ${isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-300 rounded-r-full" />
                  )}
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`} />
                  {!collapsed && (
                    <span className="text-xs sm:text-sm truncate">{label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse button (desktop) */}
        <div className="hidden lg:flex p-3 border-t border-white/10 flex-shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all w-full touch-highlight"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>

        {/* User profile bottom */}
        {!collapsed && (
          <div className="p-3 border-t border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/10 active:bg-white/20 cursor-pointer transition-all touch-highlight">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                AR
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">Ahmad Raza</p>
                <p className="text-xs text-green-300 truncate">CSS 2026 Aspirant</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between gap-2 sm:gap-4 bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded active:bg-gray-200 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-gray-800 font-semibold text-base sm:text-lg leading-tight truncate">
              {currentPage?.label || "Dashboard"}
            </h1>
            <p className="text-gray-400 text-xs hidden sm:block">CSS Preparation Academy</p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                className="bg-transparent text-sm text-gray-600 outline-none w-40 lg:w-52 placeholder:text-gray-400"
              />
            </div>

            {/* Mobile Search */}
            <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors">
              <Search className="w-5 h-5 text-gray-500" />
            </button>

            {/* Notifications */}
            <button className="relative p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Progress Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2 sm:px-3 py-1.5">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-xs font-medium whitespace-nowrap">Day 142</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
