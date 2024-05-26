export async function authenticate(
  email: string | undefined,
  password: string | undefined,
) {
  try {
    const res = await fetch("http://localhost:8000/api/v1/agency/login", {
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Failed to authenticate user in our server:", error);
    throw new Error("Failed to authenticate user");
  }
}
