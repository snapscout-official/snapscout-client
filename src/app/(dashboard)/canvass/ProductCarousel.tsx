import Vans from "@/public-assets/vans-carousel.jpg";
import Spam from "@/public-assets/product-spam.jpg";
import Ako from "@/public-assets/gio.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
export default function ProductCarousel() {
  const images = [Vans, Spam, Ako];
  return (
    <Carousel className="w-[150px] max-w-xs md:w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square object-center items-center justify-center p-3 md:p-6">
                  <Image
                    src={image}
                    alt="product-images"
                    width={200}
                    height={200}
                    placeholder="blur"
                    sizes="(max-width: 640px) 50vw, 80vw"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
