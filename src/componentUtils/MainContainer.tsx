import React, { ReactNode } from "react";

function MainContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-[90%] mt-[5rem]">{children}</div>;
}

export default MainContainer;
