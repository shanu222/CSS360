import { useState } from "react";
import { mcqBank, essayTopics } from "../data/mockData";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Target, PenTool, Edit3, Loader2 } from "lucide-react";
import { aiService } from "../../services/aiService";

type PracticeMode = "home" | "mcq" | "essay" | "answer" | "outline";

export default function Practice() {
  const [mode, setMode] = useState<PracticeMode>("home");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState<any>(null);
  const [essayOutline, setEssayOutline] = useState<string>("");
  const [aiEvaluation, setAiEvaluation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = mcqBank[currentQ];

  const handleGenerateOutline = async (essay: any) => {
    setSelectedEssay(essay);
    setMode("outline");
    setLoading(true);
    setError(null);
    
    try {
      const outline = await aiService.generateEssayOutline(essay.topic);
      setEssayOutline(outline);
    } catch (err: any) {
      console.error('Error generating outline:', err);
      setError(err.response?.data?.error || 'Failed to generate essay outline. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (answerText.trim().length < 50) return;
    
    setSubmitted(true);
    setLoading(true);
    setError(null);
    
    try {
      const analysis = await aiService.analyzeEssay(
        answerText,
        "Discuss the constitutional development in Pakistan from 1947 to 1973. What were the major challenges faced during this period?"
      );
      setAiEvaluation(analysis);
    } catch (err: any) {
      console.error('Error evaluating answer:', err);
      setError(err.response?.data?.error || 'Failed to evaluate answer. Please try again.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.correct) setScore(s => s + 1);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQ < mcqBank.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const resetMCQ = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setFinished(false);
  };

  if (mode === "home") {
    return (
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
        <div className="bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] rounded-2xl p-4 sm:p-5 text-white">
          <h2 className="text-xl sm:text-2xl text-white mb-1">Practice Center</h2>
          <p className="text-green-200 text-xs sm:text-sm">Sharpen your CSS skills with MCQs, essays, and answer writing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              mode: "mcq" as const, icon: "🎯", title: "MCQ Bank",
              desc: "Practice multiple choice questions. Build speed and accuracy.",
              color: "from-blue-500 to-blue-600", stats: "512+ Questions",
            },
            {
              mode: "essay" as const, icon: "✍️", title: "Essay Lab",
              desc: "Explore essay topics with outlines and structure suggestions.",
              color: "from-green-500 to-emerald-600", stats: "50+ Topics",
            },
            {
              mode: "answer" as const, icon: "📝", title: "Answer Writing",
              desc: "Write CSS answers and get instant AI evaluation.",
              color: "from-purple-500 to-purple-600", stats: "AI Evaluation",
            },
          ].map((card) => (
            <button
              key={card.mode}
              onClick={() => setMode(card.mode)}
              className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 text-left hover:shadow-lg hover:border-green-200 transition-all active:bg-green-50 group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg sm:text-xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg flex-shrink-0`}>
                {card.icon}
              </div>
              <h3 className="text-gray-800 font-semibold text-sm sm:text-base mb-1">{card.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-2">{card.desc}</p>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-block">{card.stats}</span>
              <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm mt-2 font-medium">
                Start <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {[
            { label: "MCQs Attempted", value: "512", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Correct", value: "394", color: "text-green-600", bg: "bg-green-50" },
            { label: "Essays", value: "8", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Accuracy", value: "76.9%", color: "text-purple-600", bg: "bg-purple-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} border border-gray-100 rounded-xl p-2.5 sm:p-3 lg:p-4 text-center`}>
              <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-600 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "mcq") {
    return (
      <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 max-w-4xl mx-auto overflow-y-auto">
        <button onClick={() => { setMode("home"); resetMCQ(); }} className="text-green-600 text-xs sm:text-sm flex items-center gap-1 hover:underline active:opacity-70 transition-opacity">
          ← Back
        </button>

        {finished ? (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h3 className="text-gray-800 text-lg sm:text-xl font-semibold mb-2">Practice Complete!</h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-4">You scored <span className="text-green-600 font-bold text-base sm:text-lg">{score}</span> out of <span className="font-bold">{mcqBank.length}</span></p>
            <div className="w-full h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: `${(score / mcqBank.length) * 100}%` }} />
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mb-6">
              {score >= mcqBank.length * 0.8 ? "Excellent! 🎉" :
               score >= mcqBank.length * 0.6 ? "Good job! 👍" :
               "Keep practicing 📚"}
            </p>
            <button onClick={resetMCQ} className="flex items-center gap-2 bg-green-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl mx-auto hover:bg-green-700 active:bg-green-800 transition-colors text-xs sm:text-sm">
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" /> Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Progress */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50 space-y-2">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Q{currentQ + 1}/{mcqBank.length}</span>
                <span className="text-green-600 font-semibold">{score} ✓</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${((currentQ) / mcqBank.length) * 100}%` }} />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{question.subject}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{question.topic}</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 lg:p-5">
              <p className="text-gray-800 font-medium mb-4 sm:mb-5 text-sm sm:text-base">{question.question}</p>

              <div className="space-y-2.5">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={`w-full text-left p-3.5 rounded-xl border-2 text-sm transition-all ${
                      selected === null
                        ? "border-gray-200 hover:border-green-300 hover:bg-green-50"
                        : idx === question.correct
                        ? "border-green-500 bg-green-50 text-green-700"
                        : selected === idx
                        ? "border-red-400 bg-red-50 text-red-600"
                        : "border-gray-200 bg-gray-50 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        selected === null ? "bg-gray-200 text-gray-600" :
                        idx === question.correct ? "bg-green-500 text-white" :
                        selected === idx ? "bg-red-400 text-white" : "bg-gray-200 text-gray-500"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                      {selected !== null && idx === question.correct && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                      {selected === idx && idx !== question.correct && <XCircle className="w-4 h-4 text-red-500 ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>

              {showAnswer && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-blue-800 text-xs font-semibold mb-1">💡 Explanation</p>
                  <p className="text-blue-700 text-sm">{question.explanation}</p>
                </div>
              )}

              {showAnswer && (
                <button
                  onClick={nextQuestion}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  {currentQ < mcqBank.length - 1 ? "Next Question" : "See Results"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === "essay") {
    return (
      <div className="p-4 lg:p-6 space-y-4">
        <button onClick={() => setMode("home")} className="text-green-600 text-sm flex items-center gap-1 hover:underline">
          ← Back to Practice
        </button>
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-5 text-white">
          <h3 className="text-xl text-white mb-1">Essay Lab</h3>
          <p className="text-green-200 text-sm">Past and practice essay topics with structure guides</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {essayTopics.map((essay) => (
            <div key={essay.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  essay.difficulty === "Hard" ? "bg-red-100 text-red-700" :
                  essay.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>{essay.difficulty}</span>
                <span className="text-gray-400 text-xs">CSS {essay.year}</span>
              </div>
              <p className="text-gray-800 font-medium text-sm mb-3">{essay.topic}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleGenerateOutline(essay)}
                  className="flex-1 text-xs bg-gray-100 text-gray-600 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Outline
                </button>
                <button
                  onClick={() => { 
                    setSelectedEssay(essay);
                    setMode("answer"); 
                    setAnswerText(""); 
                    setSubmitted(false);
                    setAiEvaluation("");
                  }}
                  className="flex-1 text-xs bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                >
                  <PenTool className="w-3 h-3" /> Write Essay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "outline") {
    return (
      <div className="p-4 lg:p-6 space-y-4 max-w-4xl mx-auto">
        <button onClick={() => setMode("essay")} className="text-green-600 text-sm flex items-center gap-1 hover:underline">
          ← Back to Essay Lab
        </button>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-5 text-white">
            <h3 className="text-xl text-white mb-1">Essay Outline</h3>
            <p className="text-green-200 text-sm">AI-generated structure for your essay</p>
          </div>
          <div className="p-5 space-y-4">
            {selectedEssay && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-500 text-xs font-medium mb-1">ESSAY TOPIC (CSS {selectedEssay.year})</p>
                <p className="text-gray-800 font-medium">{selectedEssay.topic}</p>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-3" />
                <p className="text-gray-600 text-sm">Generating essay outline...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={() => selectedEssay && handleGenerateOutline(selectedEssay)}
                  className="mt-3 text-red-600 text-sm hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : essayOutline ? (
              <div className="prose prose-sm max-w-none">
                <div 
                  className="text-gray-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: essayOutline
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              </div>
            ) : null}

            {essayOutline && !loading && (
              <button
                onClick={() => {
                  setMode("answer");
                  setAnswerText("");
                  setSubmitted(false);
                  setAiEvaluation("");
                }}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <PenTool className="w-4 h-4" /> Start Writing Essay
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (mode === "answer") {
    return (
      <div className="p-4 lg:p-6 space-y-4 max-w-3xl mx-auto">
        <button onClick={() => setMode("home")} className="text-green-600 text-sm flex items-center gap-1 hover:underline">
          ← Back to Practice
        </button>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-5 text-white">
            <h3 className="text-xl text-white mb-1">Answer Writing Practice</h3>
            <p className="text-purple-200 text-sm">Write your answer below and submit for AI evaluation</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-500 text-xs font-medium mb-1">CSS QUESTION (2023 — Pakistan Affairs)</p>
              <p className="text-gray-800 font-medium">
                {selectedEssay?.topic || "Discuss the constitutional development in Pakistan from 1947 to 1973. What were the major challenges faced during this period?"}
              </p>
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium mb-1.5 block">Your Answer</label>
              <textarea
                value={answerText}
                onChange={e => setAnswerText(e.target.value)}
                placeholder="Write your CSS answer here... (aim for 400-500 words for long questions)"
                className="w-full h-64 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 outline-none focus:border-green-400 resize-none"
                disabled={submitted}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{answerText.split(/\s+/).filter(Boolean).length} words</span>
                <span>Recommended: 400-500 words</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {!submitted ? (
              <button
                onClick={handleEvaluateAnswer}
                disabled={answerText.trim().length < 50 || loading}
                className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Evaluating...
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" /> Submit for AI Evaluation
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin mb-3" />
                    <p className="text-gray-600 text-sm">Analyzing your answer...</p>
                  </div>
                ) : aiEvaluation ? (
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
                    <h4 className="text-purple-800 font-semibold mb-3 flex items-center gap-2">🤖 AI Evaluation</h4>
                    <div className="bg-white rounded-lg p-4 text-sm">
                      <div 
                        className="prose prose-sm max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ 
                          __html: aiEvaluation
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
                    </div>
                  </div>
                ) : null}
                <button
                  onClick={() => { 
                    setAnswerText(""); 
                    setSubmitted(false); 
                    setAiEvaluation(""); 
                    setError(null);
                  }}
                  className="w-full border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
