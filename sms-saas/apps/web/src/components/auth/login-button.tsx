"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
    const router=useRouter()
    const onClick = () => {
        router.push("/login")
    }
    if (mode === "modal") {
        return (
            <span>
                TODO:Implement Modal
            </span>
        )
    }
  return <span onClick={onClick} className="cursor-pointer">{children}</span>;
};

export default LoginButton;
