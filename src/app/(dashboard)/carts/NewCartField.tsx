"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useRef } from "react";
import { addToCart } from "@/app/actions/products";
import { useToast } from "@/components/ui/use-toast";
export default function NewCartField() {
    const { toast } = useToast()
    const cartRef = useRef<HTMLInputElement>(null);
    async function addCartCookie() {
        if (!cartRef.current) {
            //toast some error right here
            return;
        }
        const response = await addToCart(cartRef.current.value);
        if (response?.error) {
            toast({
                description: response?.description,
                variant: "destructive",
            })
        }
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
                <SheetClose asChild>
                    <Button onClick={addCartCookie}>Continue</Button>
                </SheetClose>
            </div>
        </div>
    );
}
