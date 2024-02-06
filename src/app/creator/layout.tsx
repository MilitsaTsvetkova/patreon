import React, { type PropsWithChildren } from "react";
import CreatorNavBar from "../../components/CreatorNavBar";
import { api } from "../../trpc/server";
import { redirect } from "next/navigation";

const CreatorLayout = async ({ children }: PropsWithChildren) => {
  const profile = await api.profile.getCreatorProfile.query();
  if (!profile) {
    redirect("/login");
  }

  if (profile.type === "fan") {
    redirect("/");
  }
  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-center p-6">
      <CreatorNavBar />
      {children}
    </div>
  );
};

export default CreatorLayout;
