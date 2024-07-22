import dynamic from 'next/dynamic' // Charge le composant à la demande
import HUD from '../components/UI/HUD'


const FindMeGame = dynamic(() => import('../components/FindMe/FindMeGame'), { ssr: false }) 

export default function FindMePage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FindMeGame />
    </div>
  )
}