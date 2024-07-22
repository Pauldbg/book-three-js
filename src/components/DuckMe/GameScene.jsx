import React from "react";
import { Canvas, useFrame } from "@react-three/fiber"; // renderer : permet d'utiliser syntaxe et principes React
import { OrbitControls } from "@react-three/drei"; // bibliotheque complémentaire à fiber
import { useSelector, useDispatch } from "react-redux";
import Player from "./Player";
import Obstacle from "./Obstacle";
import Ground from "./Ground";
import Skybox from "./Skybox";
import { TextureLoader, BackSide } from "three";
import { useLoader } from "@react-three/fiber";
import { GAME_CONFIG } from "../../ConfigDuckMe";
import {
  updateObstacles,
  setGameOver,
  incrementGameTime,
} from "../../redux/reducers/gameReducer";

// Composant pour gérer la logique du jeu
function GameLogic() {
  const dispatch = useDispatch();
  const playerPosition = useSelector((state) => state.game.playerPosition);
  const obstacles = useSelector((state) => state.game.obstacles);
  // const gameTime = useSelector((state) => state.game.gameTime);
  const isGameOver = useSelector((state) => state.game.isGameOver);

  useFrame((state, delta) => {
    if (isGameOver) return;

    // Mise à jour des obstacles
    const updatedObstacles = obstacles.map((obstacle) => {
      const newZ = obstacle.position[2] + obstacle.speed * delta;
      if (newZ > 15) {
        // Si l'obstacle est sorti de l'écran
        // Réinitialiser sa position avec une nouvelle position X aléatoire
        return {
          ...obstacle,
          position: [(Math.random() - 0.5) * GAME_CONFIG.GAME_WIDTH, 1, -30],
        };
      }
      return {
        ...obstacle,
        position: [obstacle.position[0], obstacle.position[1], newZ],
      };
    });

    // Utilisez l'action creator updateObstacles
    dispatch(updateObstacles(updatedObstacles));

    // Vérification des collisions
    updatedObstacles.forEach((obstacle) => {
      if (
        Math.abs(playerPosition[0] - obstacle.position[0]) < 1 &&
        Math.abs(playerPosition[2] - obstacle.position[2]) < 1
      ) {
        // Utilisez l'action creator setGameOver
        dispatch(setGameOver());
      }
    });

// Mise à jour du score (environ une fois par seconde)
    // Modifié : Nous utilisons maintenant uniquement incrementGameTime
    // Le score est automatiquement incrémenté dans le reducer
    if (state.clock.elapsedTime % 1 < delta) {
      dispatch(incrementGameTime());
    }
  });

  return null;
}


// Composant pour les murs latéraux
function Wall({ position }) {
  const texture = useLoader(TextureLoader, "/textures/wall.jpg");

  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, 3, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Composant principal de la scène de jeu
function GameScene() {
  const obstacles = useSelector((state) => state.game.obstacles);

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Player />
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          position={obstacle.position}
          speed={obstacle.speed}
        />
      ))}
      <Ground />
      <Skybox />
      <Wall position={[GAME_CONFIG.GAME_WIDTH / 2 + 0.25, 1.5, 0]} />
      <Wall position={[-GAME_CONFIG.GAME_WIDTH / 2 - 0.25, 1.5, 0]} />
      <OrbitControls />
      <GameLogic />
    </Canvas>
  );
}

export default GameScene;
