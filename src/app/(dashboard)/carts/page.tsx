import DashboardContainer from "@/componentUtils/DashboardContainer";
import CartSection from "./CartSection";
import CartContent from "./CartContent";

export default async function Carts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <DashboardContainer>
      <div className="grid grid-cols-12 gap-x-5 min-h-[800px] relative">
        <CartSection />
        <CartContent searchParams={searchParams} />
      </div>
    </DashboardContainer>
  );
}
