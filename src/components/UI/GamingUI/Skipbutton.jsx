import React from 'react';
import { useRouter } from 'next/router';

const RetroSkipButton = ({ nextPage = '/next-page' }) => {
  const router = useRouter();

  const handleSkip = () => {
    router.push(nextPage);
  };

  return (
    <button
      onClick={handleSkip}
      className="fixed top-5 right-5 px-4 py-2 text-xl font-bold text-white uppercase bg-red-600 border-b-4 border-red-700 rounded hover:bg-red-500 active:border-b-2 active:translate-y-[2px] transition-all duration-100 shadow-lg retro-button"
    >
      Skip
    </button>
  );
};

export default RetroSkipButton;