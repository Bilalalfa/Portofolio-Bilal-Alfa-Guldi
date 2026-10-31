import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiSend,
  FiTrash2,
  FiZap,
  FiUser,
  FiCpu,
} from 'react-icons/fi';
import { sendChatMessage } from '../../services/aiService';

const SUGGESTED_QUESTIONS = [
  '💡 What are Bilal\'s skills?',
  '🚀 What has Bilal built?',
  '🏆 Awards & experience',
  '📩 How can I contact Bilal?',
];

const INITIAL_WELCOME = {
  role: 'model',
  text: 'Hi! 👋 I\'m **Bilal\'s AI Assistant**. Ask me about his skills, projects, awards or experience — or pick a topic below. (You can also ask in Indonesian or Turkish.)',
  timestamp: new Date(),
};

/**
 * Simple helper to render basic markdown bold & bullet points in text safely.
 */
function renderFormattedText(text) {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, index) => {
    // Handle bullet points
    let isBullet = false;
    let content = line;
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      isBullet = true;
      content = line.trim().substring(2);
    }

    // Process bold text **text**
    const parts = content.split(/(\*\*.*?\*\*)/g);
    const formattedParts = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-semibold text-gray-900 dark:text-slate-100">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <li key={index} className="ml-4 list-disc my-0.5">
          {formattedParts}
        </li>
      );
    }

    return (
      <p key={index} className={index > 0 ? 'mt-1.5' : ''}>
        {formattedParts}
      </p>
    );
  });
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query || !query.trim() || isLoading) return;

    const userMsg = {
      role: 'user',
      text: query.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Format chat history for Gemini API API payload
    const apiHistory = newMessages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    try {
      const replyText = await sendChatMessage(apiHistory);

      const aiMsg = {
        role: 'model',
        text: replyText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Failed to get AI response:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Sorry, something went wrong while connecting to the AI. Please try again in a moment!',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME]);
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
              aria-label="Open AI assistant chat"
            >
              <div className="relative flex items-center justify-center">
                <FiZap className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <span className="font-semibold text-sm tracking-wide hidden sm:inline">
                Ask Bilal's AI
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200/80 dark:border-slate-800 flex flex-col overflow-hidden transition-colors duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 px-4 py-3.5 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <FiCpu className="w-5 h-5 text-yellow-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-700 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    Bilal AI Assistant
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full text-indigo-100 font-normal">
                      Gemini
                    </span>
                  </h3>
                  <p className="text-[11px] text-indigo-100/90">
                    Siap menjawab seputar portofolio Bilal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear chat"
                  className="p-1.5 hover:bg-white/10 rounded-lg text-indigo-100 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 hover:bg-white/10 rounded-lg text-indigo-100 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body / Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-slate-950/70 text-sm">
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${
                      isUser ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                        isUser
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                      }`}
                    >
                      {isUser ? <FiUser className="w-3.5 h-3.5" /> : <FiZap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 border border-gray-200/80 dark:border-slate-700 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {isUser ? msg.text : renderFormattedText(msg.text)}
                    </div>
                  </div>
                );
              })}

              {/* Quick suggestion chips (shown if history is short) */}
              {messages.length === 1 && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Rekomendasi Pertanyaan:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q.replace(/^[^\s]+\s/, ''))}
                        className="text-left text-xs bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 text-gray-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading Bouncing Dots Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-xs pl-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                    <FiZap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3.5 py-2 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something about Bilal..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none py-1"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all shadow-sm shrink-0"
                  aria-label="Send message"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 dark:text-slate-500 mt-2">
                Powered by Gemini AI • Informasi seputar Bilal Alfa Guldi
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
