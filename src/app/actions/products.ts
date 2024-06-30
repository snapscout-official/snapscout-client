"use server";

import { redirect } from "next/navigation";

export async function searchProducts(data: FormData) {
  const searchedProduct = data.get("search");
  if (!searchedProduct) {
    return;
  }
  redirect(`/canvass/products?search=${searchedProduct}`);
  return { errors: "Testing error in nextjs server actions" };
}
