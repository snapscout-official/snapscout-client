"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useRef } from "react";
import { Cart } from "@/types/product-types";
import { getCookieValue, setCartCookie } from "@/app/actions/products";
export default function NewCartField() {
  const cartRef = useRef<HTMLInputElement>(null);
  async function addCartCookie() {
    if (!cartRef.current) {
      //toast some error right here
      return;
    }
    const cartData: Cart = {
      cartName: cartRef.current.value,
      items: [],
    };
    const cookieData: Cart[] = await getCookieValue("carts");
    await setCartCookie([...cookieData, cartData]);
    cartRef.current.value = "";
    //toast success
  }
  return (
    <div className="space-y-3">
      <Label>Enter Cart Name</Label>

      <Input ref={cartRef} placeholder="Field name or Example" />
      <div className="flex justify-end gap-3 pt-5 ">
        <SheetClose asChild>
          <Button variant="destructive">Cancel</Button>
        </SheetClose>
        <Button onClick={addCartCookie}>Continue</Button>
      </div>
    </div>
  );
}
