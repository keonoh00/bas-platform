"use client";

import React, { useRef } from "react";
import Topbar from "@/components/Topbar/Topbar";
import Sidebar, { SidebarRef } from "@/components/Sidebar/Sidebar";
import { MenuIcon } from "lucide-react";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<SidebarRef>(null);

  return (
    <div className="flex text-white">
      <Sidebar ref={sidebarRef} />
      <div className="flex p-6 w-full flex-col bg-base-950">
        <Topbar
          leftEnhancer={
            <button
              onClick={() => {
                sidebarRef.current?.toggle();
              }}
            >
              <MenuIcon color={"white"} size={32} />
            </button>
          }
        />
        <main className="overflow-y-auto flex w-full">{children}</main>
      </div>
    </div>
  );
}
