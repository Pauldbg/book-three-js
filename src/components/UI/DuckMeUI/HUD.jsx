import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { resetGame } from "../../../redux/reducers/stuckMe";

function HUD() {
  const dispatch = useDispatch();
  const router = useRouter();
  const score = useSelector((state) => state.game.score);
  const isGameOver = useSelector((state) => state.game.isGameOver);

  const handleRestart = () => {
    dispatch(resetGame());
  };

  const handleFindMeClick = () => {
    router.push('/findme');
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full font-press-start text-white">
      {/* Score toujours affiché en haut à gauche */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 p-2 border-2 border-white">
        Score: {score}
      </div>
      
      {/* Contenu du Game Over au centre */}
      {isGameOver && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-black bg-opacity-80 p-8 border-4 border-white">
            <h2 className="text-3xl mb-4 text-center text-yellow-400 animate-pulse">Game Over!</h2>
            <p className="text-xl mb-4 text-center">Final Score: {score}</p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleRestart}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 border-b-4 border-blue-800 hover:border-green-700 active:border-t-4 active:border-b-0 transition-all duration-100 mb-2"
              >
                Restart
              </button>
              <button
                onClick={handleFindMeClick}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 border-b-4 border-green-800 hover:border-green-700 active:border-t-4 active:border-b-0 transition-all duration-100"
              >
                Play FindMe ?
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HUD;