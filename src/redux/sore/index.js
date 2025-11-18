import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/Counter.slice";
import productReducer from "../slice/Product.slice";

export const store = configureStore({
  reducer: { counterReducer, productReducer },
});