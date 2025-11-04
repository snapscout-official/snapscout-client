"use client";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Vans from "@/public-assets/vans-carousel.jpg";
import Gaming from "@/public-assets/gaming.png";
import Image from "next/image";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
export default function MyCarousel() {
    const carouselItems = [Vans, Gaming];
    const [_, setApi] = useState<CarouselApi>();

    return (
        <Carousel
            className="col-span-12 max-h-[200px] w-full lg:col-span-8"
            setApi={setApi}
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
            <CarouselContent>
                {carouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={item}
                            alt={`carousel-${index}`}
                            width={250}
                            height={200}
                            className="rounded-[.5rem] max-h-[200px] w-full object-cover object-center lg:max-h-[250px]"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
