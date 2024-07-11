import { auth } from "@/auth";

type FetchParams = {
  url: string;
  headers?: HeadersInit;
  method: string;
  body?: BodyInit;
};
export async function fetchWithToken(params: FetchParams) {
  const session = await auth();
  return await fetch(params.url, {
    method: params.method,
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
