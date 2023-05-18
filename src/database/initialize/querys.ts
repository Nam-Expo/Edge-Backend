import { Client } from '@neondatabase/serverless';

export const createOrganization = (client: Client) => {
    return client.query(`
        CREATE TABLE Organization (
            uid          VARCHAR(30)  PRIMARY KEY,
            description  VARCHAR(255) NOT NULL
        );`
    );
};


export const createServer = (client: Client) => {
    return client.query(`
        CREATE TABLE Server (
            uid           VARCHAR(30)  PRIMARY KEY,
            organization  VARCHAR(12)  NOT NULL
        );`
    );
};

export const createUser = (client: Client) => {
    return client.query(`
        CREATE TABLE User (
            uid           VARCHAR(30)    PRIMARY KEY,
            following     VARCHAR(30) [] NOT NULL
        );`
    );
};

export const createPost = (client: Client) => {
    return client.query(`
        CREATE TABLE Post (
            key         SERIAL         UNIQUE,
            owner       VARCHAR(30)    NOT NULL,
            caption     VARCHAR(255)   NOT NULL,
            image       Blob,
            likes       VARCHAR(30) [] NOT NULL,
            following   VARCHAR(30) [] NOT NULL,
            comments    VARCHAR(30) [] NOT NULL
        );`
    );
};

export const createComment = (client: Client) => {
    return client.query(`
        CREATE TABLE Comment (
            postKey   VARCHAR(30)    PRIMARY KEY,
            owner     VARCHAR(30)    NOT NULL,
            text      VARCHAR(255)   NOT NULL,
            likes     VARCHAR(30) [] NOT NULL,
            FOREIGN KEY (postKey) REFERENCES Post(key)
        );`
    ); 
};

export const createImage = (client: Client) => {
    return client.query(`
        CREATE TABLE Images (
            owner             VARCHAR(30)   NOT NULL,
            profileImage      Blob          NOT NULL,
            backgroundImage   Blob          NOT NULL
        );`
    ); 
};

