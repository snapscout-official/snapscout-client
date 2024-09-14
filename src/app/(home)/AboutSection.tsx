import { type ReactElement } from "react"
import { inter, inter700, interLight } from "../ui/fonts"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function AboutSection(): ReactElement {
  return (
    <div className="bg-[#DAE6F8]">
      <div className="h-[15rem]"></div>
      <div className="mt-[3rem] w-[60%] mx-auto grid grid-cols-3 h-[500px]">
        <div className="col-span-2 flex flex-col space-y-7">
          <div>
            <p className={`${inter700.className} text-[#A5A5A5] font-bold text-lg`}>
              The SnapScout Advantage
            </p>
            <h1 className={`${inter700.className} text-6xl text-balance font-bold text-[#09143E]`}>
              Innovative Features Tailored For You
            </h1>
          </div>
          <div className="w-[90%]">
            <p className={`${interLight.className} text-lg text-[#030538] text-balance`}>
              Forget scrolling through endless online reviews or sifting through online posts - SnapScout
              puts the power of convenience at your fingertips, letting you find the best product or
              service quickly and effortlessly.
            </p>
          </div>
          <div className="w-[30%]">
            <Button>Learn More</Button>
          </div>
        </div>
        <div className="col-span-1">
        <Carousel>
          <CarouselContent>

          </CarouselContent>
        </Carousel>
      </div> 
    div> 
  </div> 
  )  
}
