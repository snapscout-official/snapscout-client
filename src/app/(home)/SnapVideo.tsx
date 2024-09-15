import React from "react";
import Video from 'next-video'
import Pitch from "../../../videos/SnapScout_ Our Pitch.mp4";
import Snapscout from "@/public-assets/snapscout.jpeg";
import Image from "next/image";
export default function SnapVideo() {
  return (
    <div className="w-full absolute -top-[15rem] z-40">
      <div className="shadow-xl h-[400px] w-[70%] mx-auto flex items-center justify-center">
        <Video className="h-full w-full rounded-xl" src={Pitch} accentColor="blue" height={500}>
          <Image src={Snapscout} slot="poster" alt="SnapScout Members" placeholder="blur" className="w-full h-[500px] aspect-video object-center object-cover" />
        </Video>
      </div>
    </div>
  );
}
