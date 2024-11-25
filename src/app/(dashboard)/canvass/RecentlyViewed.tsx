import { cookies } from "next/headers";
import { ProductType } from "@/types/product-types";
import { ScrollableCards } from "./ScrollableCards";
import { inter700 } from "@/app/ui/fonts";
type RecentlyViewedProps = {
  children?: React.ReactNode;
};
export default async function RecentlyViewed({
  children,
}: RecentlyViewedProps) {
  const recentlyViewedCookies = cookies().get("recentlyViewed")?.value;
  const products: ProductType[] = recentlyViewedCookies
    ? JSON.parse(recentlyViewedCookies)
    : [];
  return (
    <div className="col-span-3 p-5 rounded-[.5rem] text-black shadow-sm space-y-2 hidden lg:flex flex-col">
      <p className={`${inter700.className} font-bold text-xl`}>Recently Viewed</p>
      {products.length !== 0 ? (
        <ScrollableCards products={products} />
      ) : null}
      <div>{children ? children : null}</div>
    </div>
  );
}
