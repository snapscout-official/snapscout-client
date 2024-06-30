import React from "react";
import BookMark from "@/public-assets/bookmark.svg";
import Message from "@/public-assets/message.svg";
import Image from "next/image";
type CardProps = {
  type: string;
};
export default function NotificationCard({ type }: CardProps) {
  return (
    <div>
      {type === "email" ? (
        <div className="bg-white p-3 grid gap-2 rounded-[.5rem]">
          <div className="flex gap-2">
            <Image src={BookMark} alt="bookmark-icon" />
            <span className="text-start text-xs  font-semibold lg:text-sm 2xl:text-lg">
              Email Address
            </span>
          </div>
          <h1 className="text-xs text-start text-[#64748B]">
            Enter your email address Enter your email address..
          </h1>
        </div>
      ) : null}
      {type === "message" ? (
        <div className="bg-white p-3 grid gap-2 rounded-[.5rem]">
          <div className="flex gap-2">
            <Image src={Message} alt="bookmark-icon" />
            <span className="text-start text-xs  font-semibold lg:text-sm 2xl:text-md">
              You Have a message
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
