"use client";

import React, { useState, useMemo } from "react";
import { Tag } from "../common/Tag/Tag";

interface FieldItem {
  title: string;
  count: number;
  children?: FieldItem[];
}

interface FieldTreeProps {
  data: FieldItem[];
}

export default function FieldTree({ data }: FieldTreeProps) {
  // Precompute expanded state for parents with children
  const initialExpanded = useMemo(() => {
    const expandedState: Record<string, boolean> = {};
    data.forEach((item) => {
      if (item.children) expandedState[item.title] = true;
    });
    return expandedState;
  }, [data]);

  const [expanded, setExpanded] =
    useState<Record<string, boolean>>(initialExpanded);

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map((field, idx) => (
        <div key={idx}>
          <div
            onClick={() => field.children && toggleExpand(field.title)}
            className="flex items-center justify-between cursor-pointer bg-base-800 border-b border-base-700 px-3 py-2 hover:bg-base-700 rounded-md"
          >
            <div className="flex items-center gap-2">
              {field.children && (
                <span className="text-neutral-400">
                  {expanded[field.title] ? "▾" : "▸"}
                </span>
              )}
              <span className="text-md text-white">{field.title}</span>
            </div>
            <span className="text-md text-white font-bold">{field.count}</span>
          </div>

          {/* Expand Children */}
          {field.children && expanded[field.title] && (
            <div className="pl-8 flex flex-col gap-1 mt-2">
              {field.children.map((child, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-center justify-between text-md text-neutral-300"
                >
                  <div className="flex items-center gap-2">
                    <Tag
                      label={child.title}
                      size="lg"
                      color={
                        child.title === "Blocked"
                          ? "blue"
                          : child.title === "None"
                          ? "red"
                          : child.title === "Alert"
                          ? "green"
                          : child.title === "Logged"
                          ? "orange"
                          : "gray"
                      }
                    />
                  </div>
                  <span className="font-semibold">{child.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
