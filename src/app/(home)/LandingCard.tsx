import React from "react";

type LandingCardProps = {
  children: React.ReactNode;
};
export default function LandingCard({ children }: LandingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 col-span-1">
      {children}
    </div>
  );
}
