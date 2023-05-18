import type { RequestContext } from "@vercel/edge";
import handler from "../../src/handling/edgeFunctionHandler";
import { postBody, getParams } from "../../src/handling/validations/Comment";
import { insertComment } from "../../src/database/insert/querys";
import { fetchComment } from "@/src/database/fetch/fetch";
import { Kysely } from "kysely";

export default function comment(request: Request, context: RequestContext) {
	return handler({ postBodyValidator: postBody, paramValidator: getParams, db: true })({
		request,
		get: async (params, db) => {
			const postkey = params.get("postKey");
			let comment = await fetchComment(db as Kysely<Database>, postkey as string);

			return new Response(JSON.stringify(comment), {
				status: 200,
			});
		},
		post: async (body: PostComment, db) => {
			try {
				await insertComment(db as Kysely<Database>, {
					key: crypto.randomUUID(),
					...body,
					likes: [],
				});
				return new Response(`OK`);
			} catch (error) {
				return new Response(`error`, {
					status: 500,
				});
			}
		},
	});
}
