import { authenticatedFetch } from "@/lib/authenticatedFetch";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

    try {
        const { searchParams } = new URL(req.url);

        const queryString = searchParams.toString();

        const endpoint = queryString
            ? `customers/?${queryString}`
            : "customers/";

        console.log(endpoint)
        const result = await authenticatedFetch(endpoint)

        if (!result || result.response.status == 401) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const data = await result.response.json();

        const response = NextResponse.json(data, {
            status: result.response.status,
        });

        if (result.newAccess) {
            response.cookies.set("access", result.newAccess, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });


        }
        return response;

    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = await authenticatedFetch("customers/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!result || result.response.status == 401) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const data = await result.response.json();

        const response = NextResponse.json(data, {
            status: result.response.status,
        });

        if (result.newAccess) {
            response.cookies.set("access", result.newAccess, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
        }
        return response;

    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}