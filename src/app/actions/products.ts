"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProductType, Cart, CartItem } from "@/types/product-types";
import { Quote } from "../(dashboard)/canvass/RequestQuote";
import { fetchWithToken } from "@/services/fetchService";
import { string } from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
export async function searchProducts(data: FormData) {
  const searchedProduct = data.get("search");
  if (!searchedProduct) {
    return;
  }
  redirect(`/canvass/products?search=${searchedProduct}`);
}
export async function writeCookie(product: ProductType) {
  const recentlyViewedProducts = cookies().get("recentlyViewed");
  if (!recentlyViewedProducts?.value) {
    cookies().set({
      name: "recentlyViewed",
      value: JSON.stringify([product]),
      //1 sec == 1000 milli
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return;
  }
  const products: ProductType[] = JSON.parse(recentlyViewedProducts.value);

  //if product already exists
  const exists = products.find(
    (cookieProduct: ProductType) => cookieProduct._id === product._id,
  );
  //check if product is undefined
  if (!exists) {
    cookies().set({
      name: "recentlyViewed",
      value: JSON.stringify([...products, product]),
      //2 hours
      expires: new Date(Date.now() + 1000 * 60 * 120),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return;
  }
}

export async function getCookieValue(key: string) {
  const cookie = cookies().get(key);
  console.log(cookie?.value);
  if (cookie?.value) {
    const cookieValue = JSON.parse(cookie.value);
    return cookieValue;
  }
  return [];
}
export async function getCartProducts(cart_name: string): Promise<Cart[][]> {
  const session = await auth();
  if (!session?.apiToken) {
    throw new Error("You are not authenticated");
  }
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/carts/${cart_name}`,
    method: "GET",
    apiToken: session.apiToken,
    headers: {
      Accept: "application/json",
    },
  });

  if (!result.ok) {
    throw new Error("Something went wrong on the server");
  }
  const data = await result.json();
  return data.cart_data;
}
export async function getCarts(): Promise<Cart[]> {
  const session = await auth();
  if (!session?.apiToken) {
    throw new Error("You are not authenticated");
  }
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/carts`,
    method: "GET",
    apiToken: session.apiToken,
    headers: {
      Accept: "application/json",
    },
  });
  if (!result.ok) {
    throw new Error("Something went wrong on the server");
  }
  const data = await result.json();
  return data.carts;
}
//can also be used for creating new cookie
//refactor. remove from cookies and store to db
export async function addToCart(
  cartName: string,
  item?: { quantity: number; product_id: string } | null,
) {
  const session = await auth();
  if (!session?.apiToken) {
    throw new Error("You are not authenticated");
  }
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/carts`,
    method: "POST",
    apiToken: session.apiToken,
    body: JSON.stringify({
      cart_name: cartName,
      items: item ? item : [],
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!result.ok) {
    throw new Error("Something went wrong on the server");
  }
  revalidatePath("/canvass");
}
export async function addToQuote(data: Quote[] | undefined) {
  console.log(data);
}
