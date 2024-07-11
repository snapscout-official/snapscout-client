import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/lib/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snapscout",
  description: "Snapscout Philippines",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<any> {
  return (
    <html lang="en">
      <head>
        <title>Snapscout</title>
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
