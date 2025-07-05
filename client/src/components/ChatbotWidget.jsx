import React, { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && <ChatbotWindow closeWindow={() => setIsOpen(false)} />}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed bottom-5 right-5 z-[9999]
          w-16 h-16 rounded-full
          bg-peonypink hover:bg-blossompink
          text-softwhite text-3xl
          shadow-lg backdrop-blur-md transition-all
          flex items-center justify-center
        "
      >
        💬
      </button>
    </div>
  );
};

export default ChatbotWidget;
