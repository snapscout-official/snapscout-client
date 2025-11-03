import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-xl font-bold">SnapScout</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-white/80 hover:text-white transition-colors">
                        About Us
                    </a>
                    <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                        Contact Us
                    </a>
                    <a href="#help" className="text-white/80 hover:text-white transition-colors">
                        Help
                    </a>
                    <Button variant="secondary" className="bg-white text-foreground hover:bg-white/90">
                        Get Started
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
