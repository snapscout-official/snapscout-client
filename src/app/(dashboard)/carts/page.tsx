import DashboardContainer from "@/componentUtils/DashboardContainer";
import CartSection from "./CartSection";
import CartContent from "./CartContent";

export default async function Carts({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const { cart } = searchParams
    return (
        <DashboardContainer>
            <div className="grid grid-cols-12 gap-x-5 max-h-full">
                <CartSection selectedCart={cart} />
                <CartContent searchParams={searchParams} />
            </div>
        </DashboardContainer>
    );
}
