import { Pool } from "@neondatabase/serverless";

function hexStringToByteArray(hexString: string) {
	const byteArray = [];
	for (let i = 0; i < hexString.length; i += 2) {
		const byte = parseInt(hexString.substr(i, 2), 16);
		byteArray.push(byte);
	}
	return new Uint8Array(byteArray);
}

export default async function createStream(
	pool: Pool,
	onStream: (data: any) => void,
	onEnd: () => void
) {
	pool.connect((error, client, release) => {
		const query = "CALL stream_query_results()";

		client.query(query, (err) => {
			if (err) {
				console.error("Error executing query:", err);
			} else {
				console.log("Query executed successfully.");
			}
		});

		client.on("notification", (msg) => {
			if (msg.payload === "stream_end") {
				onEnd();
			} else {
				onStream(hexStringToByteArray(msg.payload as string));
			}
		});

		client.on("end", () => {
			release();
		});

		client.query("LISTEN query_results");
	});
}
