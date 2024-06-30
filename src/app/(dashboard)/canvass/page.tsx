import RecentlyViewed from "./RecentlyViewed";
import MainSection from "./MainSection";
export default async function Canvass() {
  return (
    <div className="grid grid-cols-12 gap-x-4 mt-5">
      <RecentlyViewed />
      <MainSection />
    </div>
  );
}
