import z from "zod";

export const postBody = z.object({
	id: z.string(),
	name: z.string(),
	organization: z.string().length(30),
	profileImage: z.number(),
	backgroundImage: z.number(),
});

export const getParams = z.object({
	serverId: z.string(),
});
