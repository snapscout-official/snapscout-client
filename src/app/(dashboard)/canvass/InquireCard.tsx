import Image from "next/image";
import Me from "@/public-assets/gio.jpg";
import Spam from "@/public-assets/product-spam.jpg";
import { useToast } from "@/components/ui/use-toast";
import UserPlus from "@/public-assets/user-plus.svg";
import Verified from "@/public-assets/verified.svg";
import { Button } from "@/components/ui/button";
import ScheduleCard from "./ScheduleCard";
import { inter } from "@/app/ui/fonts";
import { Separator } from "@/components/ui/separator";
import HoverText from "@/componentUtils/HoverText";
export default function InquireCard() {
  const { toast } = useToast();
  return (
    <div className={`${inter.className} flex flex-col space-y-3`}>
      <div className="grid grid-cols-5 items-center gap-x-5">
        <div className="col-span-2 p-2 object-center">
          <Image
            src={Me}
            alt="product-photo"
            width={200}
            height={200}
            className="max-h-[170px] rounded-[.5rem]"
          />
        </div>
        <div className="col-span-3">
          <div className="inline-flex gap-2 items-center">
            <HoverText>
              <h1 className="text-xs truncate md:text-lg">Merchant Name</h1>
            </HoverText>
            <Image src={Verified} alt="verification-icon" />
            <Button
              size="sm"
              onClick={() => {
                toast({
                  title: "Feature Not Implemented",
                  description: "The feature is not implemented yet",
                  variant: "destructive",
                });
              }}
              className="p-0 bg-transparent shadow-none hover:bg-transparent"
            >
              <Image src={UserPlus} alt="add" />
            </Button>
          </div>
          <HoverText>
            <p className="text-xs md:text-lg">Merchant Type</p>
          </HoverText>
          <div className="inline-flex max-w-full space-x-2 text-sm font-light ">
            <div className="text-xs md:text-sm">4.9</div>
            <Separator orientation="vertical" className="h-[20px]" />
            <HoverText>
              <div className="text-xs truncate md:text-sm">99 Rating</div>
            </HoverText>
            <Separator orientation="vertical" className="h-[20px]" />
            <HoverText>
              <div className="text-xs truncate md:text-sm">99 Sold</div>
            </HoverText>
          </div>
        </div>
      </div>
      <div className="h-[100px] border-[1px] border-gray-600 p-4">
        Address Here
      </div>
      <div className="w-full flex justify-end">
        <Button
          variant="link"
          onClick={() => {
            toast({
              title: "Feature Not Implemented",
              description: "The feature is not implemented yet",
              variant: "destructive",
            });
          }}
        >
          Show Map Review
        </Button>
      </div>
      <div className="max-w-full">
        <p>Open Hours</p>
        <div className="grid grid-cols-1 gap-y-3 mt-2 max-w-full">
          <ScheduleCard schedule="Monday - Thursday(7am - 10pm)" />
          <ScheduleCard schedule="Saturday (9am - 9pm)" />
        </div>
      </div>
      <div className="h-[250px] border-[1px] border-gray-600 p-4">
        Messaging Here
      </div>
    </div>
  );
}
