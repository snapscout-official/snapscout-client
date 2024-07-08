import DashboardContainer from "@/componentUtils/DashboardContainer";
import CartSection from "./CartSection";
import CartContent from "./CartContent";
import { getCookieValue } from "@/app/actions/products";

export default async function Carts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getCookieValue("carts");
  console.log("carts", data);
  return (
    <DashboardContainer>
      <div className="grid grid-cols-12 gap-x-5 min-h-[800px]">
        <CartSection />
        <CartContent searchParams={searchParams} />
      </div>
    </DashboardContainer>
  );
}
