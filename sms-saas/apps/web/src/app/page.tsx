import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";

const font = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center p-24 mb-10">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-lg",
            font.className
          )}
        >
          🔐Wkt3 Auth
        </h1>
        <p className={cn("text-lg", font.className)}>
          Simple Authentication Service.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <LoginButton>
          <Button
            variant="default"
            size="default"
            className={cn("btn cursor-pointer", font.className)}
          >
            Login
          </Button>
        </LoginButton>
      </div>
    </main>
  );
};

export default HomePage;
