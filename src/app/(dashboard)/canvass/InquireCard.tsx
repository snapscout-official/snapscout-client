import Image from "next/image";
import Spam from "@/public-assets/product-spam.jpg";
import Verified from "@/public-assets/verified.svg";
import { Button } from "@/components/ui/button";
import ScheduleCard from "./ScheduleCard";
import { inter } from "@/app/ui/fonts";
export default function InquireCard() {
  return (
    <div className={`${inter.className} flex flex-col space-y-3`}>
      <div className="grid grid-cols-5 items-center">
        <div className="col-span-2">
          <Image src={Spam} alt="product-photo" />
        </div>
        <div className="col-span-3">
          <div className="flex gap-3">
            <h1 className="text-lg">Merchant Name</h1>
            <Image src={Verified} alt="verification-icon" />
          </div>
          <p>Merchant Type</p>
        </div>
      </div>
      <div className="h-[100px] border-[1px] border-gray-600 p-4">
        Address Here
      </div>
      <div className="w-full flex justify-end">
        <Button variant="link">Show Map Review</Button>
      </div>
      <div>
        <p>Open Hours</p>
        <div className="grid grid-cols-1 gap-y-3 mt-2">
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
