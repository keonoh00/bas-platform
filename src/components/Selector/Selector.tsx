"use client";

import Image from "next/image";
import React, { ReactNode, HTMLAttributes } from "react";

interface SelectorOption {
  name: string;
  icon: ReactNode | string;
}

interface SelectorProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  options: SelectorOption[];
}

export default function Selector({
  title,
  options,
  className,
  ...props
}: SelectorProps) {
  return (
    <div
      {...props}
      className={`border p-4 rounded-md space-y-4 ${className ?? ""}`}
    >
      <div className="border-b-1 border-gray-300">
        <h2 className="font-bold mb-2">{title}</h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {options.map((option) => (
          <label
            key={option.name}
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <div className="bg-gray-300 rounded-lg flex items-center justify-center w-[180px] h-[80px]">
              {typeof option.icon === "string" ? (
                <Image
                  src={option.icon}
                  alt={option.icon}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              ) : (
                option.icon
              )}
            </div>

            <div className="flex justify-center items-center space-x-2">
              <input type="radio" name="agent" />
              <span className="text-sm">{option.name}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
