import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MyImage from "@/public-assets/gio.jpg";
export default function DashboardAvatar() {
  return (
    <Avatar>
      <AvatarImage src={MyImage.src} alt="profile" />
      <AvatarFallback>PP</AvatarFallback>
    </Avatar>
  );
}
