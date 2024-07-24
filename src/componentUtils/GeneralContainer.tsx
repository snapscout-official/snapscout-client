import { type ReactElement } from "react";

type GeneralContainerProps = {
  children: React.ReactNode;
};
export function GeneralContainer({
  children,
}: GeneralContainerProps): ReactElement {
  return (
    <div className="mx-[20px] w-auto py-4 mt-7 max-h-full xl:mx-[150px] lg:mt-[7rem] "></div>
  );
}
