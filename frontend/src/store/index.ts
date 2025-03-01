import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slice/gameSlice";
import userReducer from "./slice/userSlice";
import shareReducer from "./slice/shareSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    share: shareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
