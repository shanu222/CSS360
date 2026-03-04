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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-5 bg-gradient-to-r from-[#0f3d2b] to-[#1a5c3e] text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg text-white font-semibold">AI Study Assistant</h2>
              <p className="text-green-300 text-xs">Powered by AI · CSS Preparation Mode</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant" ? "bg-green-600" : "bg-gradient-to-br from-yellow-400 to-orange-500"
              }`}>
                {msg.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>
              <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-4 py-3 relative group ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-tr-sm"
                    : "bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm"
                }`}>
                  <div
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                  />
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => copyMessage(idx, msg.content)}
                      className="absolute top-2 right-2 p-1 rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      {copied === idx ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
                <span className="text-gray-400 text-xs mt-1">{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="px-4 pb-2">
            <p className="text-gray-500 text-xs mb-2 flex items-center gap-1"><Zap className="w-3 h-3" /> Quick suggestions:</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {suggestions.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex-shrink-0 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1 focus-within:border-green-400 transition-colors">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask anything about CSS preparation..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-1.5 text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            Powered by OpenAI GPT-4 — Real AI responses
          </p>
        </div>
      </div>
    </div>
  );
}
