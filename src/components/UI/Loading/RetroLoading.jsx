import React from "react";

const RetroLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-500 font-['Press_Start_2P']">
      <p className="text-2xl mt-5 animate-blink shadow-glow">LOADING...</p>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        @keyframes blink {
          0%, 49% {
            opacity: 0;
          }
          50%, 100% {
            opacity: 1;
          }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        .shadow-glow {
          text-shadow: 0 0 5px #22c55e;
        }
      `}</style>
    </div>
  );
};

export default RetroLoading;