import React from "react";
import { Separator } from "@/components/ui/separator";
import { inter, inter700 } from "../ui/fonts";
type FooterItemProps = {
  title: string;
  contents: string[];
  children?: React.ReactNode;
};
export default function FooterItem({
  title,
  contents,
  children,
}: FooterItemProps) {
  return (
    <div className={`${inter700.className} text-white font-bold space-y-4`}>
      <h2>{title}</h2>
      <Separator orientation="horizontal" className="bg-black " />
      <div>
        {contents.map((content, idx) => (
          <p
            className={`${inter.className} text-pretty text-[#FFF5E0] text-sm`}
            key={idx}
          >
            {content}
          </p>
        ))}
      </div>
    </div>
  );
}
