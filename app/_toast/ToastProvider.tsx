"use client";

import { Toaster } from "sonner";

function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        offset={10}
        duration={2000}
        visibleToasts={4}
        toastOptions={{
          success: {
            style: {
              background: "#22c55e", // سبز
              color: "#ffffff",
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              background: "#ef4444", // قرمز
              color: "#ffffff",
              fontWeight: "bold",
            },
          },
        }}
      />
    </>
  );
}

export default ToastProvider;
