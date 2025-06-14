import { ExtendedUser } from "@/next-auth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { User } from "@prisma/client";

interface UserInfoProps {
  user?: ExtendedUser | User;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full pt-[200px]">
        <Card className="w-[600px] shadow-md">
          <CardHeader>
            <p className="text-2xl font-semibold text-center">{label}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium">Id</p>
              <p className="truncate text-xs max-w-[180px]font-mono p-1 bg-slate-100 rounded-md text-black">
                {user?.id}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium">Name</p>
              <p className="truncate text-xs max-w-[180px]font-mono p-1 bg-slate-100 rounded-md text-black">
                {user?.name}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium ">Email</p>
              <p className="truncate text-xs max-w-[180px]font-mono p-1 bg-slate-100 rounded-md text-black">
                {user?.email}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium ">Role</p>
              <p className="truncate text-xs max-w-[180px]font-mono p-1 bg-slate-100 rounded-md text-black">
                {user?.role}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium">Profile</p>
              <p className="truncate text-xs max-w-[180px]font-mono p-1 bg-slate-100 rounded-md text-black">
                {user?.profile}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium ">2FAuth</p>
              <Badge
                variant={user?.isTwoFactorEnabled ? "default" : "destructive"}
              >
                {user?.isTwoFactorEnabled ? "ON" : "OFF"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserInfo;
