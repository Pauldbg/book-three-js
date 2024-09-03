import dynamic from 'next/dynamic' // Charge le composant à la demande
import FindMeHUD from '../components/UI/FindMeSlice/FindMeHUD.jsx';


const GameScene = dynamic(() => import('../components/FindMe/FindMeGame'), { ssr: false }) 

export default function FindMePage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GameScene />
      <FindMeHUD/>
    </div>
  )
}