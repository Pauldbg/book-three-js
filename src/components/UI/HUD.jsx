import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { resetGame } from "../../redux/reducers/gameReducer";


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
    <div className="absolute top-0 left-0 m-4 text-white font-sans">
      <div className="text-2xl font-bold">Score: {score}</div>
      {isGameOver && (
        <div className="mt-4">
          <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
          <p className="text-xl mb-4">Final Score: {score}</p>
          <button
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Restart
          </button>
          <div>
            <button
              onClick={handleFindMeClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-10"
            >
              Play FindMe ?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HUD;
