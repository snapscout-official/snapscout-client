import { inter } from "@/app/ui/fonts";
import { auth } from "@/auth";
import { fetchWithToken } from "@/services/fetchService";
import ProductsSection from "./ProductsSection";
import MyPagination from "@/componentUtils/MyPagination";
import { LinksProp } from "@/types/product-types";
import { splitUrlString } from "@/services/fetchService";
import NoProductAlert from "./NoSearchAlert";
import { Suspense } from "react";
export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { search, page } = searchParams;
  const session = await auth();

  async function fetchSearchedProducts() {
    const result = await fetchWithToken({
      url: page
        ? `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/search-products?search=${search}&page=${page}`
        : `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/search-products?search=${search}`,
      method: "GET",
      apiToken: session?.apiToken,
      headers: {
        Accept: "application/json",
      },
    });
    return await result.json();
  }
  if (!search) {
    return <NoProductAlert />;
  }
  const fetchData = await fetchSearchedProducts();
  const links = fetchData?.meta.links;
  const filteredLinks = links.filter((link: LinksProp) => {
    return link.label !== "&laquo; Previous" && link.label !== "Next &raquo;";
  });
  const prevPage = splitUrlString(fetchData?.links.prev);
  const nextPage = splitUrlString(fetchData?.links.next);

  return (
    <div className={`${inter.className} mt-5`}>
      <div className="flex justify-between">
        <p className="text-xl mb-3">{fetchData.meta.total} results found</p>
        <p>
          Showing {fetchData.meta.per_page} results out of{" "}
          {fetchData.meta.total}
        </p>
      </div>
      <div className="bg-[#F8FAFC] p-4">
        <Suspense fallback={<p>Loading..</p>}>
          <ProductsSection search={search} page={page} />
        </Suspense>

        <MyPagination
          links={filteredLinks}
          url="/canvass/products"
          queryParam="search"
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
}
