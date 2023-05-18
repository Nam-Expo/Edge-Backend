import z from "zod";

export const postBody = z.object({
	postKey: z.string(),
	owner: z.string(),
	text: z.string(),
});

export const getParams = z.object({
	postKey: z.string(),
});
