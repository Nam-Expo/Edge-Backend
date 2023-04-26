import { Pool } from "pg";
import { Kysely, PostgresDialect, Generated, ColumnType, Selectable, Insertable, Updateable } from "kysely";

export const insertPost = async (db: Kysely<Database>, post: PostDB) => {
    await db
        .insertInto("post")
        .values(post)
        .execute();
};

export const insertComment = async (db: Kysely<Database>, comment: CommentDB) => {
    await db
        .insertInto("comment")
        .values(comment)
        .execute();
};

export const insertOrganization = async (db: Kysely<Database>, organization: OrganizationDB) => {
    await db
        .insertInto("organization")
        .values(organization)
        .execute();
};

export const insertServer = async (db: Kysely<Database>, server: ServerDB) => {
    await db
        .insertInto("server")
        .values(server)
        .execute();
};

export const insertUser = async (db: Kysely<Database>, user: UserDB) => {
    await db
        .insertInto("user")
        .values(user)
        .execute();
};
