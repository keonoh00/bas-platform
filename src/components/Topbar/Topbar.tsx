"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "../Sidebar/Sidebar";

interface TopbarProps {
  leftEnhancer?: ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ leftEnhancer }) => {
  const pathname = usePathname();

  const flatMenu = MENU_ITEMS.flatMap((item) =>
    item.children ? item.children : item
  );

  const matchingMenu = flatMenu.find((item) => item.url === pathname);

  return (
    <>
      <div className="flex flex-row w-full mb-6 items-center">
        {leftEnhancer}
        <div className="ml-10 text-2xl font-bold">
          {matchingMenu ? matchingMenu.name : ""}
        </div>
      </div>
    </>
  );
};

export default Topbar;
