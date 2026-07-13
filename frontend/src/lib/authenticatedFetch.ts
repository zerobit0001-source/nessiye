
import { cookies } from "next/headers";
import { env } from "@/utils/env/env";

export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
) {
    const cookieStore = await cookies();

    let access = cookieStore.get("access")?.value;
    const refresh = cookieStore.get("refresh")?.value;

    if (!access || !refresh) {
        return { response: new Response("Unauthorized", { status: 401 }) };
    }

    let response = await fetch(`${env.API_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${access}`,
        },
    });

    if (response.ok) {
        return { response };
    }

    if (response.status !== 401) {
        return { response };
    }

    // refresh logic here

    if (response.status === 401) {
        const refreshres = await fetch(`${env.API_BASE_URL}accounts/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh }),
        });


        if (!refreshres.ok) {
            return { response };
        }

        const refreshData = await refreshres.json();


        const newAccess = refreshData.access;

        if (!newAccess) {
            return { response }
        }
        response = await fetch(`${env.API_BASE_URL}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${newAccess}`,
            },
        });

        return {
            response,
            newAccess,
        };
    }

}
