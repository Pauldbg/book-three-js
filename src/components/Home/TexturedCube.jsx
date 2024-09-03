import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export default function TexturedCube() {
  // Crée une référence pour accéder à l'objet mesh (le cube) directement

  const mesh = useRef();

  // Charge la texture de l'image. useLoader gère le chargement asynchrone
  const texture = useLoader(TextureLoader, "/profilpic2.webp");

  useFrame(() => {
    // Vérifie si la référence au mesh existe

    if (mesh.current) {
      // Incrémente la rotation du cube sur les axes X et Y
      // Cela crée une animation de rotation continue
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

// Rendu du cube texturé
return (
  // <mesh> est l'élément de base pour un objet 3D dans React Three Fiber
  <mesh ref={mesh}>
    {/* Définit la géométrie du cube. args spécifie les dimensions [largeur, hauteur, profondeur] */}
    <boxGeometry args={[1.5, 1.5, 1.5]} />
    {/* Applique un matériau standard au cube avec la texture chargée */}
    <meshStandardMaterial map={texture} />
  </mesh>
);
}

