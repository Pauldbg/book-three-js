// Configuration globale du jeu
export const GAME_CONFIG = {
  MAZE_SIZE: 20, // Taille du labyrinthe (20x20 cellules)
  PATH_WIDTH: 1.5, // Nouvelle constante : Largeur des chemins (nombre impair recommandé)
  WALL_THICKNESS: 1, // Nouvelle constante : Épaisseur des murs
  PLAYER_HEIGHT: 1.3, // Hauteur de la caméra du joueur
  PLAYER_SPEED: 3, // Vitesse de déplacement du joueur
  PLAYER_RADIUS: 0.4, // Rayon du joueur pour les collisions
  WALL_HEIGHT: 2, // Hauteur des murs du labyrinthe
  JUMP_FORCE: 5, // Force de saut
  GRAVITY: -9.8, // Gravité
  MAX_JUMP_HEIGHT: 2, // Hauteur maximale du saut
  ENEMY_SPEED: 2,
  ENEMY_RADIUS: 0.3,
  COLORS: {
    WALL: "#8b4513", // Couleur des murs (marron)
    GROUND: "#4caf50", // Couleur du sol (vert)
    OBJECT: "gold", // Couleur de l'objet à collecter
  },
  PLAYER_ACCELERATION: 20, // Accélération du joueur
  FRICTION: 0.2, // Friction (0 = pas de friction, 1 = arrêt immédiat)
  MAX_SPEED: 5, // Vitesse maximale du joueur
};

export function generateMaze() {
  return [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
}

export function findStartPosition(maze) {
  // Cherche une position de départ avec un chemin ouvert devant
  for (let z = 0; z < maze.length; z++) {
    for (let x = 0; x < maze[z].length; x++) {
      if (maze[z][x] === 0) {
        // Vérifie si la cellule à droite est un chemin
        if (x < maze[z].length - 1 && maze[z][x + 1] === 0) {
          return { x, z, direction: "right" };
        }
        // Vérifie si la cellule en bas est un chemin
        if (z < maze.length - 1 && maze[z + 1][x] === 0) {
          return { x, z, direction: "down" };
        }
      }
    }
  }
  // Position par défaut si aucune position appropriée n'est trouvée
  return { x: 1, z: 1, direction: "right" };
}

export function findRandomEmptyCell(maze) {
  const emptyCells = [];
  for (let z = 0; z < maze.length; z++) {
    for (let x = 0; x < maze[z].length; x++) {
      if (maze[z][x] === 0) {
        emptyCells.push({ x, z });
      }
    }
  }
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}
