import api from "../../shared/utils/api";
import {
	updateColumnWithDeletedTicket,
	updateColumnWithNewTicket,
} from "../projects/projects.actions";
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

// Get tickets of the project.
export const getTicketsByProjectId = (projectId) => async (dispatch) => {
	try {
		const res = await api.get(`/tickets/${projectId}`);
		dispatch({
			type: GET_TICKETS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// Get all tickets of the organization.
export const getTicketsOfOrganization = (projectIds) => async (dispatch) => {
	let ticketsList = [];
	try {
		for (const projectId of projectIds) {
			const res = await api.get(`/tickets/${projectId}`);
			const ticketData = res.data;
			ticketsList = [...ticketsList, ...ticketData];
		}
		dispatch({
			type: GET_TICKETS,
			payload: ticketsList,
		});
		// console.log('dispatch')
	} catch (err) {
		console.log(err);
	}
};

// Create a new ticket.
export const createNewTicket = (formData, columnId) => async (dispatch) => {
	try {
		const res = await api.post("/tickets/create", formData);
		dispatch({
			type: CREATE_NEW_TICKET,
			payload: {
				data: res.data,
			},
		});
		// Update a certain column with a new ticket created.
		const newTicket = res.data;
		const projectId = newTicket.projectId;
		const ticketId = newTicket._id;
		dispatch(updateColumnWithNewTicket(projectId, ticketId, columnId));
	} catch (err) {
		console.log(err);
	}
};

// Create a new epic ticket.
export const createNewEpicTicket =
	(formData, childIssues) => async (dispatch) => {
		try {
			const res = await api.post("/tickets/create", formData);
			dispatch({
				type: CREATE_NEW_TICKET,
				payload: {
					data: res.data,
				},
			});
			// Link child issues with the epic.
			const epicId = res.data._id;
			childIssues.forEach((childIssueId) => {
				dispatch(
					updateTicket(childIssueId, {
						field: "linkedEpic",
						value: epicId,
					})
				);
			});
		} catch (err) {
			console.log(err);
		}
	};

// Update a ticket by id.
export const updateTicket = (ticketId, updatedValue) => async (dispatch) => {
	try {
		const res = await api.post(`/tickets/update/${ticketId}`, updatedValue);
		dispatch({
			type: UPDATE_TICKET,
			payload: {
				data: res.data,
				ticketId,
			},
		});
	} catch (err) {
		console.log(err);
	}
};

// Delete a ticket by id.
export const deleteTicket = (ticketId, columnId) => async (dispatch) => {
	try {
		const res = await api.delete(`/tickets/${ticketId}`);
		dispatch({
			type: DELETE_TICKET,
			payload: {
				ticketId,
			},
		});
		// Update column of the ticket after it's deleted.
		const deletedTicket = res.data;
		const projectId = deletedTicket.projectId;
		dispatch(updateColumnWithDeletedTicket(projectId, ticketId, columnId));
	} catch (err) {
		console.log(err);
	}
};

// Delete a ticket by id.
export const deleteEpicTicket = (ticketId, childIssues) => async (dispatch) => {
	try {
		const res = await api.delete(`/tickets/${ticketId}`);
		dispatch({
			type: DELETE_TICKET,
			payload: {
				ticketId,
			},
		});
		// Initiate linked epic field of child issues of the epic.
		childIssues.forEach((childIssueId) => {
			dispatch(updateTicket(childIssueId, { linkedEpic: null }));
		});
	} catch (err) {
		console.log(err);
	}
};

// Filter Tickets by user.
export const filterTicketsByUser = (userId) => async (dispatch) => {
	dispatch({
		type: FILTER_TICKETS_BY_USERID,
		payload: userId,
	});
};

// Filter Tickets by search input.
export const filterTicketsBySearch = (value) => async (dispatch) => {
	dispatch({
		type: FILTER_TICKETS_BY_SEARCH,
		payload: value,
	});
};

// Remove a user id from the user filter array.
export const removeUserFilter = (userId) => async (dispatch) => {
	dispatch({
		type: REMOVE_USER_FILTER,
		payload: userId,
	});
};

// Clear all filters.
export const clearAllFilters = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ALL_FILTERS,
	});
};
