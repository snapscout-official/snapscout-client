import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type UserType = "agency" | "merchant";

const LoginForm = () => {
    const [userType, setUserType] = useState<UserType>("agency");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login attempt:", { userType, email, password });
    };
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Pietro Schirano"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 bg-background border-input"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="@skirano"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 bg-background border-input"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base mt-6"
                    >
                        Continue
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <a href="#signup" className="text-sm text-white hover:underline">
                        Sign Up Instead
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
