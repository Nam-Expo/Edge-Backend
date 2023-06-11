import z from "zod";

export const postBody = z.object({
	id: z.string(),
	name: z.string(),
	profileImage: z.number(),
	backgroundImage: z.number(),
});

export const getParams = z.object({
	userId: z.string(),
});
