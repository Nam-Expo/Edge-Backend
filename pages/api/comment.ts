import type { RequestContext } from "@vercel/edge";
import handler from "../../src/handling/edgeFunctionHandler";
import { postBody, getParams } from "../../src/handling/validations/Post";
import { Kysely } from "kysely";

export const config = {
	runtime: "edge",
};

export default function user(request: Request, context: RequestContext) {
	let params = new URL(request.url).searchParams;

	return handler<Posts>({
		postBodyValidator: postBody,
		postParamValidator: getParams,
		db: true,
	})({
		request,
		get: async (db) => {
			const postKey = params.get("postKey") as string;

			let user = await (db as Kysely<Database>)
				.selectFrom("Posts")
				.selectAll()
				.where("Posts.key", "=", parseInt(postKey))
				.execute();

			return new Response(JSON.stringify(user), {
				status: 200,
			});
		},
		post: async (getBody, db) => {
			let body = await getBody();

			await (db as Kysely<Database>)
				.insertInto("Posts")
				.values({
					owner: body.owner,
					caption: body.caption,
					image: body.image,
					likes: [],
					comments: [],
				})
				.execute();
			return new Response(`OK`);
		},
	});
}
