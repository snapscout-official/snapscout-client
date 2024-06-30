type FetchParams = {
  url: string;
  apiToken?: string | null;
  headers?: HeadersInit;
  method: string;
  body?: BodyInit;
};
export async function fetchWithToken(params: FetchParams) {
  return await fetch(params.url, {
    method: params.method,
    headers: { ...params.headers, Authorization: `Bearer ${params.apiToken}` },
    body: params.body,
  });
}
export function splitUrlString(url: string) {
  if (url) {
    return url.split("?")[1];
  }
  return url;
}
