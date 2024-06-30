import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type LinksProp = {
  active: boolean;
  label: string;
  url?: string;
};

export default function ProductPagination({
  links,
  prevPage,
  nextPage,
}: {
  links: LinksProp;
  prevPage: string;
  nextPage: string;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              //for the url query string with pagination
              "/canvass/products" + "?" + `${prevPage}`
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={
              //for the url query string with pagination
              "/canvass/products" + "?" + `${nextPage}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
