"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between item-center border shadow-md">
      <Image src={"./logo.svg"} alt="Logo" width={160} height={100} />
      {isSignedIn ? (
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
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
