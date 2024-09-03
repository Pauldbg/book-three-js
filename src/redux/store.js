import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/stuckMe';  // 
import findMeReducer from './reducers/findMeSlice';  // 

export const store = configureStore({
  reducer: {
    game: gameReducer,
    findMe: findMeReducer,
  },
});