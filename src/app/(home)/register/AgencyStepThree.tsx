import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { States } from "@/types/auth-types";
import { registerAgencyUser } from "@/app/actions/authentication";
import SubmitButton from "@/componentUtils/SubmitButton";

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
      await registerAgencyUser(formData);
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
        leaving jokes all over the place: under the king&apos;s pillow, in his
        soup, even in the royal toilet. The king was furious, but he
        couldn&apos;t seem to stop Jokester. And then, one day, the people of
        the kingdom discovered that the jokes left by Jokester were so funny
        that they couldn&apos;t help but laugh. And once they started laughing,
        they couldn&apos;t stop. Jokester began sneaking into the castle in the
        middle of the night and leaving jokes all over the place: under the
        king&apos;s pillow, in his soup, even in the royal toilet. The king was
        furious, but he couldn&apos;t seem to stop Jokester. And then, one day,
        the people of the kingdom discovered that the jokes left by Jokester
        were so funny that they couldn&apos;t help but laugh. And once they
        started laughing, they couldn&apos;t stop.Jokester began sneaking into
        the castle in the middle of the night and leaving jokes all over the
        place: under the king&apos;s pillow, in his soup, even in the royal
        toilet. The king was furious, but he couldn&apos;t seem to stop
        Jokester. And then, one day, the people of the kingdom discovered that
        the jokes left by Jokester were so funny that they couldn&apos;t help
        but laugh. And once they started laughing, they couldn&apos;t stop.
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
            <SubmitButton>Submit</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
export default AgencyStepThree;
