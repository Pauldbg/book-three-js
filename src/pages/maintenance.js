import dynamic from 'next/dynamic' // Charge le composant à la demande

const HomePage = dynamic(() => import('../components/Book/HomePage'), { ssr: false }) 

export default function MaintenancePage() {

    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <HomePage />
      </div>
    )
  }