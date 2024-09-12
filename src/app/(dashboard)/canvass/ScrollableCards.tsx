"use client"
import { useMemo, useState, type ReactElement } from "react"
import { inter, inter700 } from "@/app/ui/fonts";
import RecentlyCard from "./RecentlyCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
type ScrollableCardsProps = {
  products: ProductType[]
}
export function ScrollableCards({ products }: ScrollableCardsProps): ReactElement {
  const [expanded, setExpanded] = useState(false)
  const numberOfProducts = products.length
  return <ScrollArea className="h-[50%]">
    {numberOfProducts <= 3 &&
      <div className="flex flex-col bg-[#F8FAFC] px-2 py-5 min-h-[500px]">
        <p className={`${inter700.className} font-bold text-xl`}>
          Recently Viewed
        </p>
        <div className="space-y-2">
          {products.map((product, idx) => (
            <RecentlyCard key={idx} />
          ))}
        </div>
      </div>
    }
    {numberOfProducts > 3 &&
      <div className="flex flex-col bg-[#F8FAFC] px-2 py-5">
        <p className={`${inter700.className} font-bold text-xl`}>
          Recently Viewed
        </p>
        <div className="space-y-2">
          {!expanded ? <>
            {
              products.slice(0, 3).map((product, idx) => (
                <RecentlyCard key={idx} />
              ))
            }
            <Button variant="link" className={`${inter.className}`}
              onClick={() => {
                setExpanded((expanded) => !expanded)
              }}
            >View all</Button>
          </>
            : products.map((product, idx) => (
              <RecentlyCard key={idx} />
            ))}
        </div>
      </div>
    }
    <ScrollBar />
  </ScrollArea>
}
