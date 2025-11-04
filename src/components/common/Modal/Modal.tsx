// components/Common/Modal.tsx
"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { XIcon } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open) {
      timeout = setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out h-screen",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "relative mx-auto my-12 w-full sm:w-[95%] md:w-[90%] lg:max-w-[1200px] bg-base-900 text-white rounded-md shadow-lg p-6 space-y-6 transition-all duration-300 ease-out transform-gpu",
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-12 scale-95",
          className
        )}
      >
        <div className="flex justify-between items-center border-b-1 border-neutral-500 pb-6">
          <div className="text-lg font-semibold">{title}</div>
          <button onClick={onClose} className="text-xl">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="gap-4 flex flex-col">{children}</div>

        {footer && <div className="flex justify-end space-x-2">{footer}</div>}
      </div>
    </div>
  );
};
