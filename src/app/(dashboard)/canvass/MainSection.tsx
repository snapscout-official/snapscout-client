import { auth } from "@/auth";
import CategoryCard from "./CategoryCard";
import MyComboBox from "./MyComboBox";
import OcrIcon from "./OcrIcon";
import SearchBox from "./SearchBox";
import { fetchWithToken } from "@/services/fetchService";
import ProductSection from "./ProductSection";
import ProductsSkeleton from "./ProductsSkeleton";

export default async function MainSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  //fetches categories from the backend
  async function fetchCategories() {
    if (!session) {
      throw new Error("Something went wrong. User might not be authenticated");
    }
    const result = await fetchWithToken({
      url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/categories`,
      method: "GET",
      apiToken: session.apiToken,
      headers: {
        Accept: "application/json",
      },
    });
    if (!result.ok) {
      throw new Error("Something went wrong with our service");
    }
    const data = await result.json();
    return data;
  }
  const { categories } = await fetchCategories();
  return (
    <div className="col-span-12 lg:col-span-9 ">
      <div className="grid gap-1 items-center grid-cols-12 lg:gap-x-8">
        <MyComboBox />
        <SearchBox />
        <OcrIcon />
      </div>
      <div
        id="categories-section"
        className="grid py-6 gap-3 grid-cols-3 md:grid-cols-6 lg:grid-cols-7  "
      >
        {categories.map((category: string, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      {children}
    </div>
  );
}
