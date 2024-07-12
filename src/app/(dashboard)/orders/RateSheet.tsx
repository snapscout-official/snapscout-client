"use client";
import { Button } from "@/components/ui/button";
//yelling could not find the module idk
import ReactStars from "react-rating-stars-component";
import Spam from "@/public-assets/product-spam.jpg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { inter } from "@/app/ui/fonts";
export default function RateSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-white text-secondary-foreground p-3 border-[#D4D4D4] border-[2px]">
          Rate Product
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Rate Product</SheetTitle>
        </SheetHeader>
        <div className="space-y-3">
          <div className="flex gap-x-3">
            <Image
              src={Spam}
              alt="product-photo"
              width={200}
              height={200}
              className="w-[200px] h-auto object-center"
            />
            <div className={`${inter.className} space-y-5 py-5 `}>
              <p>Product Name</p>
              <p>Product Variety</p>
            </div>
          </div>

          <div className="flex items-center gap-x-7">
            <p className="text-lg w-[40%] ">Product Quality</p>
            <ReactStars
              size="40"
              isHalf={true}
              onChange={(rating: number) => console.log(rating)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-x-7">
            <p className="text-lg w-[40%] ">Seller Service</p>
            <ReactStars
              size="40"
              isHalf={true}
              onChange={(rating: number) => console.log(rating)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-x-7">
            <p className="text-lg w-[40%] ">Delivery Service</p>
            <ReactStars
              size="40"
              isHalf={true}
              onChange={(rating: number) => console.log(rating)}
              className="flex-1"
            />
          </div>

          {/* wrap it in a by shad or native form? */}
          <div className="space-y-2">
            <p>Comments</p>
            <div className="h-[100px] border-border border-[1px]"></div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
