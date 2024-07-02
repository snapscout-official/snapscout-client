import { inter } from "@/app/ui/fonts";
import RecentlyCard from "./RecentlyCard";
import { cookies } from "next/headers";
import { ProductType } from "./ProductCardSheet";

export default async function RecentlyViewed() {
  const recentlyViewedCookies = cookies().get("recentlyViewed")?.value;
  if (!recentlyViewedCookies) {
    return <div className="col-span-3 text-center text-xl">No Product</div>;
  }
  const products: ProductType[] = JSON.parse(recentlyViewedCookies);
  return (
    <div className="col-span-3 p-5 rounded-[.5rem] text-black shadow-sm bg-[#F8FAFC] hidden lg:block">
      <p className={`${inter.className} font-semibold text-lg`}>
        Recently Viewed
      </p>
      <div className="flex flex-col space-y-2">
        {products.map((product, idx) => (
          <RecentlyCard key={idx} />
        ))}
      </div>
    </div>
  );
}
