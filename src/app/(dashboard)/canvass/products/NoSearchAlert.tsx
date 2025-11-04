"use client";
import { inter } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NoSearchAlertProps {
    message: string
}
export default function NoSearchAlert({ message }: NoSearchAlertProps) {
    const router = useRouter();
    return (
        <div className="h-[500px] flex flex-col justify-center items-center">
            <p
                className={`${inter.className} text-red-900 text-2xl text-center mb-3`}
            >
                {message}
            </p>
            <Button
                onClick={() => {
                    router.back();
                }}
                className="bg-snapGreen rounded-[.5rem] p-4"
            >
                Go Back
            </Button>
        </div>
    );
}
