
import dynamic from 'next/dynamic'
import HUD from '../components/UI/HUD'
import GameOverMessage from '../components/UI/GameOverMessage'
import { useSelector } from 'react-redux'


const ContactPage = dynamic(() => import('../components/Book/Contact'), { ssr: false })

export default function DuckMePage() {
return (
<div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
<ContactPage/>
</div>
)
}