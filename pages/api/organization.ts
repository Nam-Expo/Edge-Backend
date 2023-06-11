import type { RequestContext } from "@vercel/edge";
import handler from "../../src/handling/edgeFunctionHandler";
import {
	postBody,
	getParams,
} from "../../src/handling/validations/Organization";
import { Kysely } from "kysely";

export const config = {
	runtime: "edge",
};

export default function user(request: Request, context: RequestContext) {
	let params = new URL(request.url).searchParams;

	return handler<Organizations>({
		postBodyValidator: postBody,
		postParamValidator: getParams,
		db: true,
	})({
		request,
		get: async (db) => {
			const organizationId = params.get("organizationId");

			let user = await (db as Kysely<Database>)
				.selectFrom("Organizations")
				.selectAll()
				.where("Organizations.id", "=", organizationId)
				.execute();

			return new Response(JSON.stringify(user), {
				status: 200,
			});
		},
		post: async (body, db) => {
			await (db as Kysely<Database>)
				.insertInto("Organizations")
				.values({
					id: body.id,
					name: body.name,
					description: body.description,
					backgroundImage: body.backgroundImage,
					profileImage: body.profileImage,
				})
				.execute();
			return new Response(`OK`);
		},
	});
}
