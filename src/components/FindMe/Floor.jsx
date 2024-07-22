import React from 'react';
import { usePlane } from '@react-three/cannon';
import { GAME_CONFIG } from '../../configMaze'; // configuration du jeu


export default function Floor() {
// Utiliser le hook usePlane pour créer un plan physique qui agit comme le sol
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotation du plan pour qu'il soit horizontal
    position: [
      GAME_CONFIG.MAZE_SIZE * GAME_CONFIG.PATH_WIDTH / 2, 
      0, 
      GAME_CONFIG.MAZE_SIZE * GAME_CONFIG.PATH_WIDTH / 2
    ], // Positionner le plan au centre du labyrinthe
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[GAME_CONFIG.MAZE_SIZE, GAME_CONFIG.MAZE_SIZE]} />
      <meshStandardMaterial color={GAME_CONFIG.COLORS.GROUND} />
    </mesh>
  );
}
