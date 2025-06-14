"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { admin } from "@/actions/admin";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    });
  };
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed Api Route");
      } else {
        toast.error("FORBIDDEN");
      }
    });
  };
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || session.user.role !== "ADMIN") {
      return router.push("/error");
    }
  }, [router, session]);

  return (
    <div className="flex flex-col items-center justify-center pt-[200px]">
      <h1 className="mb-10 text-3xl">🤺 ADMIN🤺</h1>
      <Card className="w-[600px]">
        <CardHeader className="flex flex-col items-center justify-center h-full"></CardHeader>
        <CardContent className="space-y-4">
          <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message="You are allowed to see this content" />
          </RoleGate>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Admin Only Api Route</p>
            <Button variant="default" onClick={() => onApiRouteClick()}>
              Click To Test
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Admin Only Server Actions</p>
            <Button variant="default" onClick={() => onServerActionClick()}>
              Click To Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminPage;
