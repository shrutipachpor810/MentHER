import React, { useState, useEffect, useRef } from 'react';

const ChatbotWindow = ({ closeWindow }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋! I’m your MentHer Assistant. Ask me anything about MentHer!' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: "Oops! I couldn't connect. Please try again." }]);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="
      fixed bottom-24 right-5 w-80 h-96 z-[9999]
      bg-white border border-peonypink rounded-xl 
      shadow-xl flex flex-col overflow-hidden animate-fade-in
    ">
      {/* Header */}
      <div className="bg-peonypink text-softwhite px-4 py-3 flex justify-between items-center">
        <h3 className="font-bold">🌸 MentHer Assistant</h3>
        <button
          onClick={closeWindow}
          className="text-softwhite text-lg hover:text-blossompink transition-colors"
        >
          ✖
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} items-start`}
          >
            {msg.from === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-peonypink text-softwhite flex items-center justify-center mr-2 text-sm">
                🤖
              </div>
            )}
            <div className={`
              px-4 py-2 rounded-2xl shadow
              ${msg.from === 'user'
                ? 'bg-peonypink text-softwhite rounded-br-none'
                : 'bg-blushcream text-deepcocoa rounded-bl-none'}
              max-w-[70%] break-words transition-all
            `}>
              {msg.text}
            </div>
            {msg.from === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blossompink text-softwhite flex items-center justify-center ml-2 text-sm">
                🧑
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex border-t border-peonypink">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="
            flex-1 px-4 py-3 outline-none
            text-deepcocoa placeholder:text-mutedmauve
            bg-transparent
          "
        />
        <button
          onClick={handleSend}
          className="
            px-5 bg-peonypink hover:bg-blossompink
            text-softwhite transition-colors
          "
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatbotWindow;
