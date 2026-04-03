// --------------------- CORE FUNCTIONALITY WITH REDUX ONLY or WITHOUT REDUX TOOLKIT ---------------------- //

// import { createStore } from "redux";

// const InitialState =  { counter: 0, showCounter: true }

// const counterReducer = (state =InitialState, action) => {
// 	// state: current state, action: dispatched action

// 	// this will replace and update the old state
// 	if (action.type === "increment") {
// 		return { counter: state.counter + 1, showCounter: state.showCounter };
// 	} else if (action.type === "decrement") {
// 		return { counter: state.counter - 1, showCounter: state.showCounter };
// 	} else if (action.type === "increase") {
// 		return {
// 			counter: state.counter + action.amount,
// 			showCounter: state.showCounter,
// 		}; // you can replace amount with any variable name
// 	} else if (action.type === "toggleCounter") {
// 		return { counter: state.counter, showCounter: !state.showCounter };
// 	} else {
// 		return state;
// 	}
// };

// const store = createStore(counterReducer);

// export default store;

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterStore = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter = state.counter + action.payload;
		},
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	},
});

const store = configureStore({
	reducer: {
		counter: counterStore.reducer,
	},
});

export const counterActions = counterStore.actions;

export default store;
