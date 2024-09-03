
import Head from 'next/head'
import dynamic from 'next/dynamic' // Charge le composant à la demande

const RetroHome = dynamic(() => import('../components/Home/RetroHome'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Book de paul dubois gance</title>
        <meta name="book de paul dubois gance" content="Portfolio de développeur inspiré du style rétro des jeux vidéo" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      <RetroHome />
    </>
  )
}














