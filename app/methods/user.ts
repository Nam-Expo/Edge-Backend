import { createAuth } from "@/firebaseClient/auth";
import { connect } from "./connect";
import { uploadImage } from "./image";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function SignUpUser(
	name: string,
	email: string,
	password: string,
	profileImage: any,
	backgroundImage: any
) {
	let auth = await createAuth();
	let { user } = await createUserWithEmailAndPassword(auth, email, password);

	const [profileImgKey, backgroundImgKey] = await Promise.all([
		uploadImage(user.uid, "profileImage", []),
		uploadImage(user.uid, "backgroundImage", []),
	]);

	await connect({
		url: "/api/user",
		method: "post",
		data: {
			name,
			id: user.uid,
			backgroundImage: backgroundImgKey.data[0].key,
			profileImage: profileImgKey.data[0].key,
		},
	});
}

export function GetUser(uid: string) {
	return connect({
		url: "/api/user",
		method: "get",
		params: {
			userId: uid,
		},
	});
}
