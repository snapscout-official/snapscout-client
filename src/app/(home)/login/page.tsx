import MainContainer from "@/componentUtils/MainContainer";
import React from "react";
import { Canvassing } from "./Canvassing";
import { LoginTab } from "./LoginTab";

function Login() {
  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 w-full">
        <LoginTab />
        <Canvassing />
      </div>
    </MainContainer>
  );
}

export default Login;
