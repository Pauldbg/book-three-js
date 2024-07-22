// Composant pour les objets du monde
export default function WorldObjects() {
    
    return (
      <>
        <mesh position={[2, 0, 2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh position={[-2, 0, -2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </>
    );
  }