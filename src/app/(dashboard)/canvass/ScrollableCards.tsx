"use client"
import { useState, type ReactElement } from "react"
import { inter } from "@/app/ui/fonts";
import RecentlyCard from "./RecentlyCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ProductType } from "@/types/product-types";
import { Button } from "@/components/ui/button";

type ScrollableCardsProps = {
    products: ProductType[]
}
export function ScrollableCards({ products }: ScrollableCardsProps): ReactElement {
    const [expanded, setExpanded] = useState(false)
    function modifyExpanded() {
        setExpanded((expanded) => !expanded)
    }
    const numberOfProducts = products.length
    return <ScrollArea className="h-[70%]">
        {numberOfProducts <= 6 &&
            <div className="flex flex-col bg-[#F8FAFC] px-2 py-5">
                <div className="space-y-2">
                    {products.map((product, _) => (
                        <RecentlyCard key={product.id} />
                    ))}
                </div>
            </div>
        }
        {numberOfProducts > 6 &&
            <div className="flex flex-col bg-[#F8FAFC] px-4 py-5">
                <div className="space-y-2">
                    {!expanded ? <>
                        {
                            products.slice(0, 5).map((_, idx) => (
                                <RecentlyCard key={idx} />
                            ))
                        }
                        <Button variant="link" className={`${inter.className}`}
                            onClick={modifyExpanded}
                        >View all</Button>
                    </>
                        : products.map((_, idx) => (
                            <RecentlyCard key={idx} />
                        ))}
                </div>
            </div>
        }
        <ScrollBar />
    </ScrollArea>
}
