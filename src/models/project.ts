import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/project";

const projectSchema = new Schema(
	{
		key: {
			type: String,
			required: true,
			trim: true,
		},
		orgId: {
			type: Schema.Types.ObjectId,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		members: {
			type: Array,
			required: true,
			minlength: 1,
		},
		columns: {
			type: Object,
			required: true,
			default: {
				"column-1": {
					id: "column-1",
					title: "TO DO",
					isDoneColumn: false,
					taskIds: [],
				},
				"column-2": {
					id: "column-2",
					title: "IN PROGRESS",
					isDoneColumn: false,
					taskIds: [],
				},
				"column-3": {
					id: "column-3",
					title: "IN REVIEW",
					isDoneColumn: false,
					taskIds: [],
				},
				"column-4": {
					id: "column-4",
					title: "DONE",
					isDoneColumn: true,
					taskIds: [],
				},
			},
		},
		columnOrder: {
			type: Array,
			required: true,
			default: ["column-1", "column-2", "column-3", "column-4"],
		},
		projectIconUrl: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		seq: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IProject>("Project", projectSchema);
