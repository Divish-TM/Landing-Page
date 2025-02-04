import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import sessionReducer from './sessionSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    session: sessionReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
