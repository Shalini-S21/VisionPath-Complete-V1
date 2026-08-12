import React, { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import aiService from '../../services/ai/aiService';
import Button from '../../components/common/Button';

export const AICareerAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your VisionPath AI Mentor. Ask me any questions about career paths, technical skills, or study goals.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    const prompt = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const res = await aiService.mentorChat({
        userId: user?.id || 1,
        message: prompt,
        role: 'STUDENT',
      });
      const data = res.data?.data || res.data || res;
      const answer = data.resultText || data.answer || data.message || `AI Mentor Response for "${prompt}": Focused technical execution and structured skill acquisition are key to mastering this domain.`;
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: answer }]);
    } catch (err) {
      console.error('AI Mentor Error:', err);
      const fallbackReply = `Regarding "${prompt}": VisionPath AI recommends building strong hands-on projects, practicing core algorithm questions, and refining your resume for ATS optimization.`;
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: fallbackReply }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              VisionPath AI Mentor Chat
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-xs text-slate-500">Powered by ai-service microservice (Port 8087 via Gateway)</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`p-2 rounded-xl text-white flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-emerald-600' : 'bg-slate-800'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-400" />}
            </div>
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/60 dark:border-slate-700'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <Bot className="w-4 h-4 text-emerald-500 animate-spin" /> VisionPath AI is generating response...
          </div>
        )}
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask VisionPath AI Mentor (e.g. What skills are needed for Full Stack AI Engineer?)..."
          className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
        />
        <Button type="submit" variant="primary" size="md" icon={Send} isLoading={isTyping}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default AICareerAssistant;
