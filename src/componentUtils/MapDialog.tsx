import { type ReactElement } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { interLight } from "@/app/ui/fonts";
type MapDialogProps = {
  children: React.ReactNode;
};
export function MapDialog({ children }: MapDialogProps): ReactElement {
  return (
    <Dialog>
      <DialogTrigger
        className={`${interLight.className} underline text-[#64748B] text-right w-full`}
      >
        Show Map Preview
      </DialogTrigger>
      <DialogContent className="min-w-[1500px] h-screen">
        {children}
      </DialogContent>
    </Dialog>
  );
}
