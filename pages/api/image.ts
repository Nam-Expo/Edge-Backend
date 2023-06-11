import { RequestContext } from "@vercel/edge";
import handler, {
	streamGenerator,
} from "../../src/handling/edgeFunctionHandler";
import { postParams, getParams } from "@/src/handling/validations/Images";
import { InsertResult, Kysely } from "kysely";
import createStream from "@/src/database/stream";
import { Pool } from "@neondatabase/serverless";
import { put, head } from "@vercel/blob";

export const config = {
	runtime: "edge",
};

export default function image(request: Request, context: RequestContext) {
	let params = new URL(request.url).searchParams;

	return handler({
		db: true,
		postParamValidator: postParams,
		getParamValidator: getParams,
	})({
		request,
		get: async (db) => {
			let key = params.get("key");

			const url = await (db as Kysely<Database>)
				.selectFrom("Images")
				.select("Images.url")
				.where("Images.key", "=", parseInt(key as string))
				.execute();

			return new Response(JSON.stringify(url), {
				status: 200,
			});
		},
		post: async (_, db) => {
			try {
				let type = params.get("type");
				let id = params.get("id");

				const { url } = { url: "dummy" };
				// await put(`${type}/${id}.png`, request.body, {
				// 	access: "private",
				// });

				let key = await (db as Kysely<Database>)
					.insertInto("Images")
					.values({ url, id: id as string, type: type as string })
					.returning("Images.key")
					.execute();

				return new Response(JSON.stringify(key));
			} catch (error: any) {
				console.log(error);
				if ("code" in error && error["code"] === "23505") {
					return new Response("Alreday exists", {
						status: 400,
					});
				} else {
					return new Response(JSON.stringify(error), {
						status: 400,
					});
				}
			}
		},
	});
}
