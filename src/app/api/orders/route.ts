import { fetchWithToken } from "@/services/fetchService";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/orders`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: res.status },
    );
  }
  const ordersData = await res.json();
  return NextResponse.json(ordersData, { status: res.status });
}
