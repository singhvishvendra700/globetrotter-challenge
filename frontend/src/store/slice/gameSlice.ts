import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "../../interface/interface";

const initialState: GameState = { score: 0 };

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    resetScore: (state) => {
      state.score = 0;
    },
  },
});

export const { incrementScore, resetScore } = gameSlice.actions;
export default gameSlice.reducer;
