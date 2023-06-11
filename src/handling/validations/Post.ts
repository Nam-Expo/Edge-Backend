import z from "zod";

export const postBody = z.object({
	owner: z.string(),
	caption: z.string(),
	image: z.number(),
	likes: z.array(z.string()),
	comments: z.array(z.string()),
});

export const getParams = z.object({
	postKey: z.number(),
});
