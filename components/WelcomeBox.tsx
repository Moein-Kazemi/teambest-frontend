import Link from "next/link";

interface WelcomeBoxProps {
  name: string;
  role: string;
}

function WelcomeBox({ name, role }: WelcomeBoxProps) {
  return (
    <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">سلام، {name}! 👋</h1>
      <p className="text-lg opacity-90 mb-6">
        به پلتفرم تیم بست خوش اومدی .{" "}
        {role === "user"
          ? "اکنون به عنوان کاربر عادی در تیم بست هستی ، ثبت نام خودت رو تکمیل کن تا بتونی تیم تشکیل بدی یا به تیم دیگه ای اضافه بشی."
          : role === "member"
            ? "اکنون به عنوان اعضای تیم ثبت نام کردی منتظر بمون تا مدیر تیم تورو به تیمش اضافه کنه"
            : "شما به عنوان مدیر تیم ثبت نام خود را تکمیل کردید ، اما هنوز تیمی نساخته اید پس لطفا ابتدا تیم تشکیل دهید."}
      </p>
      <div className="flex justify-center">
        {role === "user" && (
          <Link
            href="/profile/complete"
            className="btn btn-warning w-full max-w-80 mr-auto ml-auto "
          >
            تکمیل ثبت نام
          </Link>
        )}
        {role === "manager" && (
          <Link
            href="/team"
            className="btn btn-warning w-full max-w-80 mr-auto ml-auto "
          >
            تیم من
          </Link>
        )}
      </div>
    </div>
  );
}

export default WelcomeBox;
