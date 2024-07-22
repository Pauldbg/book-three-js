import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import {
  updatePlayerPosition,
  selectMaze,
  selectObjectPosition,
  collectObject,
  selectIsGameWon,
} from "../../redux/reducers/findMeSlice";
import { GAME_CONFIG } from "../../configMaze";

export default function Player() {
  const dispatch = useDispatch();
  const { camera } = useThree();
  const maze = useSelector(selectMaze);
  const objectPosition = useSelector(selectObjectPosition);
  const isGameWon = useSelector(selectIsGameWon);

  // Utilisation de useRef pour stocker l'état des touches sans provoquer de re-render
  const keys = useRef({
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
  });

  // Refs pour la physique du saut
  const velocity = useRef(new THREE.Vector3());
  const isJumping = useRef(false);
  const jumpStartHeight = useRef(0);

  useEffect(() => {
    // Positionne le joueur au début du jeu
    const startCell = findStartCell(maze);
    camera.position.set(
      startCell.x + 0.5,
      GAME_CONFIG.PLAYER_HEIGHT,
      startCell.z + 0.5
    );

    // Gestionnaires d'événements pour les touches du clavier
    const handleKeyDown = (event) => {
      if (event.code in keys.current) {
        keys.current[event.code] = true;
      }
    };

    const handleKeyUp = (event) => {
      if (event.code in keys.current) {
        keys.current[event.code] = false;
      }
    };

    // Ajout des écouteurs d'événements
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Nettoyage des écouteurs lors du démontage du composant
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera, maze]);

  useFrame((state, delta) => {
    const speed = GAME_CONFIG.PLAYER_SPEED * delta;
    const direction = new THREE.Vector3();

    // Calcul de la direction en fonction des touches pressées
    if (keys.current.KeyW) direction.z -= 1;
    if (keys.current.KeyS) direction.z += 1;
    if (keys.current.KeyA) direction.x -= 1;
    if (keys.current.KeyD) direction.x += 1;

    // Normalisation pour un mouvement constant dans toutes les directions
    if (direction.length() > 0) {
      direction.normalize();
    }

    // Application de la rotation de la caméra à la direction
    direction.applyEuler(camera.rotation);

    // Gestion du saut
    if (keys.current.Space && !isJumping.current) {
      isJumping.current = true;
      jumpStartHeight.current = camera.position.y;
      velocity.current.y = GAME_CONFIG.JUMP_FORCE;
    }

    if (isJumping.current) {
      // Application de la gravité et mise à jour de la position verticale
      velocity.current.y += GAME_CONFIG.GRAVITY * delta;
      camera.position.y += velocity.current.y * delta;

      // Gestion de l'atterrissage et de la hauteur maximale du saut
      if (camera.position.y <= GAME_CONFIG.PLAYER_HEIGHT) {
        camera.position.y = GAME_CONFIG.PLAYER_HEIGHT;
        isJumping.current = false;
        velocity.current.y = 0;
      } else if (camera.position.y > jumpStartHeight.current + GAME_CONFIG.MAX_JUMP_HEIGHT) {
        camera.position.y = jumpStartHeight.current + GAME_CONFIG.MAX_JUMP_HEIGHT;
        velocity.current.y = 0;
      }
    }

    // Calcul du mouvement horizontal
    const movement = direction.multiplyScalar(speed);
    const newPosition = camera.position.clone().add(movement);

    // Conversion de la position en coordonnées de cellule du labyrinthe
    const gridX = Math.floor(newPosition.x / GAME_CONFIG.PATH_WIDTH);
    const gridZ = Math.floor(newPosition.z / GAME_CONFIG.PATH_WIDTH);

    // Empêcher le joueur de passer sous le sol ou de s'élever trop haut
    newPosition.y = Math.max(GAME_CONFIG.PLAYER_HEIGHT, Math.min(newPosition.y, GAME_CONFIG.PLAYER_HEIGHT));

    // Vérification des collisions avec les murs du labyrinthe
    if (
      gridX >= 0 &&
      gridX < maze.length &&
      gridZ >= 0 &&
      gridZ < maze.length &&
      maze[gridZ][gridX] !== 1
    ) {
      // Mettre à jour la position visuelle
      camera.position.x = newPosition.x;
      camera.position.z = newPosition.z;
      
      // Mise à jour de la position du joueur dans le store Redux
      dispatch(
        updatePlayerPosition({
          x: gridX,
          y: camera.position.y,
          z: gridZ,
        })
      );

      // Vérification de la collecte d'objet
      if (
        Math.abs(gridX - objectPosition.x) < 0.5 &&
        Math.abs(gridZ - objectPosition.z) < 0.5
      ) {
        dispatch(collectObject());
      }
    }
  });

  // Ce composant ne rend rien visuellement, il gère uniquement la logique du joueur
  return null;
}

// Fonction utilitaire pour trouver la cellule de départ dans le labyrinthe
function findStartCell(maze) {
  for (let z = 0; z < maze.length; z++) {
    for (let x = 0; x < maze[z].length; x++) {
      if (maze[z][x] === 0) {
        return { x, z };
      }
    }
  }
  // Retourne une position par défaut si aucune cellule de départ n'est trouvée
  console.warn("No start cell found in maze, using default position");
  return { x: 0, z: 0 };
}