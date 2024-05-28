export async function authenticate(
  email: string | unknown,
  password: string | unknown,
) {
  try {
    const res = await fetch("http://localhost:8001/api/v1/agency/login", {
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log("Failed to authenticate user in our server:", error);
    throw new Error("Failed to authenticate user");
  }
}
