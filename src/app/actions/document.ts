"use server"

import { fetchWithToken } from "@/services/fetchService"

export const uploadDocument = async (formData: FormData) => {

    const result = await fetchWithToken({
        url: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/upload/document`,
        body: formData,
        method: "POST",
    })

    if (!result.ok) {
        console.log(result.status)
        const errorResult = await result.json()
        console.log(errorResult)
        return { message: errorResult.message ?? "Erorr uploading document in the server", success: false }
    }


    const uploadResponse = await result.json();

    return { message: "success upload", success: true, response: uploadResponse }
}
