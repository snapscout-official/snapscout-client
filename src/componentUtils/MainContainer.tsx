import React, { ReactNode } from "react";

function MainContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-[80%] min-h-full">{children}</div>;
}

export default MainContainer;
