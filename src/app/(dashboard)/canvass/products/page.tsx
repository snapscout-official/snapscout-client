import { inter, interLight } from "@/app/ui/fonts";
import { fetchWithToken } from "@/services/fetchService";
import ProductsSection from "./ProductsSection";
import MyPagination from "@/componentUtils/MyPagination";
import { LinksProp } from "@/types/product-types";
import { splitUrlString } from "@/services/fetchService";
import { Suspense } from "react";
import RecentlyViewed from "../RecentlyViewed";
import SearchMap from "./SearchMap";
import MainSection from "../MainSection";
import NoSearchAlert from "./NoSearchAlert";
import { MapDialog } from "@/componentUtils/MapDialog";
import ProductsSkeleton from "../ProductsSkeleton";
export default async function Products({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const { search, page, distance } = searchParams;
    async function fetchSearchedProducts() {
        const result = await fetchWithToken({
            url: page
                ? `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/search-products?search=${search}&page=${page}&distance=${distance ?? "5"}`
                : `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/search-products?search=${search}&distance=${distance ?? "5"}`,
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (!result.ok) {
            const errorData = await result.json()
            console.log(errorData)
            return { error: errorData.message }
        }
        return await result.json();
    }
    if (!search) {
        return <NoSearchAlert message="Please product search value" />;
    }
    const fetchData = await fetchSearchedProducts();

    //this is the temporary handler if error occured during fetching data
    if (fetchData?.error) {
        console.log(fetchData.errorData)
        return <NoSearchAlert message={fetchData.error} />;
    }
    console.log(fetchData)
    const links = fetchData.meta.links;
    const nextDistance = fetchData.next_distance
    const merchants: MerchantType[] = fetchData.merchants;
    const filteredLinks = links.filter((link: LinksProp) => {
        return link.label !== "&laquo; Previous" && link.label !== "Next &raquo;";
    });

    const prevPage = splitUrlString(fetchData?.links.prev);
    const nextPage = splitUrlString(fetchData?.links.next);

    return (
        <div className={`${inter.className} mt-5 grid grid-cols-12 gap-x-4`}>
            <RecentlyViewed>
                <div className="p-2 bg-[#F8FAFC] rounded-md">
                    <SearchMap locations={merchants.map((merchant) => merchant.location)} nextDistance={nextDistance} search={search} />
                    <MapDialog>
                        <SearchMap forDialog locations={merchants.map((merchant) => merchant.location)} nextDistance={nextDistance} search={search} />
                    </MapDialog>
                </div>
            </RecentlyViewed>
            <MainSection>
                <div className=" flex flex-col justify-between bg-[#F8FAFC] p-4 flex-1">
                    <Suspense fallback={<ProductsSkeleton />}>
                        <ProductsSection search={search} page={page} />
                    </Suspense>

                    <div className="flex mt-2 items-center">
                        <p className={`${interLight.className} text-sm text-[#64748B]`}>
                            Showing <strong className="font-bold">{fetchData.data.length}</strong> results out of{" "}
                            <strong className="font-bold">{fetchData.meta.total}</strong>
                        </p>
                        <MyPagination
                            links={filteredLinks}
                            url="/canvass/products"
                            queryParam="search"
                            nextPage={nextPage}
                            prevPage={prevPage}
                        />
                    </div>
                </div>
            </MainSection>
        </div>
    );
}
