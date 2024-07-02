"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { splitUrlString } from "@/services/fetchService";
import ProductCardSheet, { ProductType } from "./ProductCardSheet";
import MyPagination, { LinksProp } from "@/componentUtils/MyPagination";

export default function ProductSection() {
  const [products, setProducts] = useState<Array<Array<ProductType>>>();
  const [links, setLinks] = useState<Array<LinksProp>>([]);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [urls, setUrls] = useState<Array<string>>([]);
  const searchParams = useSearchParams();
  if (hasErrors) {
    throw new Error("Something went wrong when fetching the products");
  }

  useEffect(() => {
    const fetchProducts = async () => {
      //get query paramater

      const category = searchParams.get("category");

      //for pagination
      const currentPage = searchParams.get("page");

      const result = await fetch(
        `http://localhost:3000/api/products?category=${category}&page=${currentPage}`,
      );
      if (!result.ok) {
        setHasErrors(true);
      }
      const fetchResult = await result.json();
      //change this in the future
      const links = fetchResult.products.links;
      //memoize?
      const prevPage = splitUrlString(fetchResult.products.prev_page_url);
      const nextPage = splitUrlString(fetchResult.products.next_page_url);
      setUrls([prevPage, nextPage]);
      const filteredLinks = links.filter((link: LinksProp) => {
        return (
          link.label !== "&laquo; Previous" && link.label !== "Next &raquo;"
        );
      });

      setLinks(filteredLinks);
      console.log(fetchResult.products.data);
      setProducts(fetchResult.products.data);
    };
    fetchProducts();
  }, [searchParams]);
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
  ) : null;
}
