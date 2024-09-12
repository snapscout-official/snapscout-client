"use client"
import React from "react";
import { Rings } from "react-loader-spinner";
export default function loading() {
  return (
    <div className="flex h-[500px] w-[300px] my-auto mx-auto items-center justify-center">
      <Rings visible={true} height={400} width={400} />
    </div>
  );
}

