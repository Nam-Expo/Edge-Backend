import type { RequestContext } from "@vercel/edge";
import handler from "../../src/handling/edgeFunctionHandler";
import { postBody, getParams } from "../../src/handling/validations/User";
import { Kysely } from "kysely";

export const config = {
	runtime: "edge",
};

export default function user(request: Request, context: RequestContext) {
	let params = new URL(request.url).searchParams;

	return handler<Users>({
		postBodyValidator: postBody,
		getParamValidator: getParams,
		db: true,
	})({
		request,
		get: async (db) => {
			const userId = params.get("userId");
			let user = await (db as Kysely<Database>)
				.selectFrom("Users")
				.selectAll()
				.where("Users.id", "=", userId)
				.execute();
			return new Response(JSON.stringify(user), {
				status: 200,
			});
		},
		post: async (body, db) => {
			await (db as Kysely<Database>)
				.insertInto("Users")
				.values({
					id: body.id,
					name: body.name,
					following: [],
					backgroundImage: body.backgroundImage,
					profileImage: body.profileImage,
				})
				.execute();
			return new Response(`OK`);
		},
	});
}
