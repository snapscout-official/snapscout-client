"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ProductType,
  Cart,
  ProductSearchResultType,
} from "@/types/product-types";
import { Quote } from "../(dashboard)/canvass/RequestQuote";
import { fetchWithToken } from "@/services/fetchService";
import { revalidatePath } from "next/cache";

export async function writeCookie(product: ProductType) {
  const recentlyViewedProducts = cookies().get("recentlyViewed");
  if (!recentlyViewedProducts?.value) {
    cookies().set({
      name: "recentlyViewed",
      value: JSON.stringify([product]),
      //1 sec == 1000 milli
      expires: new Date(Date.now() + 1000 * 60 * 60 * 60),
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
export async function getCartProducts(
  cart_name: string,
): Promise<ProductType[][]> {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/carts/${cart_name}`,
    method: "GET",

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
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/carts`,
    method: "GET",

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
  item?: { quantity: number; product_id: string },
) {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/carts`,
    method: "POST",

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

export async function deleteCartProduct(product_id: string, cart_name: string) {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/carts/destroy-product`,
    method: "POST",
    body: JSON.stringify({
      cart_name: cart_name,
      product_id: product_id,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!result.ok) {
    throw new Error("Something went wrong in the service. Try again next time");
  }
  revalidatePath("/carts");
}

export async function addToQuote(data: {
  quoteData: Quote[];
  merchantId: string;
}) {
  try {
    const res = await fetchWithToken({
      url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/quotes`,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorResultData = await res.json();
      return { error: errorResultData };
    }
    return { message: "success" };
  } catch (error) {
    return { error: "an error occured during add to quote operation" };
  }
}

type SearchErrorType = {
  error: string;
  errorData?: any;
};
export async function searchProductsInServer(
  queryString: string,
): Promise<ProductSearchResultType | SearchErrorType> {
  if (queryString.length === 0) {
    return { error: "no query string" };
  }
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/search`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryString,
    }),
  });

  //fix error handling here
  if (!result.ok) {
    const errorData = await result.json();
    console.log("fetching with search has an error", errorData);
    return {
      error: "Error during searching in server action",
      errorData: errorData,
    };
  }
  const data = await result.json();
  return { products: data.products, merchants: data.merchants };
}
