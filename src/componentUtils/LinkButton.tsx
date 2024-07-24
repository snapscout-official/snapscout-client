import { Button } from "@/components/ui/button";

export default function LinkButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string | null;
}) {
  return (
    <Button variant="link" asChild className={className ? className : ""}>
      {children}
    </Button>
  );
}
