import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { States } from "@/types/auth-types";
import { registerUser } from "@/app/actions/authentication";

const stageThreeSchema = z.object({
  acceptTermCondition: z.boolean({
    required_error: "Must accept terms and conditions to proceed",
  }),
});

function AgencyStepThree({ globalStates }: { globalStates: States }) {
  const [error, setError] = useState<string | null>();
  const form = useForm<z.infer<typeof stageThreeSchema>>({
    resolver: zodResolver(stageThreeSchema),
  });
  async function signUser(formData: States) {
    try {
      await registerUser(formData);
    } catch (err) {
      console.log(err);
    }
  }
  async function onSubmit(data: z.infer<typeof stageThreeSchema>) {
    if (!data.acceptTermCondition) {
      setError("Must accept terms and conditions");
      return;
    }
    await signUser(globalStates);
  }
  return (
    <div className="space-y-5">
      <ScrollArea className="w-full h-[300px]">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester. And then, one day, the people of the kingdom discovered
        that the jokes left by Jokester were so funny that they couldn't help
        but laugh. And once they started laughing, they couldn't stop. Jokester
        began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in
        the royal toilet. The king was furious, but he couldn't seem to stop
        Jokester. And then, one day, the people of the kingdom discovered that
        the jokes left by Jokester were so funny that they couldn't help but
        laugh. And once they started laughing, they couldn't stop.Jokester began
        sneaking into the castle in the middle of the night and leaving jokes
        all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop
        Jokester. And then, one day, the people of the kingdom discovered that
        the jokes left by Jokester were so funny that they couldn't help but
        laugh. And once they started laughing, they couldn't stop.
      </ScrollArea>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="acceptTermCondition"
            render={({ field }) => (
              <div className="flex rounded-md items-center gap-5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div>
                  <p>Accept terms and condition</p>
                  <p>You agree to our Terms of Service and Privacy Policy</p>
                </div>
                <FormMessage />
                {error ? <p className="text-red-600"> {error}</p> : null}
              </div>
            )}
          />
          <div className="mt-5 flex justify-end w-full">
            <Button
              type="submit"
              className="bg-[#0F172A] text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
export default AgencyStepThree;
