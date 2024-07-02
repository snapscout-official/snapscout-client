import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const myCookies = cookies();
  const result = await fetch(`${process.env.BACKEND_SERVICE_URL}/api/v1/test`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const data = await result.json();
}
