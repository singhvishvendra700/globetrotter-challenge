import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slice/gameSlice";
import shareReducer from "./slice/shareSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    share: shareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
