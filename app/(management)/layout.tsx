import BottomNav from "@/ui/BottomNav";

import Sidebar from "@/ui/Sidebar";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="fa" dir="rtl" data-theme="light">
    // <body className={` antialiased ${vazirLight.className} relative`}>
    <>
      {/* <Navbar /> */}
      <main className="grid grid-cols-12 w-full h-[90vh]">
        <Sidebar />
        <section className="h-full w-full px-4 pt-8 pb-14 col-span-12 lg:col-span-10">
          {children}
        </section>
      </main>

      <BottomNav />
    </>
    // </body>
    // </html>
  );
}

export default RootLayout;
