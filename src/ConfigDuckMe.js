export const GAME_CONFIG = {
    GAME_WIDTH: 6, // : Cette constante définit la largeur totale de notre terrain de jeu. Nous avons choisi 6 unités, mais possibilité d'ajuster cette valeur selon vos préférences
    PLAYER_BOUNDS: 3 - 0.5, // La moitié de GAME_WIDTH moins la moitié de la largeur du joueur
    OBSTACLE_SPEED: { // vitesse des obstacles 
      MIN: 5,
      MAX: 9
    },
    // Ajoutez d'autres configurations de jeu ici au besoin
  };