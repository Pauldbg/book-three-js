import dynamic from 'next/dynamic' // Charge le composant à la demande

const TestPage = dynamic(() => import('../components/Book/HomePage'), { ssr: false }) 

export default function Page() {

    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <TestPage />
      </div>
    )
  }