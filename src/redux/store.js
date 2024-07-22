import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/gameReducer';  // 
import findMeReducer from './reducers/findMeSlice';  // 

export const store = configureStore({
  reducer: {
    game: gameReducer,
    findMe: findMeReducer,
  },
});