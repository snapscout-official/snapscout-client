import { auth } from "@/auth";

type FetchParams = {
  url: string;
  headers?: HeadersInit;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  body?: BodyInit;
  option?: NextFetchRequestConfig | undefined;
};
export async function fetchWithToken(params: FetchParams) {
  const session = await auth();
  return await fetch(params.url, {
    method: params.method,
    next: params.option,
    headers: {
      ...params.headers,
      Authorization: `Bearer ${session?.apiToken}`,
    },
    body: params.body,
  });
}
export function splitUrlString(url: string) {
  if (url) {
    return url.split("?")[1];
  }
  return url;
}
