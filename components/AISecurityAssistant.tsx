import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Shield, Bot, User, Sparkles, Loader2 } from 'lucide-react';

const AISecurityAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Bonjour ! Je suis l'assistant IA de Groupe Novitec. Je peux répondre à vos questions sur la cybersécurité, la Loi 25 ou nos services Cloud. Comment puis-je vous aider ?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Tu es l'assistant de sécurité de GROUPE NOVITEC, un MSP au Québec. Réponds de manière professionnelle, utile et sécurisante. Aide les clients à comprendre l'importance du MFA, des backups immuables et de la Loi 25. Mentionne que pour des conseils précis, ils devraient contacter un ingénieur Novitec.",
          temperature: 0.7,
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Je m'excuse, je n'ai pas pu générer de réponse. Veuillez contacter notre support." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Désolé, une erreur technique est survenue. Veuillez nous appeler directement." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="bg-white rounded-3xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-slate-200 animate-fade-in-up flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
             <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl">
                    <Bot className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Assistant Sécurité IA</h3>
                    <div className="flex items-center gap-1 text-[10px] text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Agent intelligent actif
                    </div>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full"><X className="w-5 h-5" /></button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
             {messages.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
               </div>
             ))}
             {loading && (
               <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                      <span className="text-xs text-slate-500">L'expert réfléchit...</span>
                  </div>
               </div>
             )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
             <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question sur votre sécurité..."
                className="flex-grow px-4 py-2 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
             />
             <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-xl transition-all"
             >
                <Send className="w-5 h-5" />
             </button>
          </div>
          <div className="p-1.5 bg-slate-100 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
             <Sparkles className="w-3 h-3" /> Propulsé par Novitec Intelligence
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center border-2 border-blue-500 group"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 group-hover:hidden" />
            <Sparkles className="w-6 h-6 hidden group-hover:block text-blue-400" />
          </div>
        </button>
      )}
    </div>
  );
};

export default AISecurityAssistant;