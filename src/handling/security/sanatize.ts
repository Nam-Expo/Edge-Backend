const sanatize = (string: string) => {
	return typeof string === "string";
};

export default function SQLSanatize(string: string) {
	let isClean = sanatize(string);

	if (!isClean) {
		throw Error();
	}
	return string;
}
