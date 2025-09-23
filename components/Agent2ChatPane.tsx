import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { GeminiService } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { SendIcon } from './icons/SendIcon';

interface Agent2ChatPaneProps {
  query: string;
  geminiService: GeminiService;
}

const Agent2ChatPane: React.FC<Agent2ChatPaneProps> = ({ query, geminiService }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
        { role: 'model', text: `I'm ready to answer your questions about "${query}". I'll use Google Search to find the most up-to-date information.` }
    ]);
  }, [query]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: ChatMessage = { role: 'user', text: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
        const { text, sources } = await geminiService.sendMessageWithGoogleSearch(currentMessages, input);
        const modelMessage: ChatMessage = { role: 'model', text, sources };
        setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
        setIsLoading(false);
    }
  }, [input, messages, geminiService, isLoading]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-center">AI Assistant</h3>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.role === 'model' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-300/80">
                        <h4 className="text-xs font-semibold text-gray-600 mb-2">Sources:</h4>
                        <div className="space-y-1.5">
                            {msg.sources.map((source, i) => (
                                <a key={i} href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:text-blue-900 hover:underline bg-gray-100 p-2 rounded-md block transition-colors">
                                    <span className="font-bold">{i+1}. </span>
                                    <span className="truncate">{source.web.title || source.web.uri}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </div>
          ))}
           {isLoading && (
             <div className="flex justify-start">
               <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-2xl">
                 <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                 </div>
               </div>
             </div>
           )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a follow-up question..."
            className="w-full pl-4 pr-12 py-3 text-base bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agent2ChatPane;
