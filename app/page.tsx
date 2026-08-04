import { vazirMedium } from "./fonts";
import Link from "next/link";
import {
  ChartNoAxesCombined,
  Check,
  CheckSquare,
  FolderClosed,
  MessagesSquare,
  Terminal,
  User,
} from "lucide-react";
import Card3d from "@/components/Card3d";
import FeatureBox from "@/components/FeatureBox";
import ProccessBox from "@/components/ProcessBox";

export default function Home() {
  return (
    <main className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      <section className="hero min-h-[60vh] bg-base-100">
        <div className="hero-content text-center grid grid-cols-12">
          <Card3d src="/images/consept.png" />
          <div className="max-w-2xl space-y-8  col-span-12 sm:col-span-4">
            <h1
              className={`text-3xl ${vazirMedium.className} md:text-4xl lg:text-5xl`}
            >
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
      <section className="space-y-5">
        <div className="flex flex-col items-center gap-1">
          <h2 className={`${vazirMedium.className} text-2xl md:text-3xl`}>
            همه ابزار هایی که تیم شما نیاز دارد
          </h2>
          <p className="text-gray-600 text-sm md:text-lg">
            از مدیریت تیم تا گزارش گیری همه چیز در تیم بست
          </p>
        </div>
        <div className="flex justify-center flex-wrap lg:justify-between gap-4">
          <FeatureBox
            icon={<FolderClosed color="blue" />}
            title="مدیریت پروژه"
            description="ساخت پروژه ، تعیین مراحل ،پیگیری پیشرفت"
            iconColorBg="#d2ccf5"
          />
          <FeatureBox
            icon={<CheckSquare color="green" />}
            title="مدیریت وظایف"
            description="تخصیص وظایف ، اولویت بندی و مهلت زمانی"
            iconColorBg="#a7f7a7"
          />
          <FeatureBox
            icon={<ChartNoAxesCombined color="aqua" />}
            title="گزارش عملکرد"
            description="گزارش های دقیق ، نمودار های پیشرفت و تحلیل عملکرد تیم"
            iconColorBg="#c2fef6"
          />
          <FeatureBox
            icon={<MessagesSquare color="purple" />}
            title="چت تیمی"
            description="گفت وگوهای گروهی ، امکان اشتراک فایل و امکانات هوشمند"
            iconColorBg="#fec5ff"
          />
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex flex-col items-center gap-1">
          <h2 className={`${vazirMedium.className} text-2xl md:text-3xl`}>
            نحوه کار تیم بست
          </h2>
          <p className="text-gray-600 text-sm md:text-lg">
            در چند مرحله ساده تیم خود را مدیریت کنید.
          </p>
        </div>
        <div className="flex gap-3">
          <ProccessBox step={1} title="ایجاد تیم" icon={<User />} />
          <ProccessBox step={2} title="اضافه کردن اعضا" icon={<Terminal />} />
        </div>
      </section>
      {/* ANOTHER SECTION OR SOME SECTIONS TO SHOW THE FEATURES OF THE APP */}
    </main>
  );
}
