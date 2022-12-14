import {
	CLEAR_ALL_FILTERS,
	CREATE_NEW_TICKET,
	DELETE_TICKET,
	FILTER_TICKETS_BY_SEARCH,
	FILTER_TICKETS_BY_USERID,
	GET_TICKETS,
	REMOVE_USER_FILTER,
	UPDATE_TICKET,
} from "./tickets.types";

const INITIAL_STATE = {
	tickets: [],
	loading: true,
	filter: {
		user: [],
		epic: "",
		type: "",
		search: "",
	},
};

const ticketsReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_TICKETS:
			return {
				...state,
				tickets: payload,
				loading: false,
			};
		case CREATE_NEW_TICKET:
			return {
				...state,
				tickets: [...state.tickets, payload.data],
			};
		case DELETE_TICKET:
			return {
				...state,
				tickets: state.tickets.filter(
					(ticket) => ticket._id !== payload.ticketId
				),
			};
		case UPDATE_TICKET:
			return {
				...state,
				tickets: state.tickets.map((ticket) => {
					if (ticket._id === payload.ticketId) {
						return {
							...ticket,
							...payload.data,
						};
					}
					return ticket;
				}),
			};
		case FILTER_TICKETS_BY_USERID:
			return {
				...state,
				filter: {
					...state.filter,
					user: [...state.filter.user, payload],
				},
			};
		case FILTER_TICKETS_BY_SEARCH:
			return {
				...state,
				filter: {
					...state.filter,
					search: payload,
				},
			};
		case REMOVE_USER_FILTER:
			return {
				...state,
				filter: {
					...state.filter,
					user: state.filter.user.filter(
						(userId) => userId !== payload
					),
				},
			};
		case CLEAR_ALL_FILTERS:
			return {
				...state,
				filter: INITIAL_STATE.filter,
			};
		default:
			return state;
	}
};

export default ticketsReducer;
