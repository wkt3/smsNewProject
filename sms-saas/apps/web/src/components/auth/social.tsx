"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <Button
        onClick={() => onClick("google")}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <FcGoogle className="h-5 w=5" />
      </Button>
      <Button
        onClick={() => onClick("github")}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <FaGithub className="h-5 w=5" />
      </Button>
    </div>
  );
};

export default Social;
