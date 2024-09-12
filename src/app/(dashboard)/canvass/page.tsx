import RecentlyViewed from "./RecentlyViewed";
import MainSection from "./MainSection";
import { cookies } from "next/headers";
import ProductSection from "./ProductSection";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import { MapDialog } from "@/componentUtils/MapDialog";
import { Cart } from "@/types/product-types";

import dynamic from "next/dynamic";
export default async function Canvass({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const cartCookie = cookies().get("carts");
  const LazyMap = dynamic(() => import("@/componentUtils/LeafletMap"), {
    ssr: false,
  });
  if (cartCookie) {
    const cartData: Cart[] = JSON.parse(cartCookie.value);
    cartData.forEach((cart) => {
      console.log(cart.cart_name, cart.items);
    });
  }
  return (
    <div className="grid grid-cols-12 gap-x-4 mt-5">
      <RecentlyViewed>
        <LazyMap className="w-full h-[200px] rounded-lg" />
        <MapDialog>
          <LazyMap className="w-full h-full" />
        </MapDialog>
      </RecentlyViewed>
      <MainSection>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductSection searchParams={searchParams} />
        </Suspense>
      </MainSection>
    </div>
  );
}
