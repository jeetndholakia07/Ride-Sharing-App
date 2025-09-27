import { createSlice } from "@reduxjs/toolkit";

interface paginationState {
    pageNo: number;
    pageLimit: number;
}

const initialState: paginationState = {
    pageNo: 1,
    pageLimit: 5
}

const paginationData = createSlice({
    name: "paginationData",
    initialState,
    reducers: {}
});

export default paginationData.reducer;