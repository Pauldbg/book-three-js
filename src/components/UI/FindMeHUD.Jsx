import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { resetGame, selectIsGameWon } from "../../redux/reducers/findMeSlice";


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

  return (
    <div className="absolute top-0 left-0 m-4 text-white font-sans">
      {isGameWon && (
        <div className="mt-4">
          <h2 className="text-3xl font-bold mb-2">Well done!</h2>
          <p className="text-xl mb-4">Vous avez trouvé l'objet ! </p>
          <button
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Rejouer
          </button>
          <button
            onClick={handleHomeClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Accéder à mon Book
          </button>
        </div>
      )}
    </div>
  );
}

export default FindMeHUD;