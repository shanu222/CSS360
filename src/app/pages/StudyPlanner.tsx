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
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-5 text-white">
        <h2 className="text-2xl text-white mb-1">Study Planner</h2>
        <p className="text-green-200 text-sm">Your personalized CSS preparation schedule</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: "Attempt Year", value: "CSS 2026" },
            { label: "Days Completed", value: `${studyPlanData.daysCompleted} / ${studyPlanData.totalDays}` },
            { label: "Daily Target", value: "6 hrs / day" },
            { label: "Overall Progress", value: `${progressPercent}%` },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-xl p-3">
              <p className="text-green-300 text-xs">{item.label}</p>
              <p className="text-white font-semibold mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Preparation Progress</span>
          <span className="text-green-600 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
          <span>Day {studyPlanData.daysCompleted}</span>
          <span>Day {studyPlanData.totalDays}</span>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
        <h3 className="text-gray-700 font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Study Activity (Past Year)
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {months.map((month, mi) => (
              <div key={month} className="flex flex-col gap-1">
                <p className="text-gray-400 text-xs mb-1 text-center">{month}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 4 }).map((_, wi) => (
                    <div key={wi} className="flex flex-col gap-0.5">
                      {Array.from({ length: 7 }).map((_, di) => {
                        const dayIdx = mi * 28 + wi * 7 + di;
                        const intensity = calendarData[dayIdx] ?? 0;
                        return (
                          <div
                            key={di}
                            className={`w-3 h-3 rounded-sm ${dayColors[intensity]} transition-colors`}
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
          <div className="flex items-center gap-2 mt-3">
            <span className="text-gray-400 text-xs">Less</span>
            {dayColors.map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c} border border-gray-200`} />
            ))}
            <span className="text-gray-400 text-xs">More</span>
          </div>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Day Selector */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
          <h3 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            Week Schedule
          </h3>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setCurrentWeek(w => Math.max(0, w - 1))}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-xs text-gray-500">Week {currentWeek + 1}</span>
            <button
              onClick={() => setCurrentWeek(w => w + 1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="space-y-1.5">
            {studyPlanData.weeklyPlan.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-sm transition-all ${
                  selectedDay === day.day
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  selectedDay === day.day ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  {day.day.slice(0, 3)}
                </div>
                <div className="text-left">
                  <p className="font-medium">{day.day}</p>
                  <p className={`text-xs ${selectedDay === day.day ? "text-green-200" : "text-gray-400"}`}>
                    {day.tasks.length} tasks
                  </p>
                </div>
                {day.day === "Monday" && (
                  <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                    selectedDay === day.day ? "bg-white/20 text-white" : "bg-green-100 text-green-600"
                  }`}>Today</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Day Tasks */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              {dayPlan.day}'s Study Plan
            </h3>
            <button className="flex items-center gap-1 text-green-600 text-xs bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
              <Plus className="w-3 h-3" /> Add Task
            </button>
          </div>

          <div className="space-y-2.5">
            {dayPlan.tasks.map((task, i) => (
              <div
                key={task}
                onClick={() => setTasks(prev => ({ ...prev, [task]: !prev[task] }))}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  tasks[task]
                    ? "border-green-200 bg-green-50"
                    : "border-gray-100 hover:border-green-200 hover:bg-gray-50"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {tasks[task] ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${tasks[task] ? "line-through text-gray-400" : "text-gray-700"}`}>{task}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
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
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Today's Progress</span>
              <span>{Object.values(tasks).filter(Boolean).length} / {dayPlan.tasks.length} tasks</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${(Object.values(tasks).filter(Boolean).length / dayPlan.tasks.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Allocation */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
        <h3 className="text-gray-700 font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          Weekly Subject Allocation
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { subject: "Pakistan Affairs", hours: 10, color: "bg-emerald-500" },
            { subject: "Int'l Relations", hours: 8, color: "bg-blue-500" },
            { subject: "English Essay", hours: 6, color: "bg-purple-500" },
            { subject: "Current Affairs", hours: 5, color: "bg-orange-500" },
            { subject: "General Science", hours: 4, color: "bg-green-500" },
            { subject: "Islamic Studies", hours: 4, color: "bg-teal-500" },
            { subject: "English Precis", hours: 4, color: "bg-indigo-500" },
            { subject: "Revision", hours: 3, color: "bg-red-500" },
          ].map((item) => (
            <div key={item.subject} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className={`w-3 h-3 rounded-full ${item.color} mb-2`} />
              <p className="text-gray-700 text-xs font-medium">{item.subject}</p>
              <p className="text-gray-500 text-xs">{item.hours} hrs/week</p>
              <div className="mt-1.5 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.hours / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
