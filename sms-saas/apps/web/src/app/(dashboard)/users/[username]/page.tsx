import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CardList from "@/components/dashboard/cards/CardList";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge, BadgeCheck, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import EditButton from "@/components/dashboard/extras/EditButton";

const SingleUserPage = () => {
  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/users">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>john-doe</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Container */}
        <div className="flex flex-col xl:flex-row gap-8 mt-4">
          {/* left */}
          <div className="w-full xl:w-1/3 space-y-6">
            {/* user badges */}
            <div className="flex gap-2 bg-primary-foreground p-4 rounded-lg">
              <h1 className="text-xl font-semibold">User Badges</h1>
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className="rounded-full bg-blue-500/30 border-1 border-blue-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-bold mb-2">Verified User</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been verified by the Admin
                  </p>
                </HoverCardContent>
              </HoverCard>
              {/* second hover card */}
              <HoverCard>
                <HoverCardTrigger>
                  <Shield
                    size={36}
                    className="rounded-full bg-orange-500 border-1 border-orange-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-bold mb-2">Awarded User</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been Awarded for their contributions
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
            {/* information container */}
            <div className="bg-primary-foreground p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">User Information</h1>
                <EditButton/>
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex flex-col gap-2 mb-8">
                  <p className="text-sm text-muted-foreground">
                    Profile Completion
                  </p>
                  <Progress value={66} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Username:</span>
                  <span>john-doe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Email:</span>
                  <span>johndoe@gmail</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Mobile:</span>
                  <span>+91 8300000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Location:</span>
                  <span>Chandigarh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Role:</span>
                  <Badge>Admin</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Joined on Dated :2012.05.05</p>
              </div>
            </div>
            {/* cards list container */}
            <div className="bg-primary-foreground p-4 rounded-lg">
              <CardList title="Recent Transactions" />
            </div>
          </div>
          {/* Right */}
          <div className="w-full xl:w-2/3 space-y-6">
            {/* user card container */}
            <div className="bg-primary-foreground p-4 rounded-lg">
              User Card
            </div>
            {/* chart container */}
            <div className="bg-primary-foreground p-4 rounded-lg">Chart</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUserPage;
