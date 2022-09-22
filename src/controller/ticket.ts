import { NextFunction, Request, Response } from "express";
import Project from "../models/project";
import Ticket from "../models/ticket";

// Get tickets overview collection of the project.
const getTicketsByProjectId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const tickets = await Ticket.find({ projectId: req.params.project_id });
		res.json(tickets);
	} catch (err) {
		res.status(400).json("Error: " + err);
	}
};

//Create a new ticket of the project.
const createTicket = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const formData = req.body;
		const { projectId } = formData;
		const project = await Project.findById(projectId);

		if (!project) return res.status(400).send("Project not found.");

		const updatedSeq = ++project.seq;
		// Update a sequence value of the project.
		project.seq = updatedSeq;
		// Assign a key of the ticket.
		formData.key = updatedSeq;
		//Create a new ticket.
		const newTicket = new Ticket(formData);

		// Save on db.
		const savedNewTicket = await newTicket.save();
		await project.save();

		res.json(savedNewTicket);
	} catch (err) {
		res.status(400).send(err);
	}
};

// Delete a ticket of the id.
const deleteTicket = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);
		res.json(ticket);
	} catch (err) {
		res.status(400).send(err);
	}
};

// Update an existing ticket of the project.
const updateTicket = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const ticketId = req.params.id;
	const { field, value } = req.body;

	// Check the requested body's format is valid.
	if (!field) {
		res.status(400).send("Invalid submission");
	}

	try {
		const updatedTicket = await Ticket.findOneAndUpdate(
			{ _id: ticketId },
			{ $set: { [field]: value } },
			{ new: true, runValidators: true }
		);
		res.json(updatedTicket);
	} catch (err) {
		res.status(400).send(err);
	}
};

export default {
	getTicketsByProjectId,
	createTicket,
	deleteTicket,
	updateTicket,
};
