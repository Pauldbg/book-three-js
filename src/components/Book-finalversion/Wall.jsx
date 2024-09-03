import React from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Wall({ position, rotation }) {
    const texture = useTexture('/textures/wall.jpg')
   
    return (
        <mesh position={position} rotation={rotation}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
      )
    }