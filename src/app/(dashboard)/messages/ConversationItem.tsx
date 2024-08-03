import CsuLogo from "@/public-assets/csu-logo.png";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { ConversationType } from "@/types/product-types";
type ConversationItemProps = {
  conversationData: ConversationType;
  userId?: string;
};
export default function ConversationItem({
  conversationData,
  userId,
}: ConversationItemProps) {
  return (
    <Link
      href={`/messages/${conversationData.uuid}`}
      className="py-2 flex items-center space-x-2 max-w-full bg-gray-100"
    >
      <Image src={CsuLogo} alt="participant-image" />
      <div className=" w-[10rem] grow ">
        <p className="capitalize">{conversationData.participant_user}</p>
        <p className="truncate">
          {/* this will error on null userId. fix in the future  */}
          {conversationData.recent_message.creator == userId
            ? "You: " + conversationData.recent_message.content
            : conversationData.recent_message.content}
        </p>
      </div>
      <div className="flex-1 flex justify-end">
        <p className="truncate">
          {format(conversationData.updated_at, "MM") +
            "/" +
            format(conversationData.updated_at, "d")}
        </p>
      </div>
    </Link>
  );
}
