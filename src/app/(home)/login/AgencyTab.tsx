"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { inter } from "@/app/ui/fonts";
import { agencyLoginUser } from "@/app/actions/authentication";
import { LoginStates } from "@/types/auth-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
    Form,
    FormField,
    FormDescription,
    FormLabel,
    FormItem,
    FormControl,
} from "@/components/ui/form";
const formSchema = z.object({
    email: z.string().min(3, { message: "Email too short" }).email(),
    password: z.string().min(1, { message: "Password is required" }),
});
export default function AgencyTab() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function handleLogin(formData: LoginStates) {
        setLoading(true);
        const result = await agencyLoginUser({
            email: formData.email,
            password: formData.password,
        });

        if (result?.error) {
            setError(result.error);
        }
        setLoading(false);
    }
    return (
        <Card className="bg-[#F1F5F9] min-w-full border-none p-5 ">
            <CardContent className="w-full p-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)}>
                        <div className="space-y-5">
                            <FormField
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`${inter.className}`}>
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-[#E6E6E6] rounded-[.5rem] bg-white"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`${inter.className}`}>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-[#E6E6E6] rounded-[.5rem] bg-white font-light "
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {error ? (
                                <FormDescription className="text-red-600 text-md">
                                    {error}
                                </FormDescription>
                            ) : null}
                            <div className="mt-5 flex justify-end w-full">
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="bg-[#0F172A] text-white rounded-[.5rem] p-5 hover:bg-[#0F172A]"
                                >
                                    {loading ? (
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    ) : null}
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
