import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
  name: "lang",
  initialState: {
    langConfig: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.langConfig = action.payload;
    },
  },
});
export const { changeLanguage } = langSlice.actions;
export default langSlice.reducer;
