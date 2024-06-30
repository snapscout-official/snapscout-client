import DashboardContainer from "@/componentUtils/DashboardContainer";
import MyCarousel from "./MyCarousel";
import Image from "next/image";
import Gaming from "@/public-assets/gaming.png";
import Arrival from "@/public-assets/arrival.png";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContainer>
      <div className="grid grid-cols-12 gap-2">
        <MyCarousel />
        <div className="col-span-4 max-h-[250px] space-y-2 hidden lg:block">
          <Image
            src={Gaming}
            alt="gaming-logo"
            placeholder="blur"
            className="max-h-[120px]"
          />
          <Image
            src={Arrival}
            alt="gaming-logo"
            placeholder="blur"
            className="max-h-[120px]"
          />
        </div>
      </div>
      {children}
    </DashboardContainer>
  );
}
