import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/lib/providers";
import { auth } from "@/auth";
import SessionContextProvider from "@/componentUtils/SessionContextProvider";
import Head from "next/head";
const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
    weight: ['400', '500', '600', '700'], // regular, medium, semibold, bold
    style: ['normal'],         // include italic variants });
})

export const metadata: Metadata = {
    title: "Snapscout",
    description: "Snapscout Philippines",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): Promise<any> {
    const session = await auth();
    return (
        <html lang="en">
            <head>
                <title>Snapscout</title>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={`${inter.className} antialiased`}>
                <SessionContextProvider value={session}>
                    <Providers>{children}</Providers>
                    <Toaster />
                </SessionContextProvider>
            </body>
        </html>
    );
}
