import { Skeleton } from "@/components/ui/skeleton";

export default async function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-5 gap-3 bg-[#F8FAFC] p-5">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Skeleton key={idx} className="w-[200px] bg-gray-500 h-[150px]" />
      ))}
    </div>
  );
}
