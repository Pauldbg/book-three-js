import dynamic from 'next/dynamic' // Charge le composant à la demande

const TestPage = dynamic(() => import('../components/UI/Loading/RetroLoading'), { ssr: false }) 

export default function SimsPage() {
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <TestPage />
      </div>
    )
  }