import type { Metadata } from "next";
import "@/app/globals.css" with { type: "css" };
import { vazirLight } from "./fonts";
import Navbar from "@/ui/Navbar";
import ToastProvider from "./_toast/ToastProvider";
import { SessionProviders } from "./_sessionProvider/SessionProvider";

export const metadata: Metadata = {
  title: {
    template: "TeamBest / %s",
    default: "TeamBest",
  },

  description:
    "نرم افزاری جامع برای مدیریت تیم ، نظارت بر فعالیت افراد ، تعیرف وظایف ، مسئولیت ها ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-theme="light">
      <body className={` antialiased ${vazirLight.className}`}>
        <ToastProvider>
          <Navbar />
          <SessionProviders>{children}</SessionProviders>
        </ToastProvider>
      </body>
    </html>
  );
}
