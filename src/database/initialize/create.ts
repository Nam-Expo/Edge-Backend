// import { Client } from '@neondatabase/serverless';
// import promptly from "promptly";
// import { createComment, createImage, createOrganization, createPost, createServer, createUser } from "./querys";

// class Connection {
//     command = {
//         user: undefined,
//         host: undefined,
//         password: undefined,
//         port: undefined,
//     };
//     requests = ["user", "host", "password", "port"];
//     index = 0;
//     build: any;

//     constructor(build: any) {
//         this.build = build;
//         this.ask();
//     }

//     async ask() {
//         const name = await promptly.prompt(this.next() + ":");

//         this.update(name);
//     }

//     next() {
//         return this.requests[this.index];
//     }

//     update(attribute: string) {
//         //@ts-ignore
//         this.command[this.requests[this.index]] = attribute;
//         this.index = this.index + 1;
//         if (this.index === 4) {
//             this.build(this.command);
//         } else {
//             this.ask();
//         }
//     }
// }

// function Init() {
//     new Connection((connection: any) => {
//         const client = new Client(connection);

//         Promise.all([
//             createOrganization(client),
//             createServer(client),
//             createUser(client),
//             createPost(client),
//             createComment(client),
//             createImage(client),
//         ])
//             .then(() => {
//                 console.log("done");
//             })
//             .catch((e) => {
//                 console.error(e);
//             });
//     });
// }

// Init();
