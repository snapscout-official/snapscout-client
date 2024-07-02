"use client";

import { useEffect } from "react";

export default function Orders() {
  useEffect(() => {
    async function fetchCookie() {
      const result = await fetch("http://localhost:3000/api/cookies", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      console.log(result);
    }
    fetchCookie();
  }, []);

  return <div>Testing</div>;
}
