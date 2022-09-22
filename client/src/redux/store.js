import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunkMiddleware from "redux-thunk";
import setAuthToken from "../shared/utils/setAuthToken";
import rootReducer from "./root-reducer";

const middleware = [thunkMiddleware];

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
let currentState = store.getState();

store.subscribe(() => {
	// keep track of the previous and current state to compare changes
	const previousState = currentState;
	currentState = store.getState();
	// if the token changes set the value in localStorage and axios headers
	if (previousState.auth.token !== currentState.auth.token) {
		const token = currentState.auth.token;
		setAuthToken(token);
	}
});

export default store;
