import { Button } from "@/components/ui/button";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import ProductCarousel from "./ProductCarousel";
import { ProductType } from "@/types/product-types";

export default function ProductInformation({
  product,
  changeProduct,
}: {
  product: ProductType[];
  changeProduct: (id: string) => void;
}) {
  return (
    <div className="grow">
      <div className="flex justify-center w-full">
        <ProductCarousel />
      </div>
      <div>
        <p>Varities</p>
        <ScrollArea className="mt-3 w-full">
          <div className="flex space-x-7 w-max py-4">
            {product.map((product: ProductType, idx) => (
              <Button
                onClick={() => {
                  changeProduct(product._id);
                }}
                key={product._id}
                className="p-3 rounded-[.3rem] bg-secondary text-secondary-foreground hover:bg-secondary"
              >
                {"variety " + (idx + 1)}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="flex justify-end w-full">
          <Button variant="link" className="text-lightText">
            View ratings
          </Button>
        </div>
      </div>
      <div className="w-full border-[1px] border-border h-[300px]"></div>
    </div>
  );
}
