import RecentlyViewed from "./RecentlyViewed";
import MainSection from "./MainSection";
import { cookies } from "next/headers";
import { Cart } from "@/app/actions/products";
import { fetchWithToken, splitUrlString } from "@/services/fetchService";
import { auth } from "@/auth";
import { LinksProp } from "@/componentUtils/MyPagination";
import ProductSection from "./ProductSection";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
//might transfer the fetching to the ProductSection component since it is now server
//component also in order to juice streaming
export default async function Canvass({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cartCookie = cookies().get("carts");
  const session = await auth();
  let { category, page } = searchParams;
  if (cartCookie) {
    const cartData: Cart[] = JSON.parse(cartCookie.value);
    cartData.forEach((cart) => {
      console.log(cart.items);
    });
  }

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
  const prevPage = splitUrlString(productData.products.prev_page_url);
  const nextPage = splitUrlString(productData.products.next_page_url);
  if (productData.products.links) {
    links = productData.products.links.filter((link: LinksProp) => {
      return link.label !== "&laquo; Previous" && link.label !== "Next &raquo;";
    });
  }

  return (
    <div className="grid grid-cols-12 gap-x-4 mt-5">
      <RecentlyViewed />
      <MainSection>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductSection searchParams={searchParams} />
        </Suspense>
      </MainSection>
    </div>
  );
}
