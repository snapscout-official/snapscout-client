import CsuLogo from "@/public-assets/csu-logo.png";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { ConversationType } from "@/types/product-types";
type ConversationItemProps = {
  conversationData: ConversationType;
};
export default function ConversationItem({
  conversationData,
}: ConversationItemProps) {
  return (
    <Link
      href={`/messages/${conversationData.uuid}`}
      className="py-2 w-full flex items-center "
    >
      <Image src={CsuLogo} alt="participant-image" />
      <div>
        <p>{conversationData.participant_user}</p>
        <p>Hello How are you</p>
      </div>
      <p className="flex-1 flex justify-end">
        {format(conversationData.updated_at, "MM") +
          "/" +
          format(conversationData.updated_at, "d")}
      </p>
    </Link>
  );
}
