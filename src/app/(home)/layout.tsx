import Topnav from "@/componentUtils/Topnav";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<any> {
  return (
    <div>
      <Topnav />
      <main className=" w-full min-h-full max-h-full ">{children}</main>
    </div>
  );
}
