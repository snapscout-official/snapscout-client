import { AboutSection } from "./AboutSection";
import Credits from "./Credits";
import Footer from "./Footer";
import Landing from "./Landing";
export default async function Home() {
  return (
    <div className="min-h-full ">
      <Landing />
      <AboutSection />
      <Footer />
      <Credits />
    </div>
  );
}
