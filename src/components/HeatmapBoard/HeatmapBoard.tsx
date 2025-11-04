"use client";

import React, { useEffect, useRef, useState } from "react";
import HeatmapCard from "./HeatmapCard";
import Legend from "./Legend";
import { Tactic } from "@/api/evaluate/types";

interface HeatmapBoardProps {
  sortedAndFilteredTactics: Tactic[];
}

export default function HeatmapBoard({
  sortedAndFilteredTactics,
}: HeatmapBoardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Legend />
      <div className="relative">
        {showLeft && (
          <div className="absolute top-6 left-0 w-30 h-full bg-gradient-to-r from-base-900 to-transparent z-10 pointer-events-none" />
        )}
        {showRight && (
          <div className="absolute top-6 right-0 w-30 h-full bg-gradient-to-l from-base-900 to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto overflow-y-auto mt-6 pb-4"
        >
          <div className="flex gap-4 min-w-fit justify-around">
            {sortedAndFilteredTactics.map((tactic, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[145px] flex flex-col rounded-lg p-2"
              >
                <div className="text-xs font-bold text-neutral-300 text-center mb-2 h-[40px] flex flex-col justify-center items-center space-y-1">
                  <p className="max-w-full break-words whitespace-normal text-center">
                    {tactic.name}
                  </p>
                  <p className="font-medium text-gray-50 text-xs">
                    {tactic.techniques.length} Techniques
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {tactic.techniques.map((technique, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex flex-col gap-2 overflow-y-auto"
                    >
                      <HeatmapCard technique={technique} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
