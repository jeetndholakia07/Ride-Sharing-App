import { configureStore } from "@reduxjs/toolkit";
import paginationData from "../paginationSlice.js";
import peerRideSlice from "../peerRideSlice.js";

export const store = configureStore({
    reducer: {
        paginationState: paginationData,
        peerRide: peerRideSlice
    }
});

// Types for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;