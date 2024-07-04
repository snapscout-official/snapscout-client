"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProductType } from "../(dashboard)/canvass/ProductCardSheet";
import { Quote } from "../(dashboard)/canvass/RequestQuote";

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
export interface Cart {
  cartName: string;
  items: CartItem[];
}
interface CartItem {
  quantity: number;
  product: ProductType;
}

export async function getCookieValue(key: string) {
  const cookie = cookies().get(key);
  if (cookie?.value) {
    const cookieValue = JSON.parse(cookie.value);
    return cookieValue;
  }
}
export async function setCartCookie(cartItem: Cart[]) {
  cookies().set({
    name: "carts",
    value: JSON.stringify(cartItem),
    // 1 day
    expires: new Date(Date.now() + 1000 * 60 * 1440),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}
export async function addToCart(
  cartName: string,
  quantity: number,
  product: ProductType,
) {
  const cartItems = cookies().get("carts");
  //if cart exist in the cookie
  if (!cartItems?.value) {
    let firstItem: Cart = {
      cartName: cartName,
      items: [{ quantity: quantity, product: product }],
    };
    setCartCookie([firstItem]);
    return;
  }
  let deserializedCartData: Cart[] = JSON.parse(cartItems.value);
  let isCartItem = deserializedCartData.find((cart: Cart) => {
    return cart.cartName === cartName;
  });
  //if there is cart but the cart does not exist
  if (!isCartItem) {
    setCartCookie([
      ...deserializedCartData,
      {
        cartName: cartName,
        items: [{ quantity: quantity, product: product }],
      },
    ]);

    return;
  }
  const cartItem = isCartItem.items.find(
    (item: CartItem) => item.product._id === product._id,
  );
  //if product does not exist in the cart we found
  if (!cartItem) {
    //just push the product
    isCartItem.items.push({ product: product, quantity: quantity });
    setCartCookie([...deserializedCartData]);
    return;
  }
  const filter = isCartItem.items.filter(
    (item: CartItem) => item.product._id !== product._id,
  );
  isCartItem.items = [
    ...filter,
    { product: cartItem?.product, quantity: cartItem?.quantity + quantity },
  ];
  setCartCookie([...deserializedCartData]);
}
export async function addToQuote(data: Quote[] | undefined) {
  console.log(data);
}
