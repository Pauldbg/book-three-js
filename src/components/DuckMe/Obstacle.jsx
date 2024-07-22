import React, { useRef, } from 'react'
import { useFrame } from '@react-three/fiber'

function Obstacle({ position, speed }) {
  const mesh = useRef()

  useFrame((state, delta) => {
    mesh.current.position.z += speed * delta
    if (mesh.current.position.z > 10) {
      mesh.current.position.z = -30
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

export default Obstacle