import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

export default function CollectibleItem({ onCollect, ...props }) {
  const mesh = useRef()
  const [collected, setCollected] = useState(false)
  
  const texture = useTexture('/doom-health-pack.png')

  useFrame((state) => {
    if (!collected) {
      mesh.current.rotation.y += 0.01
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + props.position[1]
    }
  })

  const handleCollect = () => {
    if (!collected) {
      setCollected(true)
      onCollect()
      // Vous pourriez ici ajouter une animation de disparition
    }
  }

  if (collected) return null

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={handleCollect}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  )
}