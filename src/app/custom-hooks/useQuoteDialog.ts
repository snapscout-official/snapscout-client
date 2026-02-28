import { useEffect, useState } from "react"
import { CreateQuoteDialogProps } from "../(dashboard)/carts/CreateQuoteDialog"


export const useQuoteDialog = ({ cartItems, currentCart }: Omit<CreateQuoteDialogProps, 'buttonProps'>) => {
    const [currentCartItems, setCurrentCartItems] = useState(cartItems)
    useEffect(() => {

        setCurrentCartItems(cartItems)

    }, [currentCart, cartItems])
    const updateCurrentCartItemsDate = (date: Date, merchant: string) => {
        if (!currentCartItems) {
            return
        }
        setCurrentCartItems(currentCartItems.map((cartItem) => {
            if (cartItem.merchant === merchant) {
                return { ...cartItem, date: date }
            }
            return cartItem
        }))
    }

    return {
        updateCurrentCartItemsDate,
        currentCartItems,

    }

}
