import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    data: number,
    title:string
}

const initialState: CounterState={
    data: 0,
    title: "YARC (Yet Another redux counter with toolkit)"
}

export const CounterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incrementCounter: (state, action) => {
            //state.data = state.data + action.payload;
            state.data += action.payload;
        },
        decrementCounter: (state, action) => {
            //state.data = state.data - action.payload;
            state.data -= action.payload;
        }
    }
});

export const { incrementCounter, decrementCounter } = CounterSlice.actions;