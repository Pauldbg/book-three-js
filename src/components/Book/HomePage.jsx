import React from "react";
import { useRouter } from 'next/router';


export default function HomePage () {

  const currentDate = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-4 font-mono">
      <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600 uppercase tracking-widest">
          Paul's Book Page
        </h1>
        <div className="space-y-6">
          <p className="text-xl text-center">Retrouve tous mes projets</p>
          <div className="border-2 border-black p-4 bg-yellow-300">
            <p className="text-2xl font-bold text-center animate-pulse">
              EN COURS DE MAINTENANCE
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleHomeClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        © {currentDate} Paul's Book Page
      </div>
    </div>
  );
};
