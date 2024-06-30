import MainContainer from "@/componentUtils/MainContainer";
import React from "react";
import { Canvassing } from "./Canvassing";
import { LoginTab } from "./LoginTab";

function Login() {
  return (
    <MainContainer>
      <div className="grid md:grid-cols-2">
        <Canvassing />
        <LoginTab />
      </div>
    </MainContainer>
  );
}

export default Login;
