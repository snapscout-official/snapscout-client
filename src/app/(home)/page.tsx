import { About } from "./About";
import { AboutSection } from "./AboutSection";
import Landing from "./Landing";

export default async function Home() {
  return (
    <div className="min-h-full ">
      <Landing />
      <AboutSection />
    </div>
  );
}
