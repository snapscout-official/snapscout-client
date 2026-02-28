import Header from "@/components/owned-components/Header";
import { SignupForm } from "./SignupForm";

export default function SignupV2Page() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="min-h-screen flex items-center justify-center px-6 pt-20">
                <SignupForm />
            </main>
        </div>
    );
}
