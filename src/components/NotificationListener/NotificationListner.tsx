"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ToastProvider/ToastProvider";
import { ws } from "@/lib/WebSocketService";

export default function NotificationListener() {
  const showToast = useToast();

  useEffect(() => {
    const handler = (data: {
      message: string;
      type?: "info" | "success" | "error" | "warning";
      duration?: number;
    }) => {
      const { message, type = "info", duration = 3000 } = data;
      showToast(message, { type, duration });
    };

    ws.on("notification", handler);
    return () => ws.off("notification", handler);
  }, [showToast]);

  return null;
}
