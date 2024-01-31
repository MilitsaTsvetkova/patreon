import React, { type PropsWithChildren } from "react";
import CreatorNavBar from "../../components/CreatorNavBar";

const CreatorLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-center p-6">
      <CreatorNavBar />
      {children}
    </div>
  );
};

export default CreatorLayout;
