import { useOptimistic, useRef, type ReactElement } from "react";
import { MessageType } from "@/types/product-types";
import { Message } from "./Message";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMySession } from "@/app/custom-hooks/sessionContext";
// import EmojiPicker fom "emoji-picker-react";
type ThreadProps = {
  messages: MessageType[];
  sendMessage: (message: string) => Promise<void>;
  merchantName: string;
};
const messageSchema = z.object({
  message: z.string().min(1),
});
export function Thread({
  messages,
  sendMessage,
  merchantName,
}: ThreadProps): ReactElement {
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useMySession();
  //refactor

  async function formAction(data: FormData) {
    const formData = Object.fromEntries(data);
    const parsed = messageSchema.safeParse(formData);
    if (!parsed.success) {
      return;
    }
    const message = form.getValues()?.message;
    addOptimisticMessage(message);
    form.reset();
    formRef.current?.reset();
    await sendMessage(message);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    MessageType[],
    string
  >(messages, (state, newMessage) => {
    if (!user) {
      throw new Error("Something is wrong");
    }
    return [
      { content: newMessage, creator: user.id, status: "sending" },
      ...state,
    ];
  });
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  return (
    <Card className="h-full max-h-full flex flex-col rounded-none">
      <div className="p-4 border-[1px] border-gray-300">{merchantName}</div>
      <div className="w-full border-[1px] border-gray-300 flex-1 flex flex-col-reverse overflow-y-auto p-3 ">
        <div className="flex flex-col-reverse gap-y-4 ">
          {optimisticMessages.map((message: MessageType, idx: number) => (
            <Message key={idx} message={message} userId={user?.id} />
          ))}
        </div>
      </div>
      <div className="border-[1px] border-gray-300 py-3 px-3">
        <form ref={formRef} action={formAction}>
          <div className="flex w-full items-center gap-2 ">
            <Textarea
              placeholder="Say Something"
              className="resize-none min-h-[40px] max-h-[100px]"
              {...form.register("message")}
              onKeyDown={async (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
            />
            {/* <EmojiPicker open={false} /> */}
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
