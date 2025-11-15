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

    const LazyMap = dynamic(() => import("@/components/owned-components/map/Map"), {
        ssr: false,
    });
    return (
        <div className="grid grid-cols-12 gap-x-4 py-5 min-h-full">
            <RecentlyViewed>
                <div className="w-full min-h-[250px] h-full">
                    <LazyMap posix={{ lat: 8.951549, lng: 125.527725 }} />
                </div>
            </RecentlyViewed>
            <MainSection>
                <Suspense fallback={<ProductsSkeleton />}>
                    <ProductSection searchParams={searchParams} />
                </Suspense>
            </MainSection>
        </div>
    );
}
