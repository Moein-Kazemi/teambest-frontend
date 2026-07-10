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

            <div className="hover-3d">
              {/* content */}
              <figure className="max-w-100 rounded-2xl">
                <img
                  src="https://img.daisyui.com/images/stock/creditcard.webp"
                  alt="3D card"
                />
              </figure>
              {/* 8 empty divs needed for the 3D effect */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ANOTHER SECTION OR SOME SECTIONS TO SHOW THE FEATURES OF THE APP */}
    </main>
  );
}
