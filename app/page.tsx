import Card3d from "@/components/Card3d";
import { vazirMedium } from "./fonts";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero min-h-[60vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1
              className={`text-3xl ${vazirMedium.className} md:text-5xl  mb-6`}
            >
              تیم بست | مدیریت تیم خود را متحول کنید.
            </h1>
            <p className="text-lg mb-8">
              پلتفرمی یکپارچه برای تیم‌های حرفه‌ای. از تشکیل تیم تا گزارش‌گیری،
              همه چیز در دستان شماست.
            </p>
            <p className="text-lg mb-8">طراحی و توسعه معین کاظمی</p>
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              شروع
            </Link>

            <Card3d src="/images/consept.png" />
          </div>
        </div>
      </section>

      {/* ANOTHER SECTION OR SOME SECTIONS TO SHOW THE FEATURES OF THE APP */}
    </main>
  );
}
