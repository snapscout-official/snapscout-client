import { fetchWithToken } from "@/services/fetchService";
import { ProductType } from "@/types/product-types";
import ProductCardSheet from "../ProductCardSheet";
type ProductSectionProps = {
    search?: string | string[] | undefined;
    page: string | string[] | undefined;
};
export default async function ProductsSection({
    search,
    page,
}: ProductSectionProps) {
    //why are we fetching data without distance?
    async function fetchSearchedProducts() {
        const result = await fetchWithToken({
            url: page
                ? `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/search-products?search=${search}&page=${page}`
                : `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/search-products?search=${search}`,
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (!result.ok)
            throw new Error("Error fetching data within product section")
        return await result.json();
    }
    const fetchData = await fetchSearchedProducts();
    const products = fetchData.data;
    return (
        <div className="grid grid-cols-5 grid-rows-3 gap-5">
            {products.map((product: ProductType[], idx: number) => (
                <ProductCardSheet key={idx} product={product} />
            ))}
        </div>
    );
}
