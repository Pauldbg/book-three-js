import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { useSelector, useDispatch } from 'react-redux'
import { Physics } from '@react-three/cannon';
import Player from './Player'
import Skybox from './Skybox';
import Maze from './Maze'
import Floor from './Floor';
import { selectMaze, selectObjectPosition, selectIsGameOver, resetGame } from '../../redux/reducers/findMeSlice'


export default function FindMeGame() {
  // Permet d'envoyer des actions à Redux
  const dispatch = useDispatch();
  
  // Sélectionne différentes parties de l'état Redux
  const maze = useSelector(selectMaze);  // Structure du labyrinthe 
  const objectPosition = useSelector(selectObjectPosition);  // Position de l'objet à collecter 
  const isGameOver = useSelector(selectIsGameOver);  // État de fin de jeu 

  // Effet qui s'exécute une fois au montage du composant
  useEffect(() => {
    // Réinitialise le jeu au démarrage
    dispatch(resetGame());
  }, [dispatch]);

  return (
    <>
      {/* Canvas Three.js pour le rendu 3D */}
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000 }}>
        {/* Éclairage de la scène */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Skybox/> 
        <Physics> 
        {/* Composant joueur */}
        <Player />
        {/* Composant labyrinthe */}
        <Maze maze={maze} objectPosition={objectPosition} />
        <Floor />
        </Physics>
        {/* Contrôles de la caméra à la première personne */}
        <PointerLockControls />  // Permet de contrôler la caméra avec la souris
      </Canvas>
    </>
  )
}