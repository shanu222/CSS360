import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, Copy, Check, Zap, AlertCircle } from "lucide-react";
import { aiService } from "../../services/aiService";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

const suggestions = [
  "Explain Realism theory in International Relations",
  "Summarize Pakistan's foreign policy objectives",
  "Generate an essay outline on 'Democracy in Pakistan'",
  "What are the key constitutional amendments in Pakistan?",
  "Explain the Kashmir conflict in detail",
  "How to write a good CSS answer?",
  "Summarize CPEC and its importance",
  "Explain the difference between Liberalism and Realism",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `**Welcome to CSS AI Assistant! 🎓**

I'm your intelligent study companion for CSS preparation. I can help you with:

• 📚 **Explain concepts** — Theory, history, current affairs
• ✍️ **Essay outlines** — Structure and argumentation
• 🎯 **Generate questions** — CSS-style practice questions
• 📝 **Answer evaluation** — Improve your answers
• 📖 **Notes summaries** — Condense complex topics

**Try asking me something!** For example: *"Explain Realism in IR"* or *"Generate an essay outline on Climate Change"*`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examinerBusy, setExaminerBusy] = useState(false);
  const [examinerAction, setExaminerAction] = useState<string | null>(null);
  const [examinerOutput, setExaminerOutput] = useState<string>("");
  const [examinerQuestion, setExaminerQuestion] = useState("");
  const [examinerAnswer, setExaminerAnswer] = useState("");
  const [examinerSubject, setExaminerSubject] = useState("");
  const [examinerCount, setExaminerCount] = useState(5);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    const userMsg: Message = { role: "user", content: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      // Call the real AI API
      const response = await aiService.chat(query);
      
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: response.reply, 
          timestamp: new Date() 
        }
      ]);
    } catch (err: any) {
      console.error('AI chat error:', err);
      
      // Show user-friendly error message
      const errorMessage = err.response?.data?.error || err.message || 'Failed to get AI response';
      setError(errorMessage);
      
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: `**Error:** ${errorMessage}\n\nPlease try again or rephrase your question. If the problem persists, check your internet connection or contact support.`, 
          timestamp: new Date() 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyMessage = (idx: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const runExaminerAction = async (label: string, runner: () => Promise<any>) => {
    setExaminerBusy(true);
    setExaminerAction(label);
    setError(null);

    try {
      const result = await runner();
      const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      setExaminerOutput(output);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `**${label} complete**\n\n\`\`\`json\n${output}\n\`\`\``,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || `${label} failed`;
      setError(errorMessage);
      setExaminerOutput(JSON.stringify({ error: errorMessage }, null, 2));
    } finally {
      setExaminerBusy(false);
      setExaminerAction(null);
    }
  };

  const handleTrainModel = () => runExaminerAction('Train Examiner Model', () => aiService.trainExaminerModel());
  const handleGetProfile = () => runExaminerAction('Load Examiner Profile', () => aiService.getExaminerProfile());

  const handleEvaluate = () => {
    if (!examinerAnswer.trim()) {
      setError('Answer text is required for evaluation.');
      return;
    }

    runExaminerAction('Evaluate Answer', () => aiService.evaluateByExaminerModel(examinerAnswer, examinerQuestion || undefined));
  };

  const handleRefine = () => {
    if (!examinerAnswer.trim()) {
      setError('Answer text is required for refinement.');
      return;
    }

    runExaminerAction('Refine Answer', () => aiService.refineByExaminerModel(examinerAnswer, examinerQuestion || undefined));
  };

  const handlePredict = () => runExaminerAction('Predict Questions', () => aiService.predictFutureQuestions(examinerSubject || undefined, examinerCount));

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] text-white flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg text-white font-semibold">AI Assistant</h2>
              <p className="text-green-300 text-xs">Powered by GPT-4</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs hidden sm:inline">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {error && (
          <div className="mx-3 mt-3 sm:mx-4 sm:mt-4 p-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs sm:text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="p-3 sm:p-4 border-b border-gray-200 bg-white space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800">Examiner Tools</h3>
            {examinerBusy && (
              <span className="text-xs text-green-700 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                {examinerAction || 'Working...'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            <button onClick={handleTrainModel} disabled={examinerBusy} className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">Train</button>
            <button onClick={handleGetProfile} disabled={examinerBusy} className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">Profile</button>
            <button onClick={handleEvaluate} disabled={examinerBusy} className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">Evaluate</button>
            <button onClick={handleRefine} disabled={examinerBusy} className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">Refine</button>
            <button onClick={handlePredict} disabled={examinerBusy} className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">Predict</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <input
              type="text"
              value={examinerQuestion}
              onChange={(e) => setExaminerQuestion(e.target.value)}
              placeholder="Question (for evaluate/refine)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs sm:text-sm"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={examinerSubject}
                onChange={(e) => setExaminerSubject(e.target.value)}
                placeholder="Subject (predict)"
                className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-xs sm:text-sm"
              />
              <input
                type="number"
                min={1}
                max={20}
                value={examinerCount}
                onChange={(e) => setExaminerCount(Number(e.target.value) || 5)}
                placeholder="Count"
                className="rounded-lg border border-gray-300 px-2 py-2 text-xs sm:text-sm"
              />
            </div>
          </div>

          <textarea
            value={examinerAnswer}
            onChange={(e) => setExaminerAnswer(e.target.value)}
            placeholder="Answer text (required for evaluate/refine)"
            className="w-full min-h-[72px] rounded-lg border border-gray-300 px-3 py-2 text-xs sm:text-sm"
          />

          {examinerOutput && (
            <pre className="max-h-36 overflow-auto bg-gray-900 text-gray-100 rounded-lg p-2 text-[11px] sm:text-xs whitespace-pre-wrap break-words">
              {examinerOutput}
            </pre>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs ${
                msg.role === "assistant" ? "bg-green-600" : "bg-gradient-to-br from-yellow-400 to-orange-500"
              }`}>
                {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
              </div>
              <div className={`flex flex-col max-w-[85%] sm:max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 relative group text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-tr-sm"
                    : "bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm"
                }`}>
                  <div
                    dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                  />
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => copyMessage(idx, msg.content)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      {copied === idx ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
                <span className="text-gray-400 text-xs mt-0.5 sm:mt-1">{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="px-3 sm:px-4 pb-2 border-b border-gray-200">
            <p className="text-gray-500 text-xs mb-2 flex items-center gap-1"><Zap className="w-3 h-3" /> Suggestions:</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {suggestions.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex-shrink-0 text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition-all active:opacity-70"
                >
                  {s.length > 20 ? s.substring(0, 17) + '...' : s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-2.5 sm:p-3 lg:p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-1.5 sm:gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1 focus-within:border-green-400 transition-colors">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 outline-none placeholder:text-gray-400 min-w-0"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-green-600 flex items-center justify-center text-white hover:bg-green-700 active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-1 text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Powered by GPT-4</span>
          </p>
        </div>
      </div>
    </div>
  );
}
