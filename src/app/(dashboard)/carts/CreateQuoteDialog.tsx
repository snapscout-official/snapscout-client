"use client"
import { type ReactElement } from "react"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartItem, ProductType } from "@/types/product-types"

interface CreateQuoteDialogProps {
    buttonProps: { className: string }
    cartItems: { [key: string]: ProductType[] } | null
}

export function CreateQuoteDialog({ buttonProps, cartItems }: CreateQuoteDialogProps): ReactElement {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button {...buttonProps} > Create Quote</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Create Quote</DialogTitle>
                        <DialogDescription>
                            Add additional information for creating your cart
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {cartItems ? Array.from(Object.entries(cartItems)).map(([merchant, items]) => (
                            <div className="grid gap-2" key={merchant}>
                                <h3>{merchant}</h3>
                                <p>Total Items : {items.length}</p>
                            </div>
                        )) : null}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>

    )
}
