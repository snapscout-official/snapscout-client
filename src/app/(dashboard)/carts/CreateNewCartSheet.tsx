import Image from "next/image";
import User from "@/public-assets/user.svg";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import NewCartField from "./NewCartField";
export default async function CreateNewCartSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="text-text-secondary shadow-none bg-transparent inline-flex p-2 gap-x-2 items-center hover:bg-transparent ">
                    <Image src={User} alt="cart-icon" />
                    <span className="text-lg">Create New Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="space-y-4 px-6">
                <SheetHeader>
                    <SheetTitle>Create New Cart</SheetTitle>
                </SheetHeader>
                <NewCartField />
            </SheetContent>
        </Sheet>
    );
}
