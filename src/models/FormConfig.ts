import mongoose, { Schema, Document } from "mongoose";

export interface FormField {
	type: string;
	label: string;
	id?: string;
	options?: string[];
	placeholder?: string;
	required?: boolean;
}

interface FormStep {
	stepTitle?: string; // Optional title or description for each step
	fields: FormField[];
}

interface FormConfigDocument extends Document {
	industry: string;
	steps: FormStep[]; // Each industry form will have multiple steps
}

export const formFieldSchema = new Schema<FormField>({
	type: { type: String, required: true },
	label: { type: String, required: true },
	id: { type: String },
	options: { type: [String], default: [] },
	placeholder: { type: String },
	required: { type: Boolean, default: false },
});

const formStepSchema = new Schema<FormStep>({
	stepTitle: { type: String },
	fields: { type: [formFieldSchema], required: true }, // Array of FormField for each step
});

const formConfigSchema = new Schema<FormConfigDocument>(
	{
		industry: { type: String, required: true },
		steps: { type: [formStepSchema], required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<FormConfigDocument>(
	"FormConfig",
	formConfigSchema
);
