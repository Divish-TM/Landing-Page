import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionState } from "../types";

const initialState: SessionState = {
  userId: "",
  ip: "",
  status: false, // Default to offline
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<SessionState>) => {
      state.userId = action.payload.userId;
      state.ip = action.payload.ip;
      state.status = true; // Online when session starts
    },
    endSession: (state) => {
      state.userId = "";
      state.ip = "";
      state.status = false; // Offline when session ends
    },
  },
});

export const { startSession, endSession } = sessionSlice.actions;
export default sessionSlice.reducer;
