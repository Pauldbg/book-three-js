import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, BackSide } from 'three'

function Skybox() {
  const texture = useLoader(TextureLoader, '/textures/skyboxeldenring.webp')

  return (
    <mesh>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  )
}

export default Skybox