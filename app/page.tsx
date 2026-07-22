import { vazirMedium } from "./fonts";
import Link from "next/link";
import { Check } from "lucide-react";
import Card3d from "@/components/Card3d";

export default function Home() {
  return (
    <main>
      <section className="hero min-h-[60vh] bg-base-100">
        <div className="hero-content text-center grid grid-cols-12">
          <Card3d src="/images/consept.png" />
          <div className="max-w-2xl space-y-8  col-span-12 sm:col-span-4">
            <h1 className={`text-3xl ${vazirMedium.className} md:text-5xl`}>
              مدیریت تیم،
              <span className="text-primary block mt-4">بدون پیچیدگی.</span>
            </h1>
            <p className="text-lg  text-right">
              مدیریت تیم ها ، وظایف و پروژه ها در یک فضای هوشمند آنلاین و حرفه
              ای.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 text-right">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
                  <Check size={16} />
                </span>
                <div className="block">مدیریت پروژه</div>
              </div>
              <div className="flex items-center gap-1 text-right">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
                  <Check size={16} />
                </span>
                <div className="block">مدیریت وظایف و زمانبندی</div>
              </div>
              <div className="flex items-center gap-1 text-right">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
                  <Check size={16} />
                </span>
                <div className="block">گزارش گیری</div>
              </div>
              <div className="flex items-center gap-1 text-right">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
                  <Check size={16} />
                </span>
                <div className="block">همکاری تیمی</div>
              </div>
            </div>
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              شروع
            </Link>
          </div>
        </div>
      </section>

      {/* ANOTHER SECTION OR SOME SECTIONS TO SHOW THE FEATURES OF THE APP */}
    </main>
  );
}
