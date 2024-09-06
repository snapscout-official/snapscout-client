import { type ReactElement } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
type MapDialogProps = {
  children: React.ReactNode;
};
export function MapDialog({ children }: MapDialogProps): ReactElement {
  return (
    <Dialog>
      <DialogTrigger>Show Map Preview</DialogTrigger>
      <DialogContent className="min-w-[1500px] h-screen">
        {children}
      </DialogContent>
    </Dialog>
  );
}
