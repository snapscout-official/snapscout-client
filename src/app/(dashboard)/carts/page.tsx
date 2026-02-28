import DashboardContainer from "@/componentUtils/DashboardContainer";
import CartSection, { CartSectionV2 } from "./CartSection";
import CartContent from "./CartContent";

export default async function Carts({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const { cart } = searchParams
    return (
        <DashboardContainer>
            <div className="grid grid-cols-1 gap-y-4 gap-x-5 h-[100%] overflow-auto md:grid-cols-12 md:overflow-hidden">
                {/* <CartSection selectedCart={cart} /> */}
                <CartSectionV2 selectedCart={cart} />
                <CartContent searchParams={searchParams} />
            </div>
        </DashboardContainer>
    );
}
