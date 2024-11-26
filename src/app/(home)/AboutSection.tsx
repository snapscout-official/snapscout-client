"use client";
import { type ReactElement } from "react";
import { inter, inter700, interLight } from "../ui/fonts";
import { Button } from "@/components/ui/button";
import AboutCarousel from "@/public-assets/about-carousel.jpeg";
import AboutCarousel1 from "@/public-assets/about-carousel2.jpeg";
import AboutCarousel2 from "@/public-assets/about-carousel3.jpeg";
import Psc8 from "@/public-assets/psc-8.jpg";
import NavigatuTeam from "@/public-assets/navigatu.jpg";
import BidaAward from "@/public-assets/bida-award.jpg";
import Milestone from "@/public-assets/milestone.jpg";
import Podcast from "@/public-assets/podcast.png";
import Bida from "@/public-assets/bida.png";
import Psc from "@/public-assets/psc.png";
import Clock from "@/public-assets/clock.svg";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import LandingCard from "./LandingCard";
import SnapVideo from "./SnapVideo";

export function AboutSection(): ReactElement {
  const featured = [Podcast, Bida, Psc];
  const carouselItems = [AboutCarousel, AboutCarousel1, AboutCarousel2];
  const cardItems = [
    {
      image: Psc8,
      title: "Philippine Startup Challenge 8",
      description:
        "SnapScout soars as a top 10 finalist, showcasing innovation in procurement.",
      date: "Dec 2023",
    },
    {
      image: NavigatuTeam,
      title: "SnapScout Engagements",
      description:
        "Pioneering a new era of procurement through meaningful engagements",
      date: "Feb 2023",
    },
    {
      image: BidaAward,
      title: "PCCI's 17th BIDA Awards",
      description:
        "Celebrating excellence: SnapScout secures second place in technology at the 17th BIDA Awards.",
      date: "Sept 2023",
    },
    {
      image: Milestone,
      title: "Snapscout Milestones",
      description:
        "A timeline of triumphs in our quest to redefine procurement",
      date: "June 2024",
    },
  ];
  return (
    <div id="about" className="bg-[#DAE6F8] relative">
      <SnapVideo />
      <div className="h-[300px]"></div>
      <div className="w-[70%] mx-auto grid lg:grid-cols-3 lg:gap-x-7">
        <div className=" flex flex-col space-y-6 lg:col-span-2 xl:space-y-10">
          <div>
            <p
              className={`${inter700.className} text-[#A5A5A5] text-center font-bold  lg:text-left xl:text-lg`}
            >
              The SnapScout Advantage
            </p>
            <h1
              className={`${inter700.className}  text-5xl text-balance font-bold text-[#09143E] text-center lg:text-left xl:text-6xl`}
            >
              Innovative Features Tailored For You
            </h1>
          </div>
          <div className="lg:w-[60%]">
            <p
              className={`${interLight.className} text-lg text-center text-[#030538] text-balance xl:text-2xl lg:text-left 2xl:leading-loose`}
            >
              Forget scrolling through endless online reviews or sifting
              throughonline posts - SnapScout puts the power of convenience at
              your fingertips, letting you find the best product or service
              quickly and effortlessly.
            </p>
          </div>
          <div className="flex justify-center lg:block lg:w-[30%] pb-5">
            <Button>Learn More</Button>
          </div>
        </div>
        <div className=" flex justify-center lg:justify-end">
          <div className="w-[60%] lg:w-full">
            <Carousel
              className="w-full h-full"
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
            >
              <CarouselContent className="shadow-lg">
                {carouselItems.map((carouselImage, idx) => (
                  <CarouselItem>
                    <Image
                      className="w-full lg:w-full h-full rounded-md"
                      src={carouselImage}
                      alt="Product"
                      placeholder="blur"
                      width={300}
                      height={350}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
      <p className={`${inter700.className} p-5 text-[#737373] text-center text-xl`}>
        Featured In
      </p>
      <div className="bg-[#69B892] px-3">
        <div className="w-[80%] mx-auto flex justify-evenly items-center">
          {featured.map((featurePic) => (
            <Image
              className="w-[80px] md:w-[150px] h-auto"
              src={featurePic}
              alt="Feature Logo"
              height={200}
              width={200}
            />
          ))}
        </div>
      </div>
      <div className="px-8 sm:px-[5rem] py-10">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 gap-x-3">
          {cardItems.map((item, idx) => (
            <LandingCard key={idx}>
              <div className="flex flex-col space-y-3 h-full ">
                <Image
                  src={item.image}
                  className="h-[350px] object-center object-cover"
                  alt="Milestone Image"
                  width={1100}
                  height={900}
                />
                <div className="grow ">
                  <h3
                    className={`${inter700.className} text-green-800 text-sm`}
                  >
                    {item.title}
                  </h3>
                  <p className={`${interLight.className} text-sm text-pretty`}>
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex space-x-2">
                    <Image src={Clock} alt="Clock" className="w-[20px]" />
                    <p
                      className={`${inter700.className} font-extrabold text-sm text-[#83849C] `}
                    >
                      {item.date}
                    </p>
                  </div>
                  <Button>View More</Button>
                </div>
              </div>
            </LandingCard>
          ))}
        </div>
        <h2
          className={`${inter700.className}  text-sm text-center  mt-5 text-[#030538] sm:text-lg`}
        >
          Learn More About SnapScout and Our Team
        </h2>
      </div>
    </div>
  );
}
