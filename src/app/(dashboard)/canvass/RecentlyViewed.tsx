import { cookies } from "next/headers";
import { ProductType } from "@/types/product-types";
import { ScrollableCards } from "./ScrollableCards";
type RecentlyViewedProps = {
  children?: React.ReactNode
}
export default async function RecentlyViewed({ children }: RecentlyViewedProps
) {
  const recentlyViewedCookies = cookies().get("recentlyViewed")?.value;
  const products: ProductType[] = recentlyViewedCookies ? JSON.parse(recentlyViewedCookies) : []
  return (
    <div className="col-span-3 p-5 rounded-[.5rem] text-black shadow-sm justify-between hidden lg:flex flex-col lg:min-h-[1072px]">
      {products.length !== 0 ? <ScrollableCards products={products} /> :
        <div className="col-span-3 text-center text-xl">No Reciently Viewed Products</div>
      }
      <div className="bg-[#F8FAFC] rounded-sm p-3">
        {children}
      </div>
    </div>
  );
}
