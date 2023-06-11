import all, { Pool } from "@neondatabase/serverless";
import { Kysely, PostgresDialect } from "kysely";
import { get } from "@vercel/edge-config";

const connectionString = get("DB_CONN_STRING");

export const init = async function () {
	const pool = new Pool({
		connectionString: (await connectionString) as string,
		database: "neondb",
	});
	return new Kysely<Database>({
		dialect: new PostgresDialect({ pool }),
	});
};

export const getPool = async () => {
	return new Pool({
		connectionString: (await connectionString) as string,
		database: "neondb",
	});
};
