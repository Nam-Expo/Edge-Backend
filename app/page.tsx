"use client";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { GetUser } from "./methods/user";
import { getImage } from "./methods/image";
import { SignUpOrganization } from "./methods/organization";

// const ImageStream = () => {
// 	const [imageData, setImageData] = useState(null);

// 	useEffect(() => {
// 		const url = "/api/image?key=1"; // Replace with your server endpoint
// 		const stream = new ReadableStream({
// 			start(controller) {
// 				fetch(url)
// 					.then((response) => {
// 						const reader = response.body.getReader();
// 						return reader;
// 					})
// 					.then((reader) => {
// 						const read = () => {
// 							reader.read().then(({ done, value }) => {
// 								if (done) {
// 									controller.close();
// 									return;
// 								}
// 								controller.enqueue(value);
// 								read();
// 							});
// 						};
// 						read();
// 					})
// 					.catch((error) => {
// 						console.error("Error reading stream:", error);
// 					});
// 			},
// 		});

// 		const blobStream = new Blob([stream], {
// 			type: "application/octet-stream",
// 		});
// 		const urlObject = URL.createObjectURL(blobStream);
// 		setImageData(urlObject);

// 		return () => {
// 			URL.revokeObjectURL(urlObject);
// 		};
// 	}, []);

// 	return (
// 		<div>
// 			{imageData ? (
// 				<img src={imageData} alt="Streamed Image" />
// 			) : (
// 				<p>Loading image...</p>
// 			)}
// 		</div>
// 	);
// };

const FileUploader = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		//@ts-ignore
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		if (!selectedFile) {
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = async () => {
			const arrayBuffer = fileReader.result;
			const byteArray = new Uint8Array(arrayBuffer as ArrayBuffer);

			let size = byteArray.length / 1_048_576;

			if (size > 4) {
				throw new Error("image to large");
			}

			const config = {
				headers: {
					"Content-Type": "application/octet-stream",
				},
				maxContentLength: 250 * 1024,
			};

			try {
				await axios.post(
					"/api/image?id=1&type=backgroundImage",
					byteArray,
					config
				);
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		};

		fileReader.readAsArrayBuffer(selectedFile);
	};

	return (
		<div>
			<input type="file" onChange={(e) => handleFileChange(e)} />
			<button onClick={(e) => handleSubmit(e)}>Upload</button>
		</div>
	);
};

export default function Home() {
	useEffect(() => {
		//SignUpUser("magnus", "rreeves8@uwo.ca", "Minus12345", [], []);
		//getImage(1).then(console.log);
		//SignUpOrganization("magnus", "rreeves8@uwo.ca", "Minus12345", [], []);
	});
	console.log();
	return (
		<main>
			<FileUploader />
			{/* <ImageStream /> */}
		</main>
	);
}
