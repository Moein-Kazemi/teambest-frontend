"use client";

import { authAPI } from "@/lib/api";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    // CLEAR COOKIE BEFORE LOGOUT
    const clearRoleCookieRes = await authAPI.clearRoleCookie();
    if (clearRoleCookieRes.success) {
      signOut({ callbackUrl: "/login" });
    } else {
      toast.error("خروج از سیستم ناموفق");
      router.replace("/dashboard");
    }
  };
  return (
    <div className="p-4 border-t border-base-300" onClick={handleLogout}>
      <button className="btn btn-outline btn-error w-full">خروج</button>
    </div>
  );
}

export default LogoutButton;
