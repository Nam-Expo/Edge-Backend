const sanatize = (string: string) => {
	return true;
};

export default function SQLSanatize(string: string) {
	let isClean = sanatize(string);

	if (!isClean) {
		throw Error();
	}
	return string;
}
