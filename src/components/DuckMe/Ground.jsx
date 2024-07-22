import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'

function Ground() {
  const texture = useLoader(TextureLoader, '/textures/ground.jpg')
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(100, 100)

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default Ground