import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  correctAnswers: number;
  incorrectAnswers: number;
}

const initialState: UserState = {
  correctAnswers: 0,
  incorrectAnswers: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    incrementCorrect: (state) => {
      state.correctAnswers += 1;
    },
    incrementIncorrect: (state) => {
      state.incorrectAnswers += 1;
    },
    resetScore: (state) => {
      state.correctAnswers = 0;
      state.incorrectAnswers = 0;
    },
  },
});

export const { incrementCorrect, incrementIncorrect, resetScore } =
  userSlice.actions;
export default userSlice.reducer;
