import { configureStore } from "@reduxjs/toolkit";
import peerRideSlice from "../slices/peerRideSlice.js";

export const store = configureStore({
    reducer: {
        peerRide: peerRideSlice
    }
});

// Types for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;