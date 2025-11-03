import React from "react";
import BookMark from "@/public-assets/bookmark.svg";
import Image from "next/image";
import { Notification } from "@/types/product-types";
import Link from "next/link";
type NotificationCardProps = {
    notif: Notification;
    type: string;
};
//
export default function NotificationCard({
    type,
    notif,
}: NotificationCardProps) {
    return (
        <Link href={`/orders?order=${notif.data.order_id}`}>
            <div className="flex items-center bg-white rounded-[.5rem] shadow-md p-3 justify-between">
                <div className=" grid gap-2 ">
                    <div className="flex gap-2">
                        <Image src={BookMark} alt="bookmark-icon" />
                        <span className="text-start text-xs  font-semibold lg:text-sm 2xl:text-lg">
                            {notif.description}
                        </span>
                    </div>
                    <h1 className="text-xs text-start text-[#64748B]">
                        {notif.description}
                    </h1>
                </div>
                {!notif.opened ? (
                    <div className="bg-green-500 h-2 w-2 object-cover aspect-square rounded-full"></div>
                ) : null}
            </div>
        </Link>
    );
}
