import { createSlice } from "@reduxjs/toolkit";
import { generateMaze, findRandomEmptyCell } from "../../configMaze";
import { GAME_CONFIG } from "../../configMaze";

// Fonction pour créer l'état initial du jeu
const createInitialState = () => ({
  maze: generateMaze(GAME_CONFIG.MAZE_SIZE),
  objectPosition: findRandomEmptyCell(generateMaze(GAME_CONFIG.MAZE_SIZE)),
  playerPosition: { x: 1.5, y: GAME_CONFIG.PLAYER_HEIGHT, z: 1.5 },
  score: 0,
  isGameOver: false,
  isGameWon: false,
});

const initialState = createInitialState();

// Création du slice Redux pour le jeu "Find Me"
const findMeSlice = createSlice({
  name: "findMe",
  initialState,
  reducers: {
    // Met à jour la position du joueur
    updatePlayerPosition(state, action) {
      state.playerPosition = action.payload;
    },
    // Gère la collecte d'un objet
    collectObject(state) {
      state.score += 1;
      state.isGameWon = true;
    },
    // Termine le jeu
    endGame(state) {
      state.isGameOver = true;
    },
    // Réinitialise le jeu à son état initial
    resetGame() {
      return createInitialState();
    },
  },
});

// Export des actions générées automatiquement par createSlice
export const { updatePlayerPosition, collectObject, endGame, resetGame } =
  findMeSlice.actions;

// Sélecteurs pour accéder facilement à différentes parties de l'état
export const selectMaze = (state) => state.findMe.maze;
export const selectObjectPosition = (state) => state.findMe.objectPosition;
export const selectPlayerPosition = (state) => state.findMe.playerPosition;
export const selectScore = (state) => state.findMe.score;
export const selectIsGameOver = (state) => state.findMe.isGameOver;
export const selectIsGameWon = (state) => state.findMe.isGameWon;

// Export du reducer
export default findMeSlice.reducer;
