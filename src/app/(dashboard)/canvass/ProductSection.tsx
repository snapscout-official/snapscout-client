import { auth } from "@/auth";
import ProductCardSheet, { ProductType } from "./ProductCardSheet";
import MyPagination, { LinksProp } from "@/componentUtils/MyPagination";
import { fetchWithToken, splitUrlString } from "@/services/fetchService";
type ProductSectionProp = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function ProductSection({
  searchParams,
}: ProductSectionProp) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await auth();
  let { category, page } = searchParams;
  let result = await fetchWithToken({
    url:
      `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/products?category=` +
      (category ? `${category}` : null) +
      "&page=" +
      (page ? `${page}` : null),
    method: "GET",
    apiToken: session?.apiToken,
    headers: {
      Accept: "application/json",
    },
  });

  let links: LinksProp[] | [] = [];
  const productData = await result.json();
  const products: ProductType[][] | [] = productData.products.data;
  const prevPage = splitUrlString(productData.products.prev_page_url);
  const nextPage = splitUrlString(productData.products.next_page_url);
  if (productData.products.links) {
    links = productData.products.links.filter((link: LinksProp) => {
      return link.label !== "&laquo; Previous" && link.label !== "Next &raquo;";
    });
  }
  return (
    <div className="bg-[#F8FAFC] p-5">
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 ">
        {products
          ? products.map((product: ProductType[], idx: number) => (
              <ProductCardSheet product={product} key={idx} />
            ))
          : null}
      </div>
      <div className="flex justify-end mt-8">
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
