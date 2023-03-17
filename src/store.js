import userReducer from "./Slices/userSlice";
import recipeReducer from "./Slices/recipeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
  },
});
