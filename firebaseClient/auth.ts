import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import clientConfig from "./client.config";

export const createAuth = async () => {
	let config = clientConfig;
	let app = initializeApp(config as FirebaseOptions);
	return getAuth(app);
};
