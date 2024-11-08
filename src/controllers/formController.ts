import { Request, Response } from "express";
import FormConfig, { FormField } from "../models/FormConfig";
import Client from "../models/Client";

export const getAllClients = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const clients = await Client.find({}); // Fetches all clients
		// console.log(clients[4])

		return res.json(clients); // Sends the clients as a JSON response
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

export const removeAllClients = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		await Client.deleteMany({});
		return res.json({ message: "All clients deleted" });
	} catch (error) {
		console.log("ERROR");
		return res.json({ message: "Some error occured" });
	}
};

// Fetch form config by industry
export const getClientForm = async (req: Request, res: Response) => {
	const { industry, clientId } = req.params;

	try {
		const currIndustryFormConfig = await FormConfig.findOne({ industry });
		if (!currIndustryFormConfig) {
			return res
				.status(404)
				.json({ message: "Form configuration not found" });
		}

		const client = await Client.findById(clientId);
		if (!client) {
			return res.status(404).json({ message: "Client not found" });
		}

		const formConfigObj = currIndustryFormConfig.toObject();
		const steps = formConfigObj.steps;
		console.log(steps);
		const additionalFields = client.additionalFields || {};

		const result = steps.map((step, i) => {
			const stepKey = `step_${i + 1}`;
			const currStepAdditionalFields = additionalFields[stepKey] || [];

			return {
				// _id: step._id,
				stepTitle: step.stepTitle,
				fields: [...step.fields, ...currStepAdditionalFields],
			};
		});

		const response = {
			clientId: clientId,
			name: client.name,
			formSteps: result,
		};

		res.json(response);
	} catch (error) {
		console.error("Error in getClientForm:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Handle form submission
export const submitForm = async (req: Request, res: Response) => {
	try {
		const formData = req.body;
		// Logic to handle form submission
		return res.json({
			message: "Form submitted successfully",
			data: formData,
		});
	} catch (error) {
		return res.status(500).json({ message: "Server error" });
	}
};
