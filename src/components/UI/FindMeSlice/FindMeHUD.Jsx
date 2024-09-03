import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { resetGame, selectIsGameWon } from "../../../redux/reducers/findMeSlice";

function FindMeHUD() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isGameWon = useSelector((state) => state.findMe.isGameWon);

  const handleRestart = () => {
    dispatch(resetGame());
  };

  const handleHomeClick = () => {
    router.push('/');
  };

    // Supprimez cette ligne lorsque vous voulez revenir au comportement normal
    // const alwaysShowHUD = true;

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-press-start text-white">
      {(isGameWon) && ( 
        <div className="bg-black bg-opacity-80 p-8 border-4 border-white">
          <h2 className="text-3xl mb-4 text-center text-yellow-400 animate-pulse">WELL DONE!</h2>
          <p className="text-sm mb-6 text-center">You found the object!</p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleRestart}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 border-b-4 border-blue-800 hover:border-blue-700 active:border-t-4 active:border-b-0 transition-all duration-100"
            >
              PLAY AGAIN
            </button>
            <button
              onClick={handleHomeClick}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 border-b-4 border-blue-800 hover:border-green-700 active:border-t-4 active:border-b-0 transition-all duration-100"
            >
              MY BOOK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindMeHUD;