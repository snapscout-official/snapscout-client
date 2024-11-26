"use client";
import CategoryIcon from "@/public-assets/1.png";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

type CategoryCardProps = {
  category: string;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  //pushes query string into our url
  //useCallback for memoization of the callback function within
  const createQueryString = useCallback((key: string, value: string) => {
    const params = new URLSearchParams();
    params.set(key, value);
    return params.toString();
  }, []);
  return (
    <Link
      href={"/canvass" + "?" + createQueryString("category", category)}
      className="p-2 text-center bg-[#F8FAFC] shadow-sm "
      prefetch
    >
      <div className="rounded-full mx-auto border-[1px] border-[#18C873] bg-white h-[80px] object-cover aspect-square flex items-center justify-center  ">
        <Image src={CategoryIcon} alt="category-icon" width={60} height={80} />
      </div>
      <p>{category}</p>
    </Link>
  );
}
