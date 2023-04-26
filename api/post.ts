import type { RequestContext } from "@vercel/edge";
import handler from "../handling/edgeFunctionHandler";

export const config = {
    runtime: "edge",
};

export default function Post(request: Request, context: RequestContext) {
    return handler(
        request,
        async () => {
            let body = await request.json();

            
            return new Response(`Hello, from ${request.url} I'm an Edge Function!`);
        },
        async () => {
            return new Response(`Hello, from ${request.url} I'm an Edge Function!`);
        }
    );
}
