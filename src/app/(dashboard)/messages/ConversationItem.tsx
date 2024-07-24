import CsuLogo from "@/public-assets/csu-logo.png";
import Image from "next/image";
import { format } from "date-fns";
type ConversationItemProps = {
  image: string;
  participant: string;
  date: Date;
  recentMessage: string;
};
export default function ConversationItem({
  image,
  participant,
  date,
  recentMessage,
}: ConversationItemProps) {
  return (
    <div className="py-2 w-full flex items-center ">
      <Image src={CsuLogo} alt="participant-image" />
      <div>
        <p>{participant}</p>
        <p>{recentMessage}</p>
      </div>
      <p className="flex-1 flex justify-end">
        {format(date, "MM") + "/" + format(date, "d")}
      </p>
    </div>
  );
}
