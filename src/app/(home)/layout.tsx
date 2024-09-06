import Topnav from "@/componentUtils/Topnav";
import { ReactNode } from "react";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<ReactNode> {
  return (
    <div className="h-dvh">
      <Topnav />
      <main className=" w-full">{children}</main>
    </div>
  );
}
