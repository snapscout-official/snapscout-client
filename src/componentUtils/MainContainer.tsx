import React, { ReactNode } from "react";

function MainContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-[80%]">{children}</div>;
}

export default MainContainer;
