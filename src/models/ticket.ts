import mongoose, { Schema } from "mongoose";
import { ITicket } from "../interfaces/ticket";

const ticketSchema = new Schema(
	{
		projectId: {
			type: Schema.Types.ObjectId,
			required: true,
			trim: true,
		},
		key: {
			type: Number,
			required: true,
			default: 0,
		},
		issueType: {
			type: String,
			required: true,
			trim: true,
		},
		issuePriority: {
			type: String,
			required: true,
			trim: true,
		},
		summary: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
		},
		assigneeId: {
			type: String,
			trim: true,
		},
		reporterId: {
			type: String,
			required: true,
			trim: true,
		},
		linkedEpic: {
			type: Schema.Types.ObjectId,
		},
		issueColor: {
			type: String,
		},
		dateRange: {
			type: Object,
		},
		dueDate: {
			type: Date,
		},
		columnId: {
			type: String,
		},
		completedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
		minimize: false,
	}
);

export default mongoose.model<ITicket>("Ticket", ticketSchema);
