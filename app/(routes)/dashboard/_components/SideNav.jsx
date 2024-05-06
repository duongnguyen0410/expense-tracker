"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, Wallet, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: Wallet,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();
  const router = useRouter();

  return (
    <div className="h-screen p-10">
      <Image src={"/logo.svg"} alt="Logo" width={160} height={100} onClick={() => router.replace('/')} className={"cursor-pointer"}/>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2
              key={menu.id}
              className={`flex gap-2 items-center
                        text-gray-500 font-medium 
                        p-5 cursor-pointer rounded-md 
                        hover:text-primary hover:bg-blue-100
                        ${path == menu.path && "text-primary bg-blue-100"}
                        `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
