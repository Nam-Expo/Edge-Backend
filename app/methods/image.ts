import { connect } from "./connect";

export const uploadImage = (
	uid: string,
	type: "backgroundImage" | "profileImage",
	data: any
) => {
	return connect({
		url: "/api/image",
		method: "post",
		params: {
			type,
			id: uid,
		},
		data: {},
	});
};

export const getImage = (key: number) => {
	return connect({
		url: "/api/image",
		method: "get",
		params: {
			key,
		},
	});
};
