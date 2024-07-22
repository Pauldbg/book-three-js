
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Floor from './Floor';
import Character from './Character';
import WorldObjects from './Worldbjects';

// Composant principal pour le monde 3D
export default function World() {
    const [characterPosition, setCharacterPosition] = useState([0, 0, 0]);
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        const speed = 0.2;
        switch(e.key) {
          case 'ArrowUp':
            setCharacterPosition(prev => [prev[0], prev[1], prev[2] - speed]);
            break;
          case 'ArrowDown':
            setCharacterPosition(prev => [prev[0], prev[1], prev[2] + speed]);
            break;
          case 'ArrowLeft':
            setCharacterPosition(prev => [prev[0] - speed, prev[1], prev[2]]);
            break;
          case 'ArrowRight':
            setCharacterPosition(prev => [prev[0] + speed, prev[1], prev[2]]);
            break;
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
  
    return (
      <Canvas camera={{ position: [0, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Floor />
        <Character/>
        <WorldObjects />
        <OrbitControls />
      </Canvas>
    );
  }