"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogOutBtn from "./logout-button";
import { LogOutIcon } from "lucide-react";

const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || "/images/placeholder.jpg"} />
          <AvatarFallback className="bg-sky-500">
            <FaUser size={20} className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 align=end">
        <LogOutBtn>
          <LogOutIcon/>
        </LogOutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
