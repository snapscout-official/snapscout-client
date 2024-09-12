import React from "react";
import { inter, inter700 } from "../ui/fonts";

export default function AboutUs() {
  return (
    <div className=" bg-[#DAE6F8] ">
      <div className="h-[15rem]"></div>
      <div className="mt-[3rem] w-[60%] mx-auto grid grid-cols-3 h-[500px]">
        <div className="col-span-2">
          <p className={`${inter.className} text-[#A5A5A5] font-bold text-sm`}>
            The SnapScout Advantage
          </p>
          <h1
            className={`${inter700.className} text-5xl text-balance font-bold text-[#09143E]`}
          >
            Innovative Features Tailored For You
          </h1>
        </div>
        <div className="col-span-1">Hello world</div>
      </div>
    </div>
  );
}
