// import { useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Weapon() {
    // const texture = useTexture('/doom-weapon.png')
    const ref = useRef()
  
    useFrame((state) => {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 - 2
    })
  
    return (
        <mesh ref={ref} position={[1, -2, -3]}>
          <boxGeometry args={[0.5, 0.5, 2]} />
          <meshStandardMaterial color="#a52a2a" />
        </mesh>
      )
    }