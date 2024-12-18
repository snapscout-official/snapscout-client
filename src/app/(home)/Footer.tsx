import React from "react";
import SnapscoutLogo from "@/public-assets/snapscout-logo.png";
import Image from "next/image";
import Facebook from "@/public-assets/facebook.svg";
import Linkedin from "@/public-assets/linkedin.svg";
import Map from "@/public-assets/map-footer.svg";
import Email from "@/public-assets/email.svg";
import FooterItem from "./FooterItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Footer() {
  const logos = [Facebook, Map, Linkedin];
  const footerContents = [
    { title: "Information", contents: ["About Us", "Features", "Pricing"] },
    {
      title: "Contact Us",
      contents: ["Customer Service", "Help", "Give Feedback"],
    },
    {
      title: "Waitlist",
      contents: [
        "Ready to Elevate Your Procurement Process? Get Notified When We Launch!",
      ],
    },
  ];
  return (
    <div id="contact-us" className="bg-gradient-to-b from-gradientStart via-gradientMiddle to-gradientEnd py-10 px-[3rem] xl:px-[5rem]">
      <div className="grid gap-x-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-4 mb-4">
          <Image
            src={SnapscoutLogo}
            className="w-[200px] h-auto"
            alt="SnapScout Logo"
            width={300}
            height={300}
          />
          <div className="flex w-[40%] justify-around ">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center object bg-[#D9D9D9] aspect-square rounded-full h-[30px] w-[30px] p-2"
              >
                <Image
                  src={logo}
                  alt="Footer Logo"
                  className="w-[30px] h-auto"
                />
              </div>
            ))}
          </div>
        </div>
        {footerContents.map((content, idx) => (
          <FooterItem
            title={content.title}
            contents={content.contents}
            key={idx}
          >
            {content.title === "Waitlist" ? (
              <form>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Enter your e-mail"
                    className="border-none bg-[#2F6374] text-black rounded-sm"
                  />
                  <Button>
                    <Image src={Email} alt="Email Icon" />
                  </Button>
                </div>
              </form>
            ) : null}
          </FooterItem>
        ))}
      </div>
    </div>
  );
}
