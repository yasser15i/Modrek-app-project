import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import ChatBubble from '../components/Chat/ChatBubble';
import ChatInput from '../components/Chat/ChatInput';
import Button from '../components/UI/Button';
import { useApp } from '../context/AppContext';
import { Message } from '../types';
import { generateResponse } from '../services/ai';

const ChatPage: React.FC = () => {
  const { messages, addMessage, isSpeaking, startSpeaking, stopSpeaking } = useApp();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      isRead: true,
    };
    
    addMessage(userMessage);
    setLoading(true);
    
    try {
      const aiResponse = await generateResponse(content);
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
        isRead: false,
      };
      
      addMessage(assistantMessage);
      startSpeaking(assistantMessage.content);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const lastAssistantMessage = [...messages]
        .reverse()
        .find(m => m.sender === 'assistant');
      
      if (lastAssistantMessage) {
        startSpeaking(lastAssistantMessage.content);
      }
    }
  };

  return (
    <div className="md:mr-64 h-screen flex flex-col bg-secondary-50">
      <Navbar />
      
      <div className="flex items-center p-4 bg-white border-b border-secondary-100">
        <Button
          variant="ghost"
          icon={<ArrowRight className="w-5 h-5" />}
          onClick={() => window.history.back()}
          className="ml-2"
        />
        <h1 className="text-xl font-semibold text-secondary-500">محادثة مع مُدرك</h1>
        
        <div className="mr-auto">
          <Button
            variant="ghost"
            onClick={toggleSpeaking}
            icon={isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            className="p-2 rounded-full"
          />
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-secondary-50 to-primary-50">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary-400">
              ابدأ محادثة مع مُدرك. أخبرني عن يومك، أو اطلب مني مساعدتك في تذكر شيء ما.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))
        )}
        
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white rounded-xl p-4 flex space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-primary-300 rounded-full animate-wave" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-primary-400 rounded-full animate-wave" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-primary-500 rounded-full animate-wave" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t border-secondary-100">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;