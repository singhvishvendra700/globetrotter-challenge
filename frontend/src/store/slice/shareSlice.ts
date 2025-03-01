import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShareState } from "../../interface/interface";

const initialState: ShareState = {
  image: null,
};

const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
  },
});

export const { setImage } = shareSlice.actions;
export default shareSlice.reducer;
