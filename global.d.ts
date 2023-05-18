import type {} from "";

declare global {
	type AccountType = "Organization" | "Server" | "User";
	type UID = string;
	type ID = string;

	type AccountInfo = {
		uid: UID;
		accountType: AccountType;
	};

	//-----------------------------------------

	type OrganizationDB = {
		uid: AccountInfo.uid;
		name: string;
		location: string;
		description: string;
	};

	type GetOrganization = {
		name: string;
		location: string;
		description: string;
		profileImage: Blob;
		backgroundImage: Blob;
	};

	//-----------------------------------------

	type ServerDB = {
		uid: AccountInfo.uid;
		name: string;
		organization: UID;
	};

	type UserDB = {
		uid: AccountInfo.uid;
		name: string;
		following: Array<UID>;
	};

	//-----------------------------------------

	type PostDB = {
		key: string;
		owner: UID;
		caption: string;
		image: Blob;
		likes: Array<UID>;
		comments: Array<UID>;
	};

	type GetPost = {
		owner: UID;
		caption: string;
		image: Blob;
		likes: Array<UID>;
		comments: Array<UID>;
	};

	//-----------------------------------------

	type CommentDB = {
		key: string;
		postKey: PostDB.key;
		owner: UID;
		text: string;
		likes: Array<UID>;
	};

	type GetComment = {
		owner: UID;
		text: string;
		likes: Array<UID>;
	};

	type PostComment = {
		postKey: PostDB.key;
		owner: UID;
		text: string;
	};

	//-----------------------------------------

	type FollowersDB = {
		uid: AccountInfo.uid;
		followingID: uid;
	};

	//-----------------------------------------

	type ImageDB = {
		uid: AccountInfo.UID;
		profileImage: Blob;
		backgroundImage: Blob;
	};

	interface Database {
		followers: FollowersDB;
		organization: OrganizationDB;
		server: ServerDB;
		user: UserDB;
		post: PostDB;
		comment: CommentDB;
		image: ImageDB;
	}

	type Connection = {
		user: string;
		host: string;
		password: string;
		port: string;
	};
}
