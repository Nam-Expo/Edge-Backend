import type { ColumnType } from "kysely";

declare global {
	type AccountType = "Organization" | "Server" | "User";
	type id = string;
	type ID = string;

	type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
		? ColumnType<S, I | undefined, U>
		: ColumnType<T, T | undefined, T>;

	interface Comments {
		key: Generated<number>;
		postKey: number | null;
		owner: string;
		text: string;
		likes: string[];
	}

	interface Images {
		key: Generated<number>;
		url: string;
		id: string;
		type: string;
	}

	interface Organizations {
		id: string;
		name: string;
		description: string;
		backgroundImage: number;
		profileImage: number;
	}

	interface Posts {
		key: Generated<number>;
		owner: string;
		caption: string;
		image: number;
		likes: string[];
		comments: string[];
	}

	interface Servers {
		id: string;
		organization: string;
		name: string;
		backgroundImage: number;
		profileImage: number;
	}

	interface Users {
		id: string;
		name: string;
		following: string[];
		backgroundImage: number;
		profileImage: number;
	}

	interface Database {
		Comments: Comments;
		Images: Images;
		Organizations: Organizations;
		Posts: Posts;
		Servers: Servers;
		Users: Users;
	}
}
