import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { user: userReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
