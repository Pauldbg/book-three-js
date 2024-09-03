import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Weapon from './Weapon'
import Floor from './Floor'
import Wall from './Wall'
import Enemy from './Enemy'  // Supposons que vous ayez un composant Enemy

export default function Home() {
  const [health, setHealth] = useState(100)
  const [ammo, setAmmo] = useState(50)
  const [score, setScore] = useState(0)

  // Supprimez ou commentez l'useEffect pour la musique de fond

  const handleShoot = () => {
    if (ammo > 0) {
      setAmmo(ammo - 1)
      // Supprimez ou commentez la partie liée au son de tir
      // Logique pour détecter si un ennemi a été touché
      // Si oui, augmenter le score
      setScore(score + 10)
    }
  }

  return (
    <div className="w-screen h-screen bg-black font-press-start overflow-hidden" onClick={handleShoot}>
      <Canvas camera={{ position: [0, 1.5, 5] }}>
        <fog attach="fog" args={['#300', 1, 20]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        <Floor />
        <Wall position={[0, 5, -10]} rotation={[0, 0, 0]} />
        <Wall position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Wall position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Weapon />
        <Enemy position={[-5, 0, -5]} />
        <Enemy position={[5, 0, -7]} />
        <OrbitControls />
      </Canvas>

      {/* HUD */}
      <div className="absolute top-4 left-4 text-red-600 text-xl animate-pulse">
        DOOM-like Portfolio
      </div>
      <div className="absolute bottom-4 left-4 text-green-500 text-sm">
        HP: {health}%
      </div>
      <div className="absolute bottom-4 right-4 text-yellow-500 text-sm">
        AMMO: {ammo}
      </div>
      <div className="absolute top-4 right-4 text-blue-500 text-sm">
        SCORE: {score}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-4xl opacity-50">
        +
      </div>
    </div>
  )
}