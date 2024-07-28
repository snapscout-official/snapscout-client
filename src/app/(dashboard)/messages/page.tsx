import { inter } from "@/app/ui/fonts";
import { Card } from "@/components/ui/card";

export default function Messages() {
  return (
    <Card className="col-span-9 bg-gray-300 rounded-none flex items-center justify-center">
      <div className={`${inter.className} text-xl`}>
        Select a conversation to start messaging
      </div>
    </Card>
  );
}
