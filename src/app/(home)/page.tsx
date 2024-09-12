import AboutUs from "./AboutUs";
import Landing from "./Landing";

export default async function Home() {
  return (
    <div className="min-h-full ">
      <Landing />
      <AboutUs />
    </div>
  );
}
