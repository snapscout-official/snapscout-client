import { useOptimistic, useRef, type ReactElement } from "react";
import { MessageType } from "@/types/product-types";
import { Message } from "./Message";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
type ThreadProps = {
  messages: MessageType[];
  setMessage: (message: string) => Promise<void>;
};
const messageSchema = z.object({
  message: z.string().min(1),
});
export function Thread({ messages, setMessage }: ThreadProps): ReactElement {
  const formRef = useRef<HTMLFormElement>(null);
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
    await setMessage(message);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    MessageType[],
    string
  >(messages, (state, newMessage) => [
    ...state,
    { content: newMessage, creator: 1, sending: true },
  ]);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  return (
    <div className=" h-full max-h-full flex flex-col">
      <div className="w-full overflow-y-auto border-[1px] border-gray-300 flex-1 max-h-[816px]">
        <div className="flex flex-col h-full space-y-4">
          {optimisticMessages.map((message: MessageType, idx: number) => (
            <Message key={idx} message={message} />
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
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
