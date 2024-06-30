export default async function Memoize() {
  const result = await fetch(`${process.env.AUTH_SERVICE_URL}/api/v1/test`, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await result.json();
  return <div>{JSON.stringify(data)}</div>;
}
