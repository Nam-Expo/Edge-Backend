import { Pool } from "@neondatabase/serverless";
import { Kysely, PostgresDialect } from "kysely";
import { init } from "@/src/database/init";

export const config = {
	runtime: "edge",
};

export default async function dbTest() {
	try {
		let db = await init();

		await db.selectFrom("Servers").selectAll().execute();

		return new Response("ok", {
			status: 200,
		});
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify(e), {
			status: 500,
		});
	}
}
