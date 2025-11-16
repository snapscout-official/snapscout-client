import MainContainer from "@/componentUtils/MainContainer";
import React from "react";
import { Canvassing } from "./Canvassing";
import { LoginTab } from "./LoginTab";
import Header from "@/components/owned-components/Header";
import HeroSection from "@/components/owned-components/HeroSection";
import LoginForm from "@/components/owned-components/auth/LoginForm";

// function Login() {
//     return (
//         <MainContainer>
//             <div className="h-[150px] lg:h-[250px]"></div>
//             <div className="grid md:grid-cols-2 h-full">
//                 <Canvassing />
//                 <LoginTab />
//             </div>
//         </MainContainer>
//     );
// }

function LoginV2() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gradient-start via-brand-navy to-gradient-end">
            {/* <Header /> */}

            <main className="min-h-screen flex items-center justify-center px-6 py-24">
                <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="flex justify-center ">
                        <LoginForm />
                    </div>
                    <div className="hidden lg:flex">
                        <HeroSection />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginV2;
