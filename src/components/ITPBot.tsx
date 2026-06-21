import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Brain, GraduationCap } from 'lucide-react';
import { ExamType } from '../types';

interface ITPBotProps {
  activeExam: ExamType;
  selectedScoreRange: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function ITPBot({
  activeExam,
  selectedScoreRange,
  isOpen,
  setIsOpen,
}: ITPBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I'm ITP Universe Bot, your personal English tutor. I'm here to help you train for your exam! What would you like to practice today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    `Give me a high-scoring ${activeExam} vocabulary tip.`,
    `Explain the scoring system for ${activeExam}.`,
    `Give me a speaking template.`,
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const cleanText = text.trim();

    // Append user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: 'user', text: cleanText, timestamp };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleanText,
          exam: activeExam,
          scoreRange: selectedScoreRange,
        }),
      });
      const data = await res.json();
      const botMsg: Message = {
        sender: 'bot',
        text: data.response || "I appreciate your message! Let's continue practicing.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg: Message = {
        sender: 'bot',
        text: "[Error] It seems our tutoring server is having trouble connecting, but keep studying hard!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-300 hover:shadow-xl transition-all cursor-pointer z-50 group hover:-translate-y-1"
        id="itp-bot-floating-btn"
        title="Chat with ITP Universe Bot AI Tutor"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-spin-once" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
        )}
      </button>

      {/* Slide-out Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[550px] bg-white rounded-3xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden z-50 animate-fade-in"
          id="itp-bot-container"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between" id="itp-bot-header">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                <Brain className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">ITP Universe Bot</h4>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="text-[10px] text-white/80 font-semibold uppercase tracking-wider">AI English Coach • {activeExam}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Thread */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
            ref={scrollRef}
            id="itp-bot-thread"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text.split('\n').map((line, k) => (
                    <p key={k} className={k > 0 ? 'mt-1' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                <span className="text-[9px] text-gray-400/80 font-bold uppercase tracking-wider mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 self-start max-w-[85%] shadow-sm">
                <Brain className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest animate-pulse">bot thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions list */}
          <div className="p-2 border-t border-gray-100 bg-white flex flex-wrap gap-1.5" id="itp-bot-suggestions">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-200 px-2.5 py-1 rounded-full transition-all cursor-pointer truncate max-w-full disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-100 bg-white flex items-center space-x-2" id="itp-bot-input-area">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
              placeholder={`Ask itp-bot a ${activeExam} question...`}
              disabled={loading}
              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all disabled:opacity-50"
            />
            <button
              onClick={() => handleSend(inputVal)}
              disabled={loading || !inputVal.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-40 disabled:hover:translate-y-0"
              id="itp-bot-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
