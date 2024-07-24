"use client";
import { deleteCartProduct } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
export default function DeleteCartItemButton({
  product_id,
  cart_name,
}: {
  product_id: string;
  cart_name: string;
}) {
  const { toast } = useToast();
  async function handleDelete() {
    try {
      await deleteCartProduct(product_id, cart_name);
    } catch (err) {
      toast({
        title: "Error Removing Product",
        description: "Something went wrong in the service during this action",
        variant: "destructive",
      });
    }
  }
  return (
    <div>
      <Button variant="link" className="text-red-500" onClick={handleDelete}>
        Delete Item
      </Button>
    </div>
  );
}
