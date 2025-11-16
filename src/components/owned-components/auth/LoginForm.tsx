"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginStates } from "@/types/auth-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { agencyLoginUser } from "@/app/actions/authentication";

import {
    Form,
    FormField,
    FormDescription,
    FormLabel,
    FormItem,
    FormControl,
} from "@/components/ui/form";
type UserType = "agency" | "merchant";

const formSchema = z.object({
    email: z.string().min(3, { message: "Email too short" }).email(),
    password: z.string().min(1, { message: "Password is required" }),
});
const LoginForm = () => {
    const [userType, setUserType] = useState<UserType>("agency");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function handleLogin(formData: LoginStates) {
        setLoading(true);
        if (userType === "agency") {
            const result = await agencyLoginUser({
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                setError(result.error);
            }
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md bg-white shadow-2xl border-0">
            <CardContent className="p-8">
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setUserType("agency")}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${userType === "agency"
                            ? "bg-background text-foreground shadow-sm"
                            : "bg-transparent text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        Agency
                    </button>
                    <button
                        onClick={() => setUserType("merchant")}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${userType === "merchant"
                            ? "bg-background text-foreground shadow-sm"
                            : "bg-transparent text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        Merchant
                    </button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
                        <div className="space-y-2">
                            <FormField
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-foreground">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="example@gmail.com"
                                                {...field}
                                                className="h-12 bg-background border-input"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-foreground">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                                className="h-12 bg-background border-input"
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
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base mt-6"
                            >
                                {loading ? (
                                    <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading </>
                                ) : "Login"}

                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-6 text-center">
                    <a href="/signup" className="text-sm text-black hover:underline">
                        Sign Up Instead
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
