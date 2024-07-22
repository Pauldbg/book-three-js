import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import RetroLoading from './RetroLoading';

// Définit le temps de chargement minimum pour la page d'accueil (en millisecondes)
const MINIMUM_LOADING_TIME = 2000;

// Hook personnalisé pour gérer l'état de chargement
const useLoadingState = () => {
  // État pour suivre si la page est en cours de chargement
  const [loading, setLoading] = useState(true);
  // Utilise le router de Next.js pour accéder aux informations de navigation
  const router = useRouter();

  useEffect(() => {
    let timer;

    // Fonction pour démarrer le chargement
    const startLoading = () => {
      setLoading(true);
      clearTimeout(timer); // Annule tout timer de fin de chargement en cours
    };

    // Fonction pour arrêter le chargement
    const stopLoading = () => {
      if (router.pathname === '/') {
        // Si c'est la page d'accueil, applique le délai minimum avant de finir le chargement
        timer = setTimeout(() => {
          setLoading(false);
        }, MINIMUM_LOADING_TIME);
      } else {
        // Pour les autres pages, arrête le chargement immédiatement
        setLoading(false);
      }
    };

    // Démarre le chargement initial
    startLoading();
    stopLoading();

    // Ajoute des écouteurs d'événements pour les changements de route
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    router.events.on('routeChangeError', stopLoading);

    // Fonction de nettoyage pour enlever les écouteurs d'événements
    // et annuler les timers en cours lors du démontage du composant
    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
      router.events.off('routeChangeError', stopLoading);
      clearTimeout(timer);
    };
  }, [router]); // Dépendance du useEffect

  // Retourne l'état de chargement actuel
  return loading;
};

// Composant wrapper pour gérer l'affichage du chargement
export const LoadingWrapper = ({ children }) => {
  // Utilise le hook personnalisé pour obtenir l'état de chargement
  const isLoading = useLoadingState();
  // État pour contrôler quand le contenu doit être rendu
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Ajoute un petit délai avant de rendre le contenu pour une transition fluide
      const timer = setTimeout(() => setShouldRender(true), 100);
      // Fonction de nettoyage pour annuler le timer si le composant est démonté
      return () => clearTimeout(timer);
    }
  }, [isLoading]); // Dépendance du useEffect

  return (
    <div className={`min-h-screen bg-black ${isLoading ? '' : 'loaded'}`}>
      {/* Affiche le composant de chargement si isLoading est true */}
      {isLoading && <RetroLoading />}
      {/* Conteneur pour le contenu principal avec transition d'opacité */}
      <div className={`transition-opacity duration-300 ${shouldRender ? 'opacity-100' : 'opacity-0'}`}>
        {/* Rend le contenu enfant seulement si shouldRender est true */}
        {shouldRender && children}
      </div>
    </div>
  );
};

export default LoadingWrapper;