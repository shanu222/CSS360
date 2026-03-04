import { examProcess } from "../data/mockData";
import { CheckCircle, AlertCircle, Info, ChevronRight } from "lucide-react";

const examStructure = [
  { category: "Compulsory Subjects", papers: 6, marks: 600, details: "English Essay, English Precis, General Science, Current Affairs, Pakistan Affairs, Islamic Studies" },
  { category: "Optional Subjects", papers: 6, marks: 600, details: "Choose 6 papers from optional groups. 100 or 200 marks each." },
  { category: "Viva Voce", papers: 1, marks: 300, details: "Central Selection Board interview" },
  { category: "Total", papers: 13, marks: 1200, details: "Combined written + viva score" },
];

const eligibility = [
  { label: "Age Limit", value: "21–30 years (relaxation for certain categories)", icon: "🎂" },
  { label: "Education", value: "Bachelor's Degree (minimum 2nd division) from recognized university", icon: "🎓" },
  { label: "Nationality", value: "Pakistani citizen only", icon: "🇵🇰" },
  { label: "Max Attempts", value: "3 attempts for CSS written examination", icon: "🔁" },
  { label: "Domicile", value: "Must have domicile of a province/region", icon: "📍" },
];

const allocationOrder = [
  { group: "District Management Group (DMG)", color: "bg-green-500" },
  { group: "Pakistan Foreign Service (PFS)", color: "bg-blue-500" },
  { group: "Police Service of Pakistan (PSP)", color: "bg-red-500" },
  { group: "Pakistan Customs Service", color: "bg-orange-500" },
  { group: "Inland Revenue Service (IRS)", color: "bg-purple-500" },
  { group: "Pakistan Audit & Accounts Service", color: "bg-teal-500" },
  { group: "Commerce & Trade Group", color: "bg-yellow-500" },
  { group: "Information Group", color: "bg-pink-500" },
];

export default function ExamProcess() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-6 text-white">
        <h2 className="text-2xl text-white mb-1">CSS Exam Process</h2>
        <p className="text-green-200 text-sm">Complete guide to the CSS examination process from eligibility to allocation</p>
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl text-yellow-400 font-bold">1200</p>
            <p className="text-green-300 text-xs">Total Marks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-yellow-400 font-bold">8</p>
            <p className="text-green-300 text-xs">Process Steps</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-yellow-400 font-bold">3</p>
            <p className="text-green-300 text-xs">Max Attempts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-yellow-400 font-bold">45%</p>
            <p className="text-green-300 text-xs">Passing Score</p>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-gray-700 font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Eligibility Criteria
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {eligibility.map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-gray-500 text-xs">{item.label}</p>
                <p className="text-gray-800 text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Journey Timeline */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-gray-700 font-semibold mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-green-600" />
          CSS Examination Journey
        </h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-gray-200 hidden sm:block" />
          <div className="space-y-5">
            {examProcess.map((step, i) => (
              <div key={step.step} className="flex gap-4 sm:gap-6 relative">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-xl flex-shrink-0 shadow-md z-10 relative`}>
                  {step.icon}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400 font-medium">STEP {step.step}</span>
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                  </div>
                  <h4 className="text-gray-800 font-semibold">{step.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Structure */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-gray-700 font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-green-600" />
          Examination Structure & Marks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-gray-500 font-medium rounded-l-lg">Category</th>
                <th className="text-center p-3 text-gray-500 font-medium">Papers</th>
                <th className="text-center p-3 text-gray-500 font-medium">Marks</th>
                <th className="text-left p-3 text-gray-500 font-medium rounded-r-lg">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {examStructure.map((row, i) => (
                <tr key={i} className={`${i === examStructure.length - 1 ? "bg-green-50 font-semibold" : "hover:bg-gray-50"} transition-colors`}>
                  <td className="p-3 text-gray-700">{row.category}</td>
                  <td className="p-3 text-center text-gray-600">{row.papers}</td>
                  <td className={`p-3 text-center font-bold ${i === examStructure.length - 1 ? "text-green-700" : "text-gray-700"}`}>{row.marks}</td>
                  <td className="p-3 text-gray-500 text-xs">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Groups */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-gray-700 font-semibold mb-4">🏆 Civil Service Groups (Allocation Order)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {allocationOrder.map((service, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className={`w-2 h-10 ${service.color} rounded-full flex-shrink-0`} />
              <div>
                <p className="text-gray-400 text-xs">#{i + 1}</p>
                <p className="text-gray-700 text-sm">{service.group}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preparation Strategy */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
        <h3 className="text-green-800 font-semibold mb-3">💡 Preparation Strategy Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Start preparation at least 1 year before the exam",
            "Focus on compulsory subjects first — they form the base",
            "Read Dawn newspaper daily for current affairs",
            "Practice answer writing from Day 1 — structure matters most",
            "Solve past papers from 2018 onwards for each subject",
            "Join a reputable CSS academy or study group in your city",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-green-100">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
