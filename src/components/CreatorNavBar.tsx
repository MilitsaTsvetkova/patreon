"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { BarChartIcon, BookPlusIcon, EditIcon, UserIcon } from "lucide-react";
import Signout from "./Signout";

const CreatorNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between space-x-6 py-3">
      <Tabs
        defaultValue={pathname}
        onValueChange={(value) => router.push(value)}
      >
        <TabsList>
          <TabsTrigger value="/creator/profile">
            <UserIcon />
            Profile
          </TabsTrigger>
          <TabsTrigger value="/creator/post">
            <EditIcon />
            Create
          </TabsTrigger>
          <TabsTrigger value="/creator/posts">
            <BookPlusIcon />
            Posts
          </TabsTrigger>
          <TabsTrigger value="/creator/analytics">
            <BarChartIcon />
            Analytics
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Signout />
    </div>
  );
};

export default CreatorNavBar;
