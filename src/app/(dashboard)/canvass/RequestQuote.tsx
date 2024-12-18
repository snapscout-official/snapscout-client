import { z } from "zod";
import { useForm } from "react-hook-form";
import Bag from "@/public-assets/shopping-bag.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToQuote } from "@/app/actions/products";
import { ProductType } from "@/types/product-types";
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
import { ToastAction } from "@/components/ui/toast";
import HoverText from "@/componentUtils/HoverText";
import { useQuotes } from "@/app/custom-hooks/useQuote";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getMoneyText } from "@/app/utils/helpers";

type Props = {
  product: ProductType[];
};
const formSchema = z.object({
  quantity: z.coerce.number().min(1).max(100),
  budget: z.string().optional(),
  need: z
    .date({
      required_error: "input must be a date",
    })
    .optional(),
  productId: z.string(),
});

export type Quote = {
  quantity: number;
  budget?: string;
  need?: Date;
  productId: string;
};
export default function RequestQuote({ product }: Props) {
  const [quotes, setQuotes] = useQuotes(product[0].product_name);
  const [currentProduct, setCurrentProduct] = useState<ProductType>(product[0]);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      budget: "",
      need: undefined,
      productId: currentProduct._id,
    },
  });

  function handleAddQuote() {
    try {
      const quoteData: Quote = formSchema.parse(form.getValues());

      setQuotes({ ...quoteData, budget: getMoneyText(quoteData.budget) });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "something went wrong during processing the input",
        variant: "destructive",
      });
    }
  }
  async function submitQuote(_: z.infer<typeof formSchema>) {
    if (quotes && currentProduct.merchant_id) {
      const actionResult = await addToQuote({ quoteData: quotes, merchantId: currentProduct.merchant_id.toString() });
      if (actionResult.error)
        toast({
          variant: "destructive",
          title: "Something Went Wrong",
          description: "Error occured during quote submission",
          action: <ToastAction altText="Continue">Continue</ToastAction>,

        });
      else
        toast({
          title: "Quote Requested",
          description: "View Notifications for Updates",
          action: <ToastAction altText="Continue">Continue</ToastAction>,
        });
    }
    else throw new Error("No quote data or cannot find merchant during quote submission")

  }
  return (
    <div className="space-y-2 grow">
      <div>Choose Product</div>
      <p className="text-sm md:text-base">{currentProduct._id}</p>
      <ScrollArea>
        <div className="p-3 flex gap-3">
          {product.map((item: ProductType, _) => (
            <Button
              key={item._id}
              asChild
              className="bg-secondary hover:bg-secondary"
              onClick={() => {
                setCurrentProduct(item);
              }}
            >
              <div className="h-[80px] w-[80px] bg-border"></div>
            </Button>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="text-sm h-[200px] mt-2 p-4 border-border border-[1px] md:text-base">
        <p>Description Content Here</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitQuote)}>
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
                      className="text-sm px-3 py-2 md:text-lg md:px-6 md:py-5"
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
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="need"
              render={({ field }) => (
                <FormItem>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          type="button"
                          className="w-full"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>When do you need it? (optional)</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Separator />
            <ScrollArea className="h-[100px] md:h-[150px] md:max-h-[200px] ">
              <div className="space-y-3 md:p-3">
                {quotes
                  ? quotes.map((quote: Quote, idx: number) => (
                    <div
                      className="flex justify-between items-center"
                      key={idx}
                    >
                      <div className="flex gap-x-3 items-center">
                        <Image
                          src={Bag}
                          alt="bag-icon"
                          width={40}
                          height={40}
                          className="w-[15px] h-[15px] md:w-auto md:h-auto"
                        />
                        <HoverText>
                          <p className="text-xs md:text-sm truncate">
                            {quote.productId}
                          </p>
                        </HoverText>
                      </div>
                      <span className="text-xs md:text-sm">
                        x{quote.quantity}
                      </span>
                    </div>
                  ))
                  : null}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <div className="flex justify-end">
              <Button type="submit" className={quotes ? "block" : "hidden"}>
                Submit Quote
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
