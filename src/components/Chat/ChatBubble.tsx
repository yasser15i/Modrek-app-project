import React from 'react';
import { Message } from '../../types';
import { formatRelativeTime } from '../../utils/dateUtils';

interface ChatBubbleProps {
  message: Message;
  onRead?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onRead }) => {
  const isAssistant = message.sender === 'assistant';
  
  React.useEffect(() => {
    if (!message.isRead && isAssistant && onRead) {
      onRead();
    }
  }, [message, isAssistant, onRead]);

  return (
    <div
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-xl ${
          isAssistant
            ? 'bg-white rounded-bl-none shadow-md text-secondary-500'
            : 'bg-primary-500 text-white rounded-br-none'
        } px-4 py-3 animate-fade-in`}
      >
        <p className="text-base">{message.content}</p>
        <div
          className={`text-xs mt-1 ${
            isAssistant ? 'text-secondary-400' : 'text-primary-100'
          } text-left`}
        >
          {formatRelativeTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;