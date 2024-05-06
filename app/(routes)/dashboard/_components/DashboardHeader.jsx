import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-10 shadow-sm border-b flex justify-between items-center">
      <div></div>
      <div>
        <UserButton
          appearance={{
            elements: {
              userButtonBox: {
                flexDirection: "row-reverse",
              },
              userButtonOuterIdentifier: "text-[16px] pl-0",
              avatarBox: "w-8 h-8",
            },
          }}
          showName={true}
        />
      </div>
    </div>
  );
}

export default DashboardHeader;
