import React, { ReactNode } from "react";

function CenterContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-full mt-[4rem] flex flex-col items-center w-[80%]">
      {children}
    </div>
  );
}

export default CenterContainer;
