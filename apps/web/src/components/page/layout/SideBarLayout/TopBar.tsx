"use client";

import React, { ReactNode } from "react";

interface TopbarProps {
  leftEnhancer?: ReactNode;
  title: string;
}

const Topbar: React.FC<TopbarProps> = ({ leftEnhancer, title }) => {
  return (
    <div className="flex flex-row w-full mb-6 items-center">
      {leftEnhancer}
      <div className="ml-10 text-2xl font-bold">{title}</div>
    </div>
  );
};

export default Topbar;
