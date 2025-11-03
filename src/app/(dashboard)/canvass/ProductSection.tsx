import ProductCardSheet from "./ProductCardSheet";
import { ProductType } from "@/types/product-types";
import MyPagination from "@/componentUtils/MyPagination";
import { LinksProp } from "@/types/product-types";
import { fetchWithToken, splitUrlString } from "@/services/fetchService";
import { getCarts } from "@/app/actions/products";
type ProductSectionProp = {
    searchParams: { [key: string]: string | string[] | undefined };
};
export default async function ProductSection({
    searchParams,
}: ProductSectionProp) {
    let { category, page } = searchParams;

    //add error handling right here
    let result = await fetchWithToken({
        url:
            `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/products?category=` +
            (category ? `${category}` : null) +
            "&page=" +
            (page ? `${page}` : null),
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    let links: LinksProp[] = [];
    const productData = await result.json();
    console.log("Products", productData)
    const products: Array<ProductType[]> = productData.products.data;
    const prevPage = splitUrlString(productData.products.prev_page_url);
    const nextPage = splitUrlString(productData.products.next_page_url);

    if (productData.products.links) {
        links = productData.products.links.filter((link: LinksProp) => {
            return link.label !== "&laquo; Previous" && link.label !== "Next &raquo;";
        });
    }
    //add error handling
    const cartCookie = await getCarts();

    return (
        <div className="bg-[#F8FAFC] flex flex-col p-5 flex-1">
            {
                products.length !== 0 ? (
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                        {products.map((product: ProductType[], idx: number) => (
                            <ProductCardSheet product={product} key={idx} cartData={cartCookie} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center text-center font-inter font-normal text-secondary">
                        NO PRODUCTS CURRENTLY
                    </div>

                )
            }
            <div className="flex flex-1 justify-end items-end ">
                <MyPagination
                    links={links}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    url="/canvass"
                    queryParam="category"
                />
            </div>
        </div>
    );
}
