import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

const RotatingText = () => {
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    textRef.current.position.x = Math.sin(a) * 4
    textRef.current.position.z = Math.cos(a) * 4
    textRef.current.rotation.y = -a
  })

  return (
    <Text
      ref={textRef}
      fontSize={1}
      color={hovered ? "red" : "blue"}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {clicked ? "Clicked!" : "HomePage"}
    </Text>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <RotatingText />
    </Canvas>
  )
}

export default Scene