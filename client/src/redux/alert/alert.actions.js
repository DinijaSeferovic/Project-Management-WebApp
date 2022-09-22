import short from "short-uuid";
import { REMOVE_ALERT, SET_ALERT } from "./alert.types";

export const setAlert =
	(msg, alertType, timeout = 5000) =>
	(dispatch) => {
		const id = short.generate();

		dispatch({
			type: SET_ALERT,
			payload: { msg, alertType, id },
		});

		setTimeout(
			() => dispatch({ type: REMOVE_ALERT, payload: id }),
			timeout
		);
	};
