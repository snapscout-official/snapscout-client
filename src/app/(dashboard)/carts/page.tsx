import DashboardContainer from "@/componentUtils/DashboardContainer";
import CartSection from "./CartSection";

export default async function Carts() {
  return (
    <DashboardContainer>
      <div className="grid grid-cols-12 gap-x-3">
        <CartSection />
      </div>
    </DashboardContainer>
  );
}
