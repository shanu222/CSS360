import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, Copy, Check, Zap } from "lucide-react";

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

const mockResponses: Record<string, string> = {
  "realism": `**Realism in International Relations**

Realism is one of the oldest and most influential theories in IR. Here's a comprehensive breakdown:

**Core Assumptions:**
• States are the primary actors in world politics
• The international system is anarchic (no world government)
• States act rationally to maximize national interest
• Power is the primary currency of international relations

**Key Thinkers:**
• **Thucydides** — "The History of the Peloponnesian War" (original realist)
• **Machiavelli** — The Prince; politics divorced from morality
• **Hans Morgenthau** — "Politics Among Nations" (Classical Realism)
• **Kenneth Waltz** — Theory of International Politics (Neo/Structural Realism)

**Types of Realism:**
1. **Classical Realism** — States are power-hungry by human nature
2. **Neo-Realism** — System structure forces states to seek power
3. **Offensive Realism** — States seek to maximize power (Mearsheimer)
4. **Defensive Realism** — States seek appropriate security (Waltz)

**CSS Exam Tip:** Always relate IR theories to Pakistan's foreign policy. Connect Realism to Pakistan's military buildup, nuclear deterrence, and balance-of-power approach vis-à-vis India.`,

  "essay outline": `**Essay Outline: Democracy in Pakistan**

**Introduction:**
• Hook: Churchill's quote on democracy
• Thesis: Pakistan's democratic journey has been turbulent but the civilian democratic order remains the most viable governance system
• Roadmap: Historical overview → Challenges → Way forward

**Body Paragraphs:**

**Para 1 — Historical Context:**
• 1947-1958: Early democratic experiments
• Four periods of military rule (1958, 1969, 1977, 1999)
• Gradual civilian consolidation post-2008

**Para 2 — Structural Challenges:**
• Weak political institutions
• Military's political role
• Feudal political culture
• Low political literacy

**Para 3 — Economic Factors:**
• Poverty & inequality fuel anti-democratic sentiment
• Governance failures erode public trust

**Para 4 — Positive Developments:**
• 18th Amendment (devolution of power)
• Supreme Court independence
• Free press and civil society
• Peaceful power transfers (2013, 2018)

**Counter-Argument + Rebuttal:**
• Some argue technocracy is more effective → Rebuttal: history shows technocracies also fail; accountability requires democracy

**Conclusion:**
• Democracy is a journey, not a destination
• Pakistan needs institutional strengthening, not systemic change`,

  "cpec": `**CPEC — China-Pakistan Economic Corridor**

**Overview:**
The China-Pakistan Economic Corridor (CPEC) is a collection of infrastructure projects connecting China's Xinjiang region to Pakistan's Gwadar port. Total investment: ~$62 billion (initial estimate).

**Key Components:**
1. **Energy Projects** — Power plants addressing Pakistan's energy crisis
2. **Transport Infrastructure** — Roads, railways, highways
3. **Gwadar Port Development** — Strategic deep-sea port
4. **Special Economic Zones (SEZs)** — Industrial cooperation
5. **Digital Connectivity** — Fiber optic cables, IT projects

**Strategic Importance:**
• **For China:** Access to Arabian Sea, diversifying energy routes (avoiding Malacca Strait)
• **For Pakistan:** Investment, jobs, infrastructure development, economic growth

**Criticisms:**
• Debt burden concerns
• Limited technology transfer
• Environmental impacts
• Security challenges (Balochistan)
• Trade imbalance (imports from China increase)

**CPEC Phase II:**
Focus on: agriculture, industry, IT, socioeconomic development

**CSS Exam Angle:** CPEC touches Pakistan Affairs, IR, Economics, and Current Affairs — a high-frequency exam topic. Always discuss both opportunities and challenges.`,
};

function generateResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("realism") || q.includes("ir theory")) return mockResponses["realism"];
  if (q.includes("essay") || q.includes("outline") || q.includes("democracy")) return mockResponses["essay outline"];
  if (q.includes("cpec") || q.includes("china pakistan")) return mockResponses["cpec"];

  return `**AI Assistant Response**

Thank you for your question about: *"${query}"*

Here's a comprehensive answer for CSS preparation:

**Key Points:**
• This is a high-frequency topic in CSS examinations
• Pakistan's context is particularly important for this subject
• Multiple perspectives should be covered in your answer

**Core Concepts:**
The topic encompasses several important themes including historical background, theoretical frameworks, contemporary relevance, and Pakistan's specific context.

**CSS Exam Strategy:**
• Structure your answer with clear headings (if long question)
• Always include relevant quotes or statistics
• Connect theory to Pakistan-specific examples
• Write a strong concluding paragraph with policy recommendations

**Recommended Reading:**
• Refer to FPSC past papers (2020-2024) for this topic
• Consult relevant textbooks from the CSS Books Library
• Read Dawn/Express Tribune editorials on contemporary aspects

*Note: This is a simulated AI response. Connect to an AI service (like OpenAI API) for real-time, accurate responses.*`;
}

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

    setTimeout(() => {
      const response = generateResponse(query);
      setMessages(prev => [...prev, { role: "assistant", content: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
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
          <p className="text-gray-400 text-xs mt-1.5 text-center">
            AI responses are simulated. Connect OpenAI API for real answers.
          </p>
        </div>
      </div>
    </div>
  );
}
