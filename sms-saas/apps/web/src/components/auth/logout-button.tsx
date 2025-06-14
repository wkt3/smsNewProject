"use client";
import { logout } from "@/actions/logout";
import React from "react";

interface LogOutBtnProps {
  children?: React.ReactNode;
}

const LogOutBtn = ({ children }: LogOutBtnProps) => {
  const onClick = () => {
    logout();
  };
  return <span className="cursor-pointer" onClick={onClick}>{children}</span>;
};

export default LogOutBtn;
