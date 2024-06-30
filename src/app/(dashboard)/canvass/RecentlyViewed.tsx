import { inter } from "@/app/ui/fonts";
import RecentlyCard from "./RecentlyCard";

export default async function RecentlyViewed() {
  return (
    <div className="col-span-3 p-5 rounded-[.5rem] text-black shadow-sm bg-[#F8FAFC] hidden lg:block">
      <p className={`${inter.className} font-semibold text-lg`}>
        Recently Viewed
      </p>
      <div className="flex flex-col space-y-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <RecentlyCard key={idx} />
        ))}
      </div>
    </div>
  );
}
