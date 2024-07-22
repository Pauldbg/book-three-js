import dynamic from 'next/dynamic' // Charge le composant à la demande

const SimsGame = dynamic(() => import('../components/SimsWorld/World'), { ssr: false }) 

export default function SimsPage() {
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <SimsGame />
      </div>
    )
  }