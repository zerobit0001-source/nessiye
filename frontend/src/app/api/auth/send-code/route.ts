import { env } from "@/utils/env/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch(
            `${env.API_BASE_URL}accounts/send_otp/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
 
        if (!res.ok || !data.ok) {
            return NextResponse.json(
                data,
                {
                    status: res.status,
                }
            );
        }



        return NextResponse.json(
            data,
            {
                status: res.status,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                ok: false,
                message: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}