"use client";
import { useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { LinksProp } from "@/types/product-types";

export default function MyPagination({
    links,
    prevPage,
    nextPage,
    url,
    queryParam,
}: {
    links: LinksProp[];
    prevPage: string;
    nextPage: string;
    url?: string;
    queryParam: string;
}) {
    const searchParams = useSearchParams();
    const paramResult = searchParams.get(queryParam);
    const createQueryString = useCallback((key: string, value: string) => {
        const params = new URLSearchParams();
        params.set(key, value);
        return params.toString();
    }, []);
    return (
        <Pagination className="flex-1 justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={
                            //for the url query string with pagination
                            url +
                            "?" +
                            (paramResult
                                ? createQueryString(queryParam, paramResult) +
                                "&" +
                                `${prevPage}`
                                : `${prevPage}`)
                        }
                    />
                </PaginationItem>
                {links.map((link, idx) => (
                    <PaginationItem key={idx} className="hidden md:block">
                        <PaginationLink
                            isActive={link.active}
                            href={
                                //for the url query string with pagination
                                url +
                                "?" +
                                (paramResult
                                    ? createQueryString(queryParam, paramResult) +
                                    "&" +
                                    `page=${link.label}`
                                    : `page=${link.label}`)
                            }
                        >
                            {link.label}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href={
                            //for the url query string with pagination
                            url +
                            "?" +
                            (paramResult
                                ? createQueryString(queryParam, paramResult) +
                                "&" +
                                `${nextPage}`
                                : `${nextPage}`)
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
