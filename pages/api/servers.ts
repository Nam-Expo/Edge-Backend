import type { RequestContext } from "@vercel/edge";
import handler from "../../src/handling/edgeFunctionHandler";
import { postBody, getParams } from "../../src/handling/validations/Servers";
import { Kysely } from "kysely";

export const config = {
	runtime: "edge",
};

export default function user(request: Request, context: RequestContext) {
	let params = new URL(request.url).searchParams;

	return handler<Servers>({
		postBodyValidator: postBody,
		postParamValidator: getParams,
		db: true,
	})({
		request,
		get: async (db) => {
			const serverId = params.get("serverId");

			let user = await (db as Kysely<Database>)
				.selectFrom("Servers")
				.selectAll()
				.where("Servers.id", "=", serverId)
				.execute();

			return new Response(JSON.stringify(user), {
				status: 200,
			});
		},
		post: async (body, db) => {
			await (db as Kysely<Database>)
				.insertInto("Servers")
				.values({
					id: body.id,
					name: body.name,
					organization: body.organization,
					backgroundImage: body.backgroundImage,
					profileImage: body.profileImage,
				})
				.execute();
			return new Response(`OK`);
		},
	});
}
