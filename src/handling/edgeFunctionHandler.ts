import z, { object } from "zod";
import SQLSanatize from "./security/sanatize";
import Init from "../database/initialize/init";
import { Kysely } from "kysely";

const sanatizeObject = (object: Object) => {
	for (const value of Object.values(object)) {
		if (typeof value !== "object") {
			SQLSanatize(value as string);
		} else {
			sanatizeObject(value);
		}
	}
};

const getDb = (request: Request) => {
	const region = request.headers.get("x-vercel-ip-city");
    
	const ENV = process.env as NodeJS.ProcessEnv;

	if (ENV) {
		return Init({
			user: ENV.DB_USER,
			host: ENV.DB_HOST,
			password: ENV.DB_PASSWORD,
			port: DB_PORT,
		});
	} else {
		throw Error("500");
	}
};

export default function handler({
	postBodyValidator,
	paramValidator,
	db,
}: {
	postBodyValidator: z.ZodObject<any>;
	paramValidator: z.ZodObject<any>;
	db: boolean;
}) {
	return async ({
		request,
		post,
		get,
	}: {
		request: Request;
		post: (body: any, db?: Kysely<Database>) => Promise<Response>;
		get: (params: URLSearchParams, db?: Kysely<Database>) => Promise<Response>;
	}) => {
		if (request.method === "POST") {
			let body = await request.json();

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

			let database;

			if (db) {
				database = getDb(request);
			}

			return await post(body, database);
		}
		if (request.method === "GET") {
			const params = new URL(request.url).searchParams;

			try {
				paramValidator.parse(Object.fromEntries(params));
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

			let database;

			if (db) {
				database = getDb(request);
			}

			return await get(params, database);
		} else {
			return new Response("bad request method", {
				status: 500,
			});
		}
	};
}
