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
        className="border-[1px] border-secondary-foreground px-4 py-6 bg-transparent text-black gap-2"
      >
        <Image src={Calendar} alt="schedule-icon" />
        {schedule}
      </Button>
    </div>
  );
}
