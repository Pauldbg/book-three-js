import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Enemy({ position }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.x = position[0] + Math.sin(t) * 2
    ref.current.position.z = position[2] + Math.cos(t) * 2
    ref.current.rotation.y = Math.sin(t)
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  )
}