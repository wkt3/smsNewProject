"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CircleDot,
  Menu,
  Moon,
  BadgeCheck,
  Sun,
  User,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Receipt } from "lucide-react";
import { Group } from "lucide-react";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import { Label } from "../ui/label";
import { signOut } from "@/auth";

const MoreDropdown = () => {
  const [showModelToggle, setShowModelToggle] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="hover:text-blue-500 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!showModelToggle && (
          <>
            <DropdownMenuItem>
              <User size={20} className="hover:text-blue-500 !mr-3" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Receipt size={20} className="hover:text-blue-500 !mr-3" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Group size={20} className="hover:text-blue-500 !mr-3" />
              Team
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BadgeCheck size={20} className="hover:text-blue-500 !mr-3" />
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem" onClick={()=>signOut}>
              <LogOut size={20} className="hover:text-blue-500" />
              <p>LogOut</p>
            </DropdownMenuItem>
            <>
              <div className="flex items-center border-b border-gray-200 dark:boredr-neutral-700 py-3.5 px-2.5">
                <CircleDot
                  size={20}
                  className="hover:text-blue-500 cursor-pointer"
                  onClick={() => setShowModelToggle(false)}
                />
                Switch Appereance
                {theme === "dark" ? (
                  <Moon size={20} className="hover:text-blue-500 ml-auto" />
                ) : (
                  <Sun size={20} className="hover:text-blue-500 ml-auto" />
                )}
                <p className="font-bold ml-1" />
              </div>
              <Label
                htmlFor="dark-mode"
                className="menuItem hover:text-blue-500"
              >
                Dark-Mode
                <DropdownMenuItem className="ml-auto !p-0 hover:text-blue-500">
                  <Switch
                    className="ml-auto transition hover:text-blue-500"
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  />
                </DropdownMenuItem>
              </Label>
            </>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropdown;
