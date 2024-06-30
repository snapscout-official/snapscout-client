import { searchProducts } from "@/app/actions/products";
import { Input } from "@/components/ui/input";
export default function SearchBox() {
  return (
    <form action={searchProducts} className="col-span-9 lg:col-span-8">
      <Input
        name="search"
        className="p-2 text-[#94A3B8] bg-white border-[1px] border-[#94A3B8] rounded-[.5rem]"
        placeholder="Search by Category or by Merchant"
      />
    </form>
  );
}
