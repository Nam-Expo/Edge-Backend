import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect } from "kysely";

export default function Init(connection: Connection) {
    return new Kysely<Database>({
        dialect: new PostgresDialect({
            pool: new Pool({
                ...connection,
                port: parseInt(connection.port),
            }),
        }),
    });
}
