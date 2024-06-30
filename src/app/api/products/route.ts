import { auth } from "@/auth";
import { fetchWithToken } from "@/services/fetchService";
export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const res = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/products?category=${category}&page=${page}`,
    method: "GET",
    apiToken: session?.apiToken,
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const data = await res.json();
    return Response.json({ data }, { status: res.status });
  }
  //we accept a paginated result for this
  const data = await res.json();
  return Response.json(data);
}
