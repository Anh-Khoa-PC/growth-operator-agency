import React, { useState, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Xin chào, hãy bắt đầu nói chuyện với Trợ lý AI của bạn ngay bây giờ!" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = async () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState && !hasTriggered) {
      setHasTriggered(true);
      try {
        // Trigger the specific API call requested
        await fetch('https://app.nedzo.ai/api/1.1/wf/single-call', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contact_id: "123456", 
                message: "Xin chào, hãy bắt đầu nói chuyện với Trợ lý AI của bạn ngay bây giờ!" 
            })
        });
      } catch (error) {
        console.error("Failed to trigger webhook", error);
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    
    // Simulate thinking
    setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', text: "Cảm ơn bạn đã nhắn tin. Chuyên gia của chúng tôi sẽ phản hồi sớm nhất." }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[450px]"
          >
            {/* Header */}
            <div className="bg-[#111] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center">
                   <Bot className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm">Trợ lý Growth Operator</h4>
                   <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-gray-400 text-xs">Online</span>
                   </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
               {messages.map((msg, idx) => (
                 <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                        ? 'bg-brand-orange text-white rounded-br-sm' 
                        : 'bg-[#222] text-gray-200 rounded-bl-sm border border-white/5'
                    }`}>
                        {msg.text}
                    </div>
                 </div>
               ))}
               <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-[#111] border-t border-white/10 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 bg-black border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-orange/50"
                />
                <button type="submit" className="p-2 bg-brand-orange text-white rounded-full hover:bg-orange-600 transition-colors">
                    <Send className="w-4 h-4" />
                </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-brand-orange text-white rounded-full shadow-[0_0_20px_rgba(255,92,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AIChat;