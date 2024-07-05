import RecentlyViewed from "./RecentlyViewed";
import MainSection from "./MainSection";
import { cookies } from "next/headers";
import ProductSection from "./ProductSection";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import { Cart } from "@/types/product-types";
export default async function Canvass({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cartCookie = cookies().get("carts");
  if (cartCookie) {
    const cartData: Cart[] = JSON.parse(cartCookie.value);
    cartData.forEach((cart) => {
      console.log(cart.items);
    });
  }
  return (
    <div className="grid grid-cols-12 gap-x-4 mt-5">
      <RecentlyViewed />
      <MainSection>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductSection searchParams={searchParams} />
        </Suspense>
      </MainSection>
    </div>
  );
}
