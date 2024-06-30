import { auth } from "@/auth";
import { fetchWithToken } from "@/services/fetchService";
import ProductCardSheet, { ProductType } from "../ProductCardSheet";
type ProductSectionProps = {
  search?: string | string[] | undefined;
  page: string | string[] | undefined;
};
export default async function ProductsSection({
  search,
  page,
}: ProductSectionProps) {
  //just testing the streaming feature of react
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
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
  const fetchData = await fetchSearchedProducts();
  const products = fetchData.data;
  return (
    <div className="grid grid-cols-5 gap-5 mb-4">
      {products.map((product: ProductType[], idx: number) => (
        <ProductCardSheet key={idx} product={product} />
      ))}
    </div>
  );
}
