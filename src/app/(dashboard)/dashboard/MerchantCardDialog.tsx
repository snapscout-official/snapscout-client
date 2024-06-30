import Image from "next/image";
import MerchantCard from "./MerchantCard";
import CsuLogo from "@/public-assets/csu-logo.png";
import Calender from "@/public-assets/calender.svg";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { inter } from "@/app/ui/fonts";
export default function MerchantCardDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MerchantCard
          merchantName="Robinsons Place Butuan"
          image="Testing"
          contactNumber="09918804161"
        />
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[600px] sm:h-[500px] px-5 py-0 rounded-2xl">
        <DialogHeader className="grid grid-cols-12 items-center border-b-2 border-[#C8C8C8] h-[70%]">
          <Image
            src={CsuLogo}
            placeholder="blur"
            alt="csu-logo"
            className="col-span-2"
          />
          <div className={`${inter.className} col-span-8 items-start `}>
            <h1 className="font-semibold">Robinsons Place Butuan</h1>
            <p>Merchandise</p>
            <p>09918804161</p>
            <div className="flex text-[#64748B]">
              <Image
                src={Calender}
                alt="calendar"
                className="fill-[#64748B] stroke-[#64748B]"
              />
              <p className="font-extralight">Location here</p>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
