import { auth } from "@/auth";
import CategoryCard from "./CategoryCard";
import MyComboBox from "./MyComboBox";
import OcrIcon from "./OcrIcon";
import SearchBox from "./SearchBox";
import { fetchWithToken } from "@/services/fetchService";

export default async function MainSection({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    //fetches categories from the backend
    async function fetchCategories() {
        if (!session) {
            throw new Error("Something went wrong. User not authenticated");
        }
        const result = await fetchWithToken({
            url: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/categories`,
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (!result.ok) {
            throw new Error("Something went wrong fetching categories");
        }
        const categories = await result.json();
        return categories;
    }
    const { categories } = await fetchCategories();
    return (
        <div className="col-span-12 lg:col-span-9 flex flex-col">
            {/* <div className="grid gap-1 items-center grid-cols-12 lg:gap-x-8"> */}
            <div className="flex gap-2 items-center">
                <MyComboBox />
                <SearchBox />
                <OcrIcon />
            </div>
            {categories.length !== 0 ? (
                <div
                    id="categories-section"
                    className="grid py-6 gap-3 grid-cols-3 md:grid-cols-6 lg:grid-cols-7 min-h-[200px]"
                >
                    {categories.map((category: string, idx: number) => (
                        <CategoryCard key={idx} category={category} />
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[20%] text-center justify-center items-center font-inter font-semibold text-secondary">
                    <span>
                        CURRENTLY NO CATEGORIES
                    </span>
                </div>

            )}

            {children}
        </div>
    );
}
