import mongoose, { Schema, Document } from "mongoose";
import { FormField, formFieldSchema } from "./FormConfig";

interface ClientDocument extends Document {
	name: string;
	industry: string;
	logo?: string;
	bgColor?: string;
	textColor?: string;
	additionalFields: {
		[step: string]: FormField[]; // Each step (e.g., "step_1", "step_2") maps to an array of additional fields
	};
}

const clientSchema = new Schema<ClientDocument>(
	{
		name: { type: String, required: true },
		industry: { type: String, required: true },
		logo: { type: String },
		bgColor: { type: String },
		textColor: { type: String },
		additionalFields: {
			type: Object, // Changed from Map to Object
			default: {},
		},
	},
	{ timestamps: true }
);

export default mongoose.model<ClientDocument>("Client", clientSchema);
