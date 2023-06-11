import z from "zod";

export const postParams = z.object({
	id: z.string(),
	type: z
		.string()
		.refine(
			(value) => value === "profileImage" || value === "backgroundImage",
			{
				message:
					'Invalid image type. Allowed values are "profileImage" or "backgroundImage".',
			}
		),
});

export const getParams = z.object({
	key: z.string(),
});
