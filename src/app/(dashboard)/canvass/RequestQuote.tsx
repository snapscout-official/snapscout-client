import { z } from "zod";
import { useForm } from "react-hook-form";
import Bag from "@/public-assets/shopping-bag.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToQuote } from "@/app/actions/products";
import { ProductType } from "./ProductCardSheet";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Image from "next/image";

type Props = {
  product: ProductType[];
};
const formSchema = z.object({
  quantity: z.coerce.number().min(1).max(100),
  budget: z.string().optional(),
  need: z.string().optional(),
});
type Quote = {
  quantity: number;
  budget?: string | undefined;
  need?: string | undefined;
};
export default function RequestQuote({ product }: Props) {
  const [quotes, setQuotes] = useState<Quote[] | undefined>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      budget: "",
      need: "",
    },
  });
  console.log(quotes);
  function handleAddQuote() {
    try {
      const quoteData = formSchema.parse(form.getValues());
      if (quoteData.quantity <= 0) {
        toast({
          title: "Invalid Quantity",
          description: "invalid quantity! must be above 0",
          variant: "destructive",
        });
        return;
      }
      if (!quotes) {
        setQuotes([quoteData]);
        return;
      }
      setQuotes([...quotes, quoteData]);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "something went wrong during processing the input",
        variant: "destructive",
      });
    }
  }
  return (
    <div>
      <div>Choose Product</div>
      <p>Variety Name Here </p>
      <ScrollArea>
        <div className="p-3 flex gap-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div className="h-[80px] w-[80px] bg-border" key={idx}></div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="h-[100px] mt-2 p-4 border-border border-[1px]">
        <p>Description Content Here</p>
      </div>
      <Form {...form}>
        <form action={addToQuote}>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <div className="flex justify-between">
                    <FormControl>
                      <Input type="number" {...field} className="w-[30%]" />
                    </FormControl>
                    <Button
                      onClick={handleAddQuote}
                      type="button"
                      className="text-lg px-6 py-5"
                    >
                      Add Product
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What is your budget? (optional)"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="need"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What is your budget? (optional)"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <ScrollArea className="h-[200px] max-h-[200px] ">
              <div className="p-3 space-y-3">
                {quotes
                  ? quotes.map((quote: Quote, idx) => (
                      <div className="flex justify-between" key={idx}>
                        <div className="flex gap-x-3">
                          <Image src={Bag} alt="bag-icon" />
                          <p> Variety Name here</p>
                        </div>
                        <span>x{quote.quantity}</span>
                      </div>
                    ))
                  : null}
              </div>
            </ScrollArea>
          </div>
        </form>
      </Form>
    </div>
  );
}
