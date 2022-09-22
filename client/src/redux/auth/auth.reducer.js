import {
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REFRESH_ERROR_MESSAGE,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REMOVE_TOKEN,
	USER_LOADED,
	USER_UPDATED,
} from "./auth.types";

const INITIAL_STATE = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	checkUserCredentials: false,
	user: null,
	errorMessage: undefined,
};

const authReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				checkUserCredentials: true,
				user: payload,
			};
		case USER_UPDATED:
			return {
				...state,
				user: payload,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				checkUserCredentials: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				checkUserCredentials: false,
			};
		case AUTH_ERROR:
			return {
				...state,
				checkUserCredentials: true,
			};
		case REGISTER_FAIL:
			return {
				...state,
				errorMessage: payload,
			};
		case LOGIN_FAIL:
			return {
				...state,
				errorMessage: payload,
			};
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
			};
		case REFRESH_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: undefined,
			};
		// @todo: Remove this if not used.
		case REMOVE_TOKEN:
			return {
				...state,
				token: null,
			};
		default:
			return state;
	}
};

export default authReducer;
