import BottomNav from "@/ui/BottomNav";
import Navbar from "@/ui/Navbar";
import { vazirLight } from "../fonts";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-theme="light">
      <body className={` antialiased ${vazirLight.className}`}>
        <Navbar />
        <main className="h-screen w-full px-4">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}

export default RootLayout;
