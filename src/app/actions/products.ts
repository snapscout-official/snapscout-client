"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProductType } from "../(dashboard)/canvass/ProductCardSheet";

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
  const products = JSON.parse(recentlyViewedProducts.value);
  cookies().set({
    name: "recentlyViewed",
    value: JSON.stringify([...products, product]),
    expires: new Date(Date.now() + 1000 * 120),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}
export interface Cart {
  cartName: string;
  items: CartItem[];
}
interface CartItem {
  quantity: number;
  product: ProductType;
}

export async function addToCart(
  cartName: string,
  quantity: number,
  product: ProductType,
) {
  const cartItems = cookies().get("carts");
  if (!cartItems?.value) {
    let firstItem: Cart = {
      cartName: cartName,
      items: [{ quantity: quantity, product: product }],
    };
    cookies().set({
      name: "carts",
      value: JSON.stringify([firstItem]),
      //1 sec == 1000 milli
      expires: new Date(Date.now() + 1000 * 60 * 1440),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return;
  }
  let deserializedCartData: Cart[] = JSON.parse(cartItems.value);
  let isCartItem = deserializedCartData.find((cart: Cart) => {
    return cart.cartName === cartName;
  });
  if (!isCartItem) {
    cookies().set({
      name: "carts",
      value: JSON.stringify([
        ...deserializedCartData,
        {
          cartName: cartName,
          items: [{ quantity: quantity, product: product }],
        },
      ]),
      //1 sec == 1000 milli
      expires: new Date(Date.now() + 1000 * 60 * 1440),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return;
  }
  isCartItem.items.push({ product: product, quantity: quantity });
  cookies().set({
    name: "carts",
    value: JSON.stringify([...deserializedCartData]),
    //1 sec == 1000 milli
    expires: new Date(Date.now() + 1000 * 60 * 1440),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}
