import { createSlice } from '@reduxjs/toolkit';
import { GAME_CONFIG } from '../../ConfigDuckMe';

const initialState = {
  score: 0,
  playerPosition: [0, 0.5, 0],
  obstacles: [  
    { id: 1, position: [GAME_CONFIG.PLAYER_BOUNDS, 1, -10], speed: 5 },
    { id: 2, position: [-GAME_CONFIG.PLAYER_BOUNDS, 1, -20], speed: 7 },
    { id: 3, position: [0, 1, -30], speed: 6 },
    { id: 4, position: [GAME_CONFIG.PLAYER_BOUNDS / 2, 1, -40], speed: 8 },
    { id: 5, position: [-GAME_CONFIG.PLAYER_BOUNDS / 2, 1, -50], speed: 5 },
  ],
  gameTime: 0,
  isGameOver: false,
};

export const gameSlice = createSlice({
  name: 'game', // nom du slice
  initialState,
  reducers: {   // reducers est un objet contenant des fonctions qui définissent comment l'état doit changer en réponse aux actions
    updateScore: (state, action) => {
      state.score = action.payload;
    },
    updatePlayerPosition: (state, action) => {
      state.playerPosition = action.payload;
    },
    updateObstacles: (state, action) => {
      state.obstacles = action.payload;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
    },
    incrementGameTime: (state) => {
      //Incrémente à la fois le temps de jeu et le score
      // Seulement si le jeu n'est pas terminé
      if (!state.isGameOver) {
        state.gameTime += 1;
        state.score += 1;
      }
    },
    resetGame: () => initialState,
  },
  
});

export const {
  updatePlayerPosition,
  updateObstacles,
  incrementGameTime,
  setGameOver,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;