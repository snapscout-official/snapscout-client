import React, { ReactNode } from "react";

function CenterContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-full flex flex-col items-center w-[80%]">
      {children}
    </div>
  );
}

export default CenterContainer;
