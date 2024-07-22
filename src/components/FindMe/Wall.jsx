// Wall.jsx
import React, { useMemo } from 'react'
import { Box, useTexture } from '@react-three/drei'
import { GAME_CONFIG } from '../../configMaze'
import * as THREE from 'three' 


export default function Wall({ position, scale }) {
  // Chargez la texture
  const texture = useTexture('/textures/wall.jpg')

  // Mémorisez le matériau pour éviter de le recréer à chaque rendu avec le Hook useMemo
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({ 
      map: texture,
      // color: GAME_CONFIG.COLORS.WALL // Appliquez la couleur de base sur la texture
    })
    // Ajustez la répétition de la texture si nécessaire
    mat.map.repeat.set(2, 2)
    mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping
    return mat
  }, [texture])

  return (
    <Box position={position} args={scale} material={material} />
  )
}