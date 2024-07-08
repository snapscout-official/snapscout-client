import { Separator } from "@/components/ui/separator";
export default function ProductCart() {
  return (
    <div className="bg-white">
      <div className="px-7 py-2 flex justify-between">
        <div className="flex gap-x-3">
          <span className="text-secondary-foreground">Merchant Name</span>
          <p>some messaging icon</p>
        </div>
        <p>Address of Merchant Here</p>
      </div>
      <Separator orientation="horizontal" />
      <div></div>
    </div>
  );
}
