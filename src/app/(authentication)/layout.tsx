import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<any> {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang='en'>
      <head>
        <title>Authentication</title>
      </head>
      <body className={`${inter.className} antialiased`}>
        <div>{children}</div>
      </body>
    </html>
  );
}