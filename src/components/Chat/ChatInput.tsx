import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import Button from '../UI/Button';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const { isListening } = useApp();
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-3 flex items-end">
      <textarea
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اكتب رسالتك هنا..."
        className="flex-1 border-none outline-none resize-none bg-transparent min-h-[40px] max-h-[120px] p-2 text-right text-secondary-500 placeholder-secondary-300"
        rows={1}
      />
      
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/voice')}
          className="ml-1 p-2 rounded-full hover:bg-primary-50"
          icon={<Mic className="w-5 h-5 text-primary-500" />}
        />
        
        <Button
          type="submit"
          variant="primary"
          disabled={!inputValue.trim()}
          className="p-2 rounded-full"
          icon={<Send className="w-5 h-5" />}
        />
      </div>
    </form>
  );
};

export default ChatInput;