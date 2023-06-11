import z, { object } from "zod";
import SQLSanatize from "./security/sanatize";
import { getPool, init } from "../database/init";
import { Kysely } from "kysely";
import { Pool } from "@neondatabase/serverless";

export async function* streamGenerator(
	reader: ReadableStreamDefaultReader<Uint8Array>
) {
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		} else {
			yield value;
		}
	}
}

const sanatizeObject = (object: Object) => {
	for (const value of Object.values(object)) {
		if (typeof value !== "object") {
			SQLSanatize(value as string);
		} else {
			sanatizeObject(value);
		}
	}
};

export default function handler<BodyType>({
	postBodyValidator,
	postParamValidator,
	getParamValidator,
	db,
	pool,
}: {
	postBodyValidator?: z.ZodObject<any>;
	getParamValidator?: z.ZodObject<any>;
	postParamValidator?: z.ZodObject<any>;
	db?: boolean;
	pool?: boolean;
}) {
	return async ({
		request,
		post,
		get,
	}: {
		request: Request;
		post: (
			body: BodyType,
			db?: Kysely<Database> | Pool
		) => Promise<Response>;
		get: (db?: Kysely<Database> | Pool) => Promise<Response>;
	}) => {
		if (request.method === "POST") {
			let body = await request.json();
			let params = new URL(request.url).searchParams;

			if (postParamValidator) {
				try {
					postParamValidator.parse(Object.fromEntries(params));
				} catch {
					return new Response("bad params", {
						status: 500,
					});
				}
			}

			if (postBodyValidator) {
				try {
					postBodyValidator.parse(body);
				} catch {
					return new Response("bad body", {
						status: 500,
					});
				}

				try {
					sanatizeObject(body);
				} catch {
					return new Response("text error", {
						status: 500,
					});
				}
			}
			let database;

			if (db) {
				database = pool ? await getPool() : await init();
			}
			try {
				return await post(body as BodyType, database);
			} catch (error) {
				return new Response(
					"bad POST method" + (error as Error).toString(),
					{
						status: 500,
					}
				);
			}
		}
		if (request.method === "GET") {
			const params = new URL(request.url).searchParams;

			if (getParamValidator) {
				try {
					getParamValidator.parse(Object.fromEntries(params));
				} catch {
					return new Response("bad params", {
						status: 500,
					});
				}

				try {
					sanatizeObject(Object.fromEntries(params));
				} catch {
					return new Response("text error", {
						status: 500,
					});
				}
			}

			let database;

			if (db) {
				database = pool ? await getPool() : await init();
			}
			try {
				return await get(database);
			} catch {
				return new Response("bad GET method", {
					status: 500,
				});
			}
		} else {
			return new Response("bad request method", {
				status: 500,
			});
		}
	};
}
