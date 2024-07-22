import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSelector, useDispatch } from 'react-redux'
import * as THREE from 'three'
import { GAME_CONFIG } from '../../ConfigDuckMe'
import { 
  updatePlayerPosition,
  setGameOver
} from "../../redux/reducers/gameReducer";

function Player() {
  // Référence pour le groupe contenant le mesh et les bordures
  const group = useRef()
  
  // Hook Redux pour dispatcher des actions
  const dispatch = useDispatch()
  
  // Sélecteurs Redux pour obtenir la position du joueur et les obstacles
  const position = useSelector((state) => state.game.playerPosition)
  const obstacles = useSelector((state) => state.game.obstacles)

  // Création de la géométrie des bordures (mémorisée pour optimisation) : on utilise directement three.js car fiber n'a pas d'équivalent directement 
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), [])

  // Effet pour gérer les entrées clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      const speed = 0.4 // Vitesse de déplacement du joueur
      let newPosition = [...position]
      let moved = false

      // Gestion des mouvements selon la touche pressée
      switch (e.key) {
        case 'ArrowUp':
          newPosition[2] = Math.max(newPosition[2] - speed, -GAME_CONFIG.PLAYER_BOUNDS)
          moved = true
          break
        case 'ArrowDown':
          newPosition[2] = Math.min(newPosition[2] + speed, GAME_CONFIG.PLAYER_BOUNDS)
          moved = true
          break
        case 'ArrowLeft':
          newPosition[0] = Math.max(newPosition[0] - speed, -GAME_CONFIG.PLAYER_BOUNDS)
          moved = true
          break
        case 'ArrowRight':
          newPosition[0] = Math.min(newPosition[0] + speed, GAME_CONFIG.PLAYER_BOUNDS)
          moved = true
          break
      }
      
      // Vérification des collisions avec les obstacles
      const collision = obstacles.some(obstacle => 
        Math.abs(newPosition[0] - obstacle.position[0]) < 1 &&
        Math.abs(newPosition[2] - obstacle.position[2]) < 1
      )

      if (moved) {
        if (collision) {
          dispatch(setGameOver()) // Termine le jeu en cas de collision
        } else {
          dispatch(updatePlayerPosition(newPosition)) // Met à jour la position du joueur
        }
      }
    }

    // Ajout de l'écouteur d'événements pour les touches
    window.addEventListener('keydown', handleKeyDown)
    
    // Nettoyage de l'écouteur lors du démontage du composant
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, position, obstacles])

  // Mise à jour de la position du groupe à chaque frame
  useFrame(() => {
    if (group.current) {
      group.current.position.set(...position)
    }
  })

  // Rendu du joueur (cube rose avec bordures noires)
  return (
    <group ref={group}>
      {/* Cube principal */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color="hotpink" />
      </mesh>
       {/* Bordures du cube */}
     <lineSegments geometry={edges}>
        <lineBasicMaterial color="black" linewidth={2} />
      </lineSegments>
    </group>
  )
}

export default Player