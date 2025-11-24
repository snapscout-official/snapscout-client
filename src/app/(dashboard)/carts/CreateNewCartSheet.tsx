import Image from "next/image";
import { PackagePlus } from 'lucide-react';
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
                    <PackagePlus />
                    <span className="text-md font-normal">Create New Cart</span>
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
