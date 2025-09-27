import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goals: [
        {
            text: "Reduce campus traffic and carbon footprint through efficient ride-sharing."
        },
        {
            text: "Foster a community of trust and cooperation among college students."
        },
        {
            text: "Leverage AI-powered matching to provide the best ride options quickly."
        },
        {
            text: "Provide seamless navigation and communication features integrated within the app."
        }
    ],
    services: [
        {
            heading: "Smart Ride Matching",
            text: "Our advanced machine learning algorithm connects riders and drivers efficiently, saving time and money."
        },
        {
            heading: "Real-Time Navigation",
            text: "Integrated Maps navigation helps you reach your destination safely with live ETA and route updates."
        },
        {
            heading: "Secure Ride Sharing",
            text: " Communicate directly with your ride partners and rate your experience to maintain a trusted community."
        }
    ]
}

const peerRideSlice = createSlice({
    name: "peerRide",
    initialState,
    reducers: {}
});

export default peerRideSlice.reducer;