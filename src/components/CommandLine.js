import React, { useState } from 'react';

const CommandLine = ({ onCommand, isTyping }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="command-line">
      <span className="prompt">visitor@portfolio:~$</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          autoFocus
        />
      </form>
    </div>
  );
};

export default CommandLine;