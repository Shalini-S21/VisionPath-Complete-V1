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
      const answer = data.resultText || data.answer || data.message;
      if (answer) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: answer }]);
      } else {
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: 'Error: No response generated from AI Mentor.', isError: true }]);
      }
    } catch (err) {
      console.error('AI Mentor Error:', err);
      const errMsg = err?.response?.data?.message || err?.message || 'Failed to communicate with AI Mentor service.';
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: `AI Service Error: ${errMsg}`, isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-[#1F3327] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6] flex items-center gap-2">
              VisionPath AI Mentor Chat
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Powered by VisionPath AI</p>
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
                msg.sender === 'user' ? 'bg-emerald-600' : 'bg-slate-800 dark:bg-[#151E18]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-400" />}
            </div>
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                  : msg.isError
                  ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-tl-none border border-red-200 dark:border-red-900 font-semibold'
                  : 'bg-slate-100 dark:bg-[#151E18] text-slate-800 dark:text-[#F3F4F6] rounded-tl-none border border-slate-200/60 dark:border-[#1F3327]'
              }`}
            >
              {msg.sender === 'user' ? (
                msg.text
              ) : (
                <div 
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/###\s+(.*)/g, '<h3 class="font-bold text-sm mt-3 mb-1 text-emerald-700 dark:text-emerald-400">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/---/g, '<hr class="my-3 border-slate-200 dark:border-slate-700" />')
                  }} 
                />
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 italic">
            <Bot className="w-4 h-4 text-emerald-500 animate-spin" /> VisionPath AI is generating response...
          </div>
        )}
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-[#1F3327] flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask VisionPath AI Mentor (e.g. What skills are needed for Full Stack AI Engineer?)..."
          className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#151E18] border border-slate-200 dark:border-[#1F3327] text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <Button type="submit" variant="primary" size="md" icon={Send} isLoading={isTyping}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default AICareerAssistant;
