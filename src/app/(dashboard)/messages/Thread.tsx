import { useEffect, useOptimistic, useRef, type ReactElement } from "react";
import { MessageType } from "@/types/product-types";
import { Message } from "./Message";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
type ThreadProps = {
  messages: MessageType[];
  setMessage: (message: string) => Promise<void>;
};
const messageSchema = z.object({
  message: z.string().min(1),
});
export function Thread({ messages, setMessage }: ThreadProps): ReactElement {
  const formRef = useRef<HTMLFormElement>(null);
  const outerDivRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  console.log("innerDiv:", innerDivRef.current?.clientHeight);
  console.log(
    "scroll to:",
    innerDivRef.current?.clientHeight! - outerDivRef.current?.clientHeight!,
  );
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
    { content: newMessage, creator: 1, sending: true },
    ...state,
  ]);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });
  useEffect(() => {
    outerDivRef.current?.scrollTo({
      top:
        innerDivRef.current?.clientHeight! - outerDivRef.current?.clientHeight!,
      left: 0,
    });
  }, [messages]);

  return (
    <div className=" h-full max-h-full flex flex-col">
      <Card
        className="w-full border-[1px] border-gray-300 flex-1 flex flex-col-reverse overflow-y-auto space-y-4 rounded-none p-3 "
        ref={outerDivRef}
      >
        <div ref={innerDivRef} className="flex flex-col-reverse">
          {optimisticMessages.map((message: MessageType, idx: number) => (
            <Message key={idx} message={message} />
          ))}
        </div>
      </Card>
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
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
