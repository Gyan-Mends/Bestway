// app/routes/api/check-session.ts
import { json } from "@remix-run/node";
import { getSession } from "~/session";

export const loader = async ({ request }: { request: Request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const session = await getSession(cookieHeader);

    const email = session.get("email");
    if (!email) {
        return json({ loggedIn: false }, { status: 401 });
    }

    return json({ loggedIn: true, email });
};
