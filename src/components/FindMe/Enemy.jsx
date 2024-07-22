// import React, { useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useDispatch } from 'react-redux';
// import * as THREE from 'three';
// import { GAME_CONFIG } from '../../mazeGenerator';
// import { endGame } from '../../redux/reducers/findMeSlice';

// export default function Enemy({ maze, playerPosition, initialPosition }) {
//   const dispatch = useDispatch();
//   const enemyRef = useRef();
//   const direction = useRef(new THREE.Vector3(1, 0, 0));

//   useEffect(() => {
//     if (enemyRef.current) {
//       enemyRef.current.position.set(
//         initialPosition.x * GAME_CONFIG.PATH_WIDTH,
//         GAME_CONFIG.PLAYER_HEIGHT / 2,
//         initialPosition.z * GAME_CONFIG.PATH_WIDTH
//       );
//     }
//   }, [initialPosition]);

//   useFrame((state, delta) => {
//     if (enemyRef.current) {
//       // Mouvement de l'ennemi
//       const speed = GAME_CONFIG.ENEMY_SPEED * delta;
//       const newPosition = enemyRef.current.position.clone().add(direction.current.multiplyScalar(speed));

//       // Vérification des collisions avec les murs
//       const gridX = Math.floor(newPosition.x / GAME_CONFIG.PATH_WIDTH);
//       const gridZ = Math.floor(newPosition.z / GAME_CONFIG.PATH_WIDTH);

//       if (maze[gridZ] && maze[gridZ][gridX] !== 1) {
//         enemyRef.current.position.copy(newPosition);
//       } else {
//         // Changer de direction aléatoirement si un mur est rencontré
//         direction.current.set(
//           Math.random() - 0.5,
//           0,
//           Math.random() - 0.5
//         ).normalize();
//       }

//       // Vérification de la collision avec le joueur
//       const distanceToPlayer = enemyRef.current.position.distanceTo(new THREE.Vector3(
//         playerPosition.x * GAME_CONFIG.PATH_WIDTH,
//         GAME_CONFIG.PLAYER_HEIGHT / 2,
//         playerPosition.z * GAME_CONFIG.PATH_WIDTH
//       ));

//       if (distanceToPlayer < GAME_CONFIG.PLAYER_RADIUS + GAME_CONFIG.ENEMY_RADIUS) {
//         dispatch(endGame());
//       }
//     }
//   });

//   return (
//     <mesh ref={enemyRef}>
//       <sphereGeometry args={[GAME_CONFIG.ENEMY_RADIUS, 32, 32]} />
//       <meshStandardMaterial color="red" />
//     </mesh>
//   );
// }