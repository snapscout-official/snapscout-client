"use server"

import { fetchWithToken } from "@/services/fetchService"
import { CartItems } from "@/types/cart-types"


export const submitQuotes = async (quotes: CartItems) => {
    /**
     * An action to send quotes from quote dialog
     *
     **/


    const response = await fetchWithToken({
        url: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}`,
        method: "POST",
    })



}


