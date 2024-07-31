import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Text3D, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const RetroGraffitiLogo = () => {
  const groupRef = useRef()
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [font, setFont] = useState(null)

  useEffect(() => {
    new FontLoader().load('/fonts/Graffiti_Font.json', setFont)
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current && textRef.current) {
      const t = clock.getElapsedTime()
      
      // Orbite autour du "soleil"
      groupRef.current.position.x = Math.sin(t * 0.5) * 4
      groupRef.current.position.z = Math.cos(t * 0.5) * 4
      
      // Rotation sur soi-même
      textRef.current.rotation.y += 0.02
    }
  })

  if (!font) return null

  return (
    <group ref={groupRef}>
      <Text3D
        ref={textRef}
        font={font}
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {clicked ? "Clicked!" : "LOGO"}
        <meshPhongMaterial 
          color={hovered ? "#ff00ff" : "#00ffff"} 
          emissive={hovered ? "#ff00ff" : "#00ffff"}
          emissiveIntensity={0.5}
          shininess={100}
        />
      </Text3D>
    </group>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RetroGraffitiLogo />
    </Canvas>
  )
}

export default Scene