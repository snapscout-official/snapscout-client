export async function authenticate(email: string, password: string) {
  const res = await fetch('http://localhost:8000/api/v1/merchant/login');
  const data = await res.json();
  return data;
}
