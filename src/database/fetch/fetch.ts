import { Kysely } from "kysely";

const dbHandler = (promise: Promise<any>): Promise<any> => {
	return new Promise<any>((resolve, reject) => {
		promise
			.then((data) => {
				if (data) {
					resolve(data);
				} else {
					reject();
				}
			})
			.catch(reject);
	});
};

export const fetchComment = (db: Kysely<Database>, postKey: string): Promise<GetComment> => {
	return dbHandler(
		db
			.selectFrom("comment")
			.select("comment.likes")
			.select("comment.text")
			.select("comment.owner")
			.where("comment.postKey", "==", postKey)
			.executeTakeFirst()
	);
};

export const fetchPost = async (db: Kysely<Database>, postKey: string): Promise<GetPost> => {
	return dbHandler(
		db
			.selectFrom("post")
			.select("post.caption")
			.select("post.comments")
			.select("post.image")
			.select("post.likes")
			.select("post.owner")
			.where("post.key", "==", postKey)
			.executeTakeFirst()
	);
};

export const fetchOrganization = async (db: Kysely<Database>, uid: string): Promise<GetOrganization> => {
	return dbHandler(
		db
			.selectFrom("organization")
			.select("organization.description")
			.select("organization.uid")
			.select("organization.location")
			.select("organization.name")
			.where("organization.uid", "==", uid)
			.fullJoin("image", "image.uid", "organization.uid")
			.select("image.backgroundImage")
			.select("image.profileImage")
			.fullJoin("followers", "followers.uid", "organization.uid")
			.select("followers.followingID")
			.executeTakeFirst()
	);
};

export const fetchServer = async (db: Kysely<Database>, uid: string) => {
	return dbHandler(
		db
			.selectFrom("server")
			.select("server.name")
			.select("server.organization")
			.select("server.uid")
			.where("server.uid", "==", uid)
			.fullJoin("image", "image.uid", "server.uid")
			.select("image.backgroundImage")
			.select("image.profileImage")
			.executeTakeFirst()
	);
};

export const fetchtUser = async (db: Kysely<Database>, user: UserDB) => {
	return dbHandler(
		db
			.selectFrom("server")
			.select("server.name")
			.select("server.organization")
			.select("server.uid")
			.where("server.uid", "==", user)
			.fullJoin("image", "image.uid", "server.uid")
			.select("image.backgroundImage")
			.select("image.profileImage")
			.executeTakeFirst()
	);
};
