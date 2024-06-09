import React from "react";
import { inter, inter700, interLight } from "@/app/ui/fonts";
export const Canvassing = () => {
  return (
    <div className="w-full space-y-5">
      <h2
        className={`${inter.className} text-[#18C873] font-bold text-lg text-center`}
      >
        Your go-to marketplace
      </h2>
      <h1
        className={`${inter700.className}  leading-tight tracking-tight font-bold text-[3rem] w-full text-white text-center mt-1 md:text-[3.5rem] md:mx-1 lg:text-[4.3rem]`}
      >
        Canvassing Made Easy
      </h1>
      <p
        className={`${interLight.className} leading-loose text-xl text-[#FFF5E0] font-semibold mx-auto text-center lg:w-[75%] lg:mx-auto `}
      >
        Forget scrolling through endless online reviews or sifting through
        online posts - SnapScout puts the power of convenience at your
        fingertips, letting you find the best product or service quickly and
        effortlessly.
      </p>
    </div>
  );
};
