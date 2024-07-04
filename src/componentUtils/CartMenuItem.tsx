import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type CartButtonProp = {
  children: React.ReactNode;
  clickHandler: () => {};
};
export default function CartMenuItem({
  children,
  clickHandler,
}: CartButtonProp) {
  return <DropdownMenuItem onClick={clickHandler}>{children}</DropdownMenuItem>;
}
