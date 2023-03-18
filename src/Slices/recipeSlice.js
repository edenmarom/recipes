import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeslist: "",
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    initRecipes: (state, action) => {
      state.recipeslist = action.payload;
    },
  },
});

export const { initRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
