import type {} from "";

declare global {
    type AccountType = "Organization" | "Server" | "User";
    type UID = string;
    type ID = string;

    type AccountInfo = {
        uid: UID;
        accountType: AccountType;
        name: string;
    };

    type OrganizationDB = {
        uid: AccountInfo.uid;
        description: string;
    };

    type ServerDB = {
        uid: AccountInfo.uid;
        organization: UID;
    };

    type UserDB = {
        uid: AccountInfo.uid;
        following: Array<UID>;
    };

    type PostDB = {
        owner: UID;
        caption: string;
        image: Blob;
        likes: Array<UID>;
        comments: Array<UID>;
    };

    type CommentDB = {
        postKey: PostDB.key;
        owner: UID;
        text: string;
        likes: Array<UID>;
    };

    type ImageDB = {
        uid: AccountInfo.UID;
        profileImage: Blob;
        backgroundImage: Blob;
    };

    interface Database {
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
