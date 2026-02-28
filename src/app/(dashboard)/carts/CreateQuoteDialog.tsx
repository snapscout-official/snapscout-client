"use client"
import { useEffect, useState, type ReactElement } from "react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
import { Calendar } from "@/components/ui/calendar"
import { ChevronDown } from "lucide-react"
import { useQuoteDialog } from "@/app/custom-hooks/useQuoteDialog"
import { CartItems } from "@/types/cart-types"

export interface CreateQuoteDialogProps {
    buttonProps: { className: string }
    cartItems: CartItems[]
    currentCart: string
}

export function CreateQuoteDialog({ buttonProps, cartItems, currentCart }: CreateQuoteDialogProps): ReactElement {

    const { currentCartItems, updateCurrentCartItemsDate, } = useQuoteDialog({ cartItems, currentCart })

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button {...buttonProps} > Create Quote</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[450px] lg:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Create Quote</DialogTitle>
                        <DialogDescription>
                            Add additional information for creating your cart
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {currentCartItems.length !== 0 && currentCartItems ? currentCartItems.map((cartEntry) => (
                            <div className="font-inter p-3 grid gap-3 border-1 border-foreground-200 rounded-md" key={cartEntry.merchant}>
                                <h3 className="font-inter font-semibold text-md"> Merchant: {cartEntry.merchant}</h3>
                                <p className="text-sm" >Total Items: <span className="font-bold">{cartEntry.items.length}</span></p>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <Label className="w-full">
                                            Date Needed
                                        </Label>
                                        <QuoteCalendar
                                            merchant={cartEntry.merchant}
                                            updateCart={updateCurrentCartItemsDate}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>
                                            Budget (Optional)
                                        </Label>
                                        <Input className="w-52" type="number" />
                                    </div>
                                </div>
                            </div>
                        )) : <div className="p-7">
                            <p className="text-center font-bold text-2xl">
                                NO ITEMS TO CREATE QUOTE
                            </p>

                        </div>}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="bg-red-400 hover:bg-red-200">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Send Quote</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
interface QuoteCalendarProps {
    merchant: string
    updateCart: (date: Date, merchant: string) => void
}
function QuoteCalendar({ merchant, updateCart }: QuoteCalendarProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState<Date>()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="font-normal w-48 justify-between" variant="outline" id={`date-${merchant}`}>
                    {date ? date.toLocaleDateString() : "Select Date"}
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        if (date) {
                            setDate(date)
                            updateCart(date, merchant)
                        }
                        setOpen(false)

                    }}
                />
            </PopoverContent>
        </Popover>
    )

}
