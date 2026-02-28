"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

type UserType = "agency" | "merchant";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    tinNumber: z
        .string()
        .min(6, { message: "TIN Number must be at least 6 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function SignupForm() {
    const [userType, setUserType] = useState<UserType>("agency");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            tinNumber: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(_data: FormValues) {
        setLoading(true);
        setError(undefined);
        // TODO: wire to registerAgencyUser / registerMerchantUser based on userType
        setLoading(false);
    }

    return (
        <div className="w-full max-w-md">
            <Card className="bg-[#F1F5F9] border-0 shadow-2xl rounded-2xl overflow-hidden">
                {/* Tab switcher */}
                <div className="flex bg-[#F1F5F9] p-2 gap-1">
                    <button
                        type="button"
                        data-testid="agency-tab"
                        onClick={() => setUserType("agency")}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                            userType === "agency"
                                ? "bg-white shadow-sm text-foreground"
                                : "bg-transparent text-muted-foreground hover:bg-white/50"
                        }`}
                    >
                        Agency
                    </button>
                    <button
                        type="button"
                        data-testid="merchant-tab"
                        onClick={() => setUserType("merchant")}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                            userType === "merchant"
                                ? "bg-white shadow-sm text-foreground"
                                : "bg-transparent text-muted-foreground hover:bg-white/50"
                        }`}
                    >
                        Merchant
                    </button>
                </div>

                <CardContent className="px-6 pb-6 pt-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-foreground">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-11 bg-white border-[#E6E6E6] rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tinNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-foreground">
                                            TIN Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-11 bg-white border-[#E6E6E6] rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-foreground">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                className="h-11 bg-white border-[#E6E6E6] rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-foreground">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="h-11 bg-white border-[#E6E6E6] rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <FormDescription className="text-red-600 text-sm">
                                    {error}
                                </FormDescription>
                            )}

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#0F172A] text-white hover:bg-[#0F172A]/90 rounded-lg px-8"
                                >
                                    {loading && (
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="mt-5 text-center">
                <Link
                    href="/login"
                    className="text-sm text-white underline underline-offset-4 hover:text-white/80 transition-colors"
                >
                    Log In Instead
                </Link>
            </div>
        </div>
    );
}
