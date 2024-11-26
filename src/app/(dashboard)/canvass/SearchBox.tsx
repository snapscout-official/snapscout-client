"use client"
import {
  CommandDialog,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,

} from "@/components/ui/command"
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { searchProductsInServer } from "@/app/actions/products";
import { ProductSearchResultType } from "@/types/product-types";
import { z } from "zod";
import { useRouter } from "next/navigation";
const searchSchema = z.string().min(1)
export default function SearchBox() {
  const [open, setOpen] = useState<boolean>(false)
  const [results, setResults] = useState<ProductSearchResultType>()
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  async function handleSearch() {
    if (!searchRef.current || searchRef.current.value.length === 0) {
      setResults(undefined)
      return
    }
    searchSchema.parse(searchRef.current.value)
    const resultData = await searchProductsInServer(searchRef.current.value)
    if ('error' in resultData)
      console.log("error")
    else {
      console.log(resultData)
      setResults(resultData)
    }


  }
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <>
      <Button
        name="search"
        className="p-2 text-[#94A3B8] bg-white border-[1px] border-[#94A3B8] rounded-[.5rem] text-left flex justify-between lg:col-span-8 hover:bg-transparent "
        onClick={() => setOpen(true)}
      >
        <p>Click to search </p>
        <p>Ctrl K</p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>

        { /*calls the api every change in value, change it in the future*/}
        <CommandInput name="query" ref={searchRef} placeholder="Search for product name or merchant name" onValueChange={(_) => {
          handleSearch()
        }} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results ? <>
            <CommandGroup heading="Products">{results.products.map((product: string, idx: number) => (
              <CommandItem key={idx} value={product} onSelect={(_) => router.replace(`/canvass/products?search=${product}`)}>{product}</CommandItem>
            ))}
            </CommandGroup>
            <CommandGroup heading="Merchants">{results.merchants.map((merchant: { merchant_id: number; business_name: string }, idx: number) => (
              <CommandItem key={idx} value={merchant.business_name} onSelect={(_) => router.replace(`/canvass/products?search=${merchant.business_name}`)}>{merchant.business_name}</CommandItem>
            ))}
            </CommandGroup>
          </> : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}
