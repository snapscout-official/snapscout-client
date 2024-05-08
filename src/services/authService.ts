export async function authenticate(email: string, password: string) {
  const res = await fetch('http://localhost:8000/api/v1/merchant/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}
