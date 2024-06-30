import Scan from "@/public-assets/scan.svg";
import Image from "next/image";

export default function OcrIcon() {
  return (
    <div className="col-span-1 flex justify-center items-center bg-[#16EF86] rounded-full h-[40px] object-cover aspect-square">
      <Image src={Scan} alt="scan-icon" />
    </div>
  );
}
