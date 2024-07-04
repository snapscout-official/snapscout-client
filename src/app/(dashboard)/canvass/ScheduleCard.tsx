import Calendar from "@/public-assets/calender.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Prop = {
  schedule: string;
};
export default function ScheduleCard({ schedule }: Prop) {
  return (
    <div>
      <Button
        disabled
        className="border-[1px] border-secondary-foreground  bg-transparent text-black text-xs gap-2 p-2 md:text-md md:px-4 md:py-6 max-w-full truncate"
      >
        <Image src={Calendar} alt="schedule-icon" />
        {schedule}
      </Button>
    </div>
  );
}
