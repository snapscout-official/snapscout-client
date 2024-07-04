import ProductCardSheet, { ProductType } from "./ProductCardSheet";
import MyPagination, { LinksProp } from "@/componentUtils/MyPagination";
export default async function ProductSection({
  children,
  products,
  links,
  urls,
}: {
  children: React.ReactNode;
  products?: ProductType[][] | undefined;
  links: LinksProp[];
  urls: string[];
}) {
  return products ? (
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
          prevPage={urls[0]}
          nextPage={urls[1]}
          url="/canvass"
          queryParam="category"
        />
      </div>
    </div>
  ) : (
    <div>{children}</div>
  );
}
