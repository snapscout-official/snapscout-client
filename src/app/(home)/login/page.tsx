import MainContainer from "@/componentUtils/MainContainer";
import React from "react";
import { Canvassing } from "./Canvassing";
import { LoginTab } from "./LoginTab";

function Login() {
  return (
    <MainContainer>
      <div className="h-[150px] lg:h-[250px]"></div>
      <div className="grid md:grid-cols-2 h-full">
        <Canvassing />
        <LoginTab />
      </div>
    </MainContainer>
  );
}

export default Login;
