export default async function handler(request: Request, post: () => Promise<Response>, get: () => Promise<Response>) {
    if (request.method === "POST") {
        return await post();
    }
    if (request.method === "GET") {
        return await get();
    } else {
        throw new Error("unhandled: " + request.method);
    }
}
