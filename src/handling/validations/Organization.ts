import z from "zod";

export const postBody = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().length(255),
	profileImage: z.number(),
	backgroundImage: z.number(),
});

export const getParams = z.object({
	organizationId: z.string(),
});
