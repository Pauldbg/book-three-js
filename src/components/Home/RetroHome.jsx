// import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/router"; // Navigation 
import TexturedCube from "./TexturedCube"; // import composant TexturedCube
import HUD from "../UI/HUD";

// Composant (secondaire) pour le menu rétro
function RetroMenu() {
  const router = useRouter();

    // Fonction pour gérer les clics sur les boutons du menu
  const handleMenuClick = (route) => {
    router.push(route);  // Navigue vers la route spécifiée
  };

  return (
    <nav className="flex flex-col space-y-4 mt-8">
      <button
        onClick={() => handleMenuClick("/sims")}
        className="bg-black border-2 border-green-600 text-green-500 px-4 py-2 font-['Press_Start_2P'] text-base cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-black w-48 mx-auto"
      >
        Start
      </button>
      <button
        onClick={() => handleMenuClick("/about")}
        className="bg-black border-2 border-green-600 text-green-500 px-4 py-2 font-['Press_Start_2P'] text-base cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-black w-48 mx-auto"
      >
        About Me
      </button>
      <button
        onClick={() => handleMenuClick("/contact")}
        className="bg-black border-2 border-green-600 text-green-500 px-4 py-2 font-['Press_Start_2P'] text-base cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-black w-48 mx-auto"
      >
        Contact
      </button>
    </nav>
  );
}

// Composant principal de la page d'accueil rétro
export default function RetroHomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-green-500 font-['Press_Start_2P']">
      {/* Canvas pour le rendu 3D */}
      <Canvas className="absolute inset-0">
        <ambientLight /> {/* Lumière ambiante pour l'éclairage global */}
        <pointLight position={[10, 10, 10]} /> {/* Source de lumière ponctuelle */}
        <TexturedCube /> {/* Rendu du cube texturé */}
      </Canvas>
      {/* Contenu 2D superposé */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        {/* Titre de la page */}
        <h1 className="text-4xl pt-10 retro-text-shadow">Book pro de Paul DBG</h1>
        {/* Espace réservé, potentiellement pour le cube 3D */}
        <div className="relative w-64 h-64"></div>
        {/* Rendu du menu rétro */}
        <RetroMenu />
      </div>
    </div>
  );
}
