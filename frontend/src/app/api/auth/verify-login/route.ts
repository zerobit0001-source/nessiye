import { env } from "@/utils/env/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
 
    const res = await fetch(`${env.API_BASE_URL}accounts/login_otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    const response = NextResponse.json(data, {
      status: res.status,
    });

    if (res.ok && data.ok) {
      response.cookies.set("access", data.access, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      response.cookies.set("refresh", data.refresh, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        message: "Invalid request",
      },
      {
        status: 400,
      },
    );
  }
}
