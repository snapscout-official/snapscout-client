import { AboutSection } from "./AboutSection";
import Credits from "./Credits";
import Footer from "./Footer";
import Landing from "./Landing";
export default async function Home() {
  return (
    <div className="min-h-full ">
      <div className="h-[100px]"></div>
      <Landing />
      <AboutSection />
      <Footer />
      <Credits />
    </div>
  );
}
