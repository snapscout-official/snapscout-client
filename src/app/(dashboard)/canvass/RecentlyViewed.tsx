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
        <div className="bg-[#F8FAFC] col-span-3 p-5 rounded-[.5rem] text-black shadow-sm space-y-2 hidden lg:flex flex-col min-h-full space-y-[2rem]">
            <div className="h-[300px]">{children ? children : null}</div>
            <div>
                <p className={`${inter700.className} font-bold text-xl`}>Recently Viewed</p>
                {products.length !== 0 ? (
                    <ScrollableCards products={products} />
                ) : (
                    <div className="min-h-full flex flex-col items-center justify-center text-secondary font-inter font-normal">
                        NO ITEMS TO DISPLAY
                    </div>
                )}
            </div>

        </div>
    );
}
