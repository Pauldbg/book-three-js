// Composant pour le personnage

import { useFBX } from '@react-three/drei';



export default function Character () {
  const fbx = useFBX('/character.fbx');

  return <primitive object={fbx} scale={0.01} />;
};