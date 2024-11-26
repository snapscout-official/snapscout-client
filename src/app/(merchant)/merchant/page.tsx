"use client"
import { useMySession } from "@/app/custom-hooks/sessionContext"
import useAbly from "@/app/custom-hooks/useAbly"
import Echo from "@ably/laravel-echo"
import { useState, type ReactElement } from "react"

type QuoteRequestType = {
  quantity: number;
  need: string;
  budget: string;
  productId: string;
  productName: string;
}

export default function Merchant(): ReactElement {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequestType[]>([])
  const { user } = useMySession();
  if (!user) {
    throw new Error("This user is not authenticated")
  }
  console.log(user)
  useAbly(executor, (echo: Echo) => {
    console.log("Not leaving ")
  })

  function executor(echo: Echo) {
    echo.private(`quotes.${user?.id}`).listen('.quote.request', (QuoteRequestData: QuoteRequestType[]) => {
      console.log("Received Quote Request Data", QuoteRequestData)

      setQuoteRequests([...quoteRequests, ...QuoteRequestData])
    }).subscribed(() => console.log("Yeey we have connected to the private channel"))
  }
  return <div>Hello Merchant User{user.first_name} </div>
}
