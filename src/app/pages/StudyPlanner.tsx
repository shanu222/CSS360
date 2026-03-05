import { useState } from "react";
import { studyPlanData } from "../data/mockData";
import { CheckCircle, Circle, Calendar, Clock, Target, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayColors = ["bg-gray-100", "bg-green-100", "bg-green-300", "bg-green-500", "bg-green-700"];

function generateCalendarData() {
  const data: (number | null)[] = [];
  for (let i = 0; i < 365; i++) {
    data.push(Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0);
  }
  return data;
}

const calendarData = generateCalendarData();

export default function StudyPlanner() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [tasks, setTasks] = useState<Record<string, boolean>>(
    Object.fromEntries(studyPlanData.weeklyPlan[0].tasks.map((t, i) => [t, i === 0]))
  );
  const [currentWeek, setCurrentWeek] = useState(0);

  const dayIndex = studyPlanData.weeklyPlan.findIndex(d => d.day === selectedDay);
  const dayPlan = studyPlanData.weeklyPlan[dayIndex] || studyPlanData.weeklyPlan[0];

  const progressPercent = Math.round((studyPlanData.daysCompleted / studyPlanData.totalDays) * 100);

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-4 sm:p-5 text-white">
        <h2 className="text-xl sm:text-2xl text-white mb-1">Study Planner</h2>
        <p className="text-green-200 text-xs sm:text-sm">Your personalized CSS schedule</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {[
            { label: "Target Year", value: "CSS 2026" },
            { label: "Days Done", value: `${studyPlanData.daysCompleted}/${studyPlanData.totalDays}` },
            { label: "Daily Goal", value: "6 hrs" },
            { label: "Progress", value: `${progressPercent}%` },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-xl p-2 sm:p-3">
              <p className="text-green-300 text-xs">{item.label}</p>
              <p className="text-white font-semibold text-xs sm:text-sm mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 sm:p-4">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span className="text-green-600 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Day {studyPlanData.daysCompleted}</span>
          <span>Day {studyPlanData.totalDays}</span>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 sm:p-4 lg:p-5">
        <h3 className="text-gray-700 font-semibold text-sm sm:text-base mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
          Study Activity (Past Year)
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-0.5 sm:gap-1 min-w-max">
            {months.map((month, mi) => (
              <div key={month} className="flex flex-col gap-0.5 sm:gap-1">
                <p className="text-gray-400 text-xs mb-0.5 text-center">{month}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 4 }).map((_, wi) => (
                    <div key={wi} className="flex flex-col gap-0.5">
                      {Array.from({ length: 7 }).map((_, di) => {
                        const dayIdx = mi * 28 + wi * 7 + di;
                        const intensity = calendarData[dayIdx] ?? 0;
                        return (
                          <div
                            key={di}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${dayColors[intensity]} transition-colors`}
                            title={`${intensity > 0 ? `${intensity}h study` : "No study"}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 text-xs">
            <span className="text-gray-400">Less</span>
            {dayColors.map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${c} border border-gray-200`} />
            ))}
            <span className="text-gray-400">More</span>
          </div>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {/* Day Selector */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 sm:p-4">
          <h3 className="text-gray-700 font-semibold text-sm mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
            Schedule
          </h3>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setCurrentWeek(w => Math.max(0, w - 1))}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-xs text-gray-500">Week {currentWeek + 1}</span>
            <button
              onClick={() => setCurrentWeek(w => w + 1)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="space-y-1">
            {studyPlanData.weeklyPlan.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`w-full flex items-center gap-2 p-2 rounded-xl text-xs sm:text-sm transition-all active:opacity-70 ${
                  selectedDay === day.day
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  selectedDay === day.day ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  {day.day.slice(0, 3)}
                </div>
                <div className="text-left min-w-0">
                  <p className="font-medium truncate">{day.day}</p>
                  <p className={`text-xs ${selectedDay === day.day ? "text-green-200" : "text-gray-400"}`}>
                    {day.tasks.length} tasks
                  </p>
                </div>
                {day.day === "Monday" && (
                  <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                    selectedDay === day.day ? "bg-white/20 text-white" : "bg-green-100 text-green-600"
                  }`}>Today</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Day Tasks */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-3 sm:p-4 lg:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
            <h3 className="text-gray-700 font-semibold text-sm flex items-center gap-2 min-w-0">
              <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="truncate">{dayPlan.day}'s Plan</span>
            </h3>
            <button className="flex items-center gap-1 text-green-600 text-xs bg-green-50 border border-green-200 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-green-100 active:opacity-70 transition-colors whitespace-nowrap flex-shrink-0">
              <Plus className="w-3 h-3" /> <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {dayPlan.tasks.map((task, i) => (
              <div
                key={task}
                onClick={() => setTasks(prev => ({ ...prev, [task]: !prev[task] }))}
                className={`flex items-start gap-2.5 sm:gap-3 p-2 sm:p-3 rounded-xl border cursor-pointer transition-all active:opacity-70 ${
                  tasks[task]
                    ? "border-green-200 bg-green-50"
                    : "border-gray-100 hover:border-green-200 hover:bg-gray-50"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {tasks[task] ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  ) : (
                    <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm ${tasks[task] ? "line-through text-gray-400" : "text-gray-700"}`}>{task}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                    i % 3 === 0 ? "bg-blue-100 text-blue-600" :
                    i % 3 === 1 ? "bg-orange-100 text-orange-600" :
                    "bg-purple-100 text-purple-600"
                  }`}>
                    {i % 3 === 0 ? "Study" : i % 3 === 1 ? "Practice" : "Revision"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-3 p-2.5 sm:p-3 bg-gray-50 rounded-xl">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{Object.values(tasks).filter(Boolean).length} / {dayPlan.tasks.length}</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${(Object.values(tasks).filter(Boolean).length / dayPlan.tasks.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Allocation */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 sm:p-4 lg:p-5">
        <h3 className="text-gray-700 font-semibold text-sm mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
          Weekly Subjects
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {[
            { subject: "Pakistan Affairs", hours: 10, color: "bg-emerald-500" },
            { subject: "Int'l Relations", hours: 8, color: "bg-blue-500" },
            { subject: "Essay", hours: 6, color: "bg-purple-500" },
            { subject: "Current Affairs", hours: 5, color: "bg-orange-500" },
            { subject: "Science", hours: 4, color: "bg-green-500" },
            { subject: "Islamic St.", hours: 4, color: "bg-teal-500" },
            { subject: "Precis", hours: 4, color: "bg-indigo-500" },
            { subject: "Revision", hours: 3, color: "bg-red-500" },
          ].map((item) => (
            <div key={item.subject} className="bg-gray-50 rounded-xl p-2.5 sm:p-3 border border-gray-100">
              <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${item.color} mb-1.5`} />
              <p className="text-gray-700 text-xs sm:text-sm font-medium">{item.subject}</p>
              <p className="text-gray-500 text-xs">{item.hours} hrs/wk</p>
              <div className="mt-1 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.hours / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
