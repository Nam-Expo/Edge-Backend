import { createAuth } from "@/firebaseClient/auth";
import { connect } from "./connect";
import { uploadImage } from "./image";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function SignUpOrganization(
	name: string,
	email: string,
	password: string,
	profileImage: any,
	backgroundImage: any,
	description: string
) {
	let auth = await createAuth();
	let { user } = await createUserWithEmailAndPassword(auth, email, password);

	const [profileImgKey, backgroundImgKey] = await Promise.all([
		uploadImage(user.uid, "profileImage", []),
		uploadImage(user.uid, "backgroundImage", []),
	]);

	await connect({
		url: "/api/organization",
		method: "post",
		data: {
			name,
			id: user.uid,
			backgroundImage: backgroundImgKey.data[0].key,
			profileImage: profileImgKey.data[0].key,
			description,
		},
	});
}
