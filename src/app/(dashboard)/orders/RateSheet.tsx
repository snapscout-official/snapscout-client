"use client";
//yelling could not find the module idk
import ReactStars from "react-rating-stars-component";
import Fruits from "@/public-assets/gaming.png";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { inter } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import React from "react";

const ratingSchema = z.object({
  comment: z.string().optional(),
  product: z.number(),
  seller: z.number(),
  delivery: z.number(),
});

export default function RateSheet({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const rateForm = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      comment: "",
      product: 0,
      seller: 0,
      delivery: 0,
    },
  });
  function handleRateChange(
    rating_value: number,
    rate_category: "comment" | "product" | "delivery" | "seller",
  ) {
    rateForm.setValue(rate_category, rating_value);
  }

  function handleSubmission(formData: z.infer<typeof ratingSchema>) {
    toast({
      title: "Rate Submmited",
      description: "your rate has been submitted to the service",
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Rate Product</SheetTitle>
        </SheetHeader>
        <div className="space-y-3">
          <div className="flex gap-x-3">
            <Image
              src={Fruits}
              alt="product-photo"
              width={200}
              height={200}
              className="w-[200px] h-[200px] object-center"
            />
            <div className={`${inter.className} space-y-5 py-5 `}>
              <p>Product Name</p>
              <p>Product Variety</p>
            </div>
          </div>

          <div className="flex items-center gap-x-7">
            <p className="text-lg w-[40%] ">Product Quality</p>
            <ReactStars
              size="40"
              isHalf={true}
              onChange={(rating: number) => handleRateChange(rating, "product")}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-x-7">
            <p className="text-lg w-[40%] ">Seller Service</p>
            <ReactStars
              size="40"
              isHalf={true}
              onChange={(rating: number) => handleRateChange(rating, "seller")}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-x-7">
            <p className="text-lg w-[40%] ">Delivery Service</p>
            <ReactStars
              size="40"
              isHalf={true}
              onChange={(rating: number) =>
                handleRateChange(rating, "delivery")
              }
              className="flex-1"
            />
          </div>
          <Form {...rateForm}>
            <form onSubmit={rateForm.handleSubmit(handleSubmission)}>
              <FormField
                control={rateForm.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Share your thoughts about the service"
                        className="resize-none h-[150px] "
                      />
                    </FormControl>
                    <FormDescription>This is optional</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={rateForm.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="hidden"
                        {...field}
                        className="resize-none h-[150px] "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={rateForm.control}
                name="seller"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="hidden"
                        className="resize-none h-[150px] "
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={rateForm.control}
                name="delivery"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="hidden"
                        {...field}
                        className="resize-none h-[150px] "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* toast not available yet */}
              <div className="space-y-10 ">
                <Button className="w-full mt-5" type="button">
                  Return/Refund Product
                </Button>
                <div className="w-full flex justify-between">
                  <Button
                    type="button"
                    className="bg-transparent text-secondary-900 px-8 text-lg border-border border-[2px]"
                  >
                    Report
                  </Button>
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      className="bg-transparent text-secondary-900 px-8 text-lg border-border border-[2px]"
                    >
                      Submit
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
