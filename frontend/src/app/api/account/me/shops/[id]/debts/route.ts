import { authenticatedFetch } from "@/lib/authenticatedFetch";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await authenticatedFetch(`accounts/me/shops/${id}/debts`);

    if (!result || result.response.status == 401) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
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
  } catch (error) {}
}
