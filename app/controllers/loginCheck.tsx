import { LoaderFunction } from "@remix-run/node";
import { getSession } from "~/session";


export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.get("email")) {
        return new Response("Unauthorized", { status: 401 });
    }
    return new Response("OK", { status: 200 });
};
