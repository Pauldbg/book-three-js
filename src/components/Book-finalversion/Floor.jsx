import React from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Floor() {
    const texture = useTexture('/textures/Doomfloor.jpg')
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
      )
    }

