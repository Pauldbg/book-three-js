import dynamic from 'next/dynamic' // Charge le composant à la demande

const Test = dynamic(() => import('../components/Book-finalversion/HomePage'), { ssr: false }) 

export default function TestPage() {

    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Test />
      </div>
    )
  }