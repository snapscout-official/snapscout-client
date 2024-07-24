import { useOptimistic, type ReactElement } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MessageType } from "@/types/product-types";
import { Message } from "./Message";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type ThreadProps = {
  messages: MessageType[];
};
const MessageSchema = z.object({
  message: z.string().min(1),
});
export function Thread({ messages }: ThreadProps): ReactElement {
  const [optimisticMessage, setOptimisticMessage] = useOptimistic<
    MessageType[],
    string
  >(messages, (state, newMessage) => [
    ...state,
    { content: newMessage, creator: 1, sending: true },
  ]);
  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });
  function handleMessageSubmit(formData: z.infer<typeof MessageSchema>) {
    setOptimisticMessage(formData.message);
  }
  return (
    <div className="h-full flex flex-col">
      <div className="w-full border-[1px] border-gray-300 flex-1 ">
        <div className="flex flex-col justify-end h-full">
          {optimisticMessage.map((message: MessageType, idx: number) => (
            <Message key={idx} content={message.content} />
          ))}
        </div>
      </div>
      <div className="border-[1px] border-gray-300 py-3 px-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleMessageSubmit)}>
            <FormField
              name="message"
              render={({ field }) => (
                <div className="flex w-full items-center gap-2 ">
                  <FormItem className="w-full ">
                    <Textarea
                      {...field}
                      className="resize-none min-h-[40px] max-h-[100px]"
                    />
                  </FormItem>
                  <Button>Send</Button>
                </div>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
