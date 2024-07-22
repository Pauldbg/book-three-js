import React, { useState, useEffect } from 'react';

function GameOverMessage({ isGameOver }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isGameOver]);

  if (!isGameOver) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-6xl text-red-600 font-bold animate-pulse shadow-lg">
        VOUS AVEZ PERDU
      </h1>
    </div>
  );
}

export default GameOverMessage;