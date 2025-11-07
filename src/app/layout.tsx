import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider/ToastProvider";
import NotificationListner from "@/components/NotificationListener/NotificationListner";
import ClientLayoutShell from "@/components/ClientLayoutShell/ClientLayoutShell";

export const metadata: Metadata = {
  title: "BAS Platform",
  description: "Breach and Attack Simulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <ClientLayoutShell>{children}</ClientLayoutShell>
          <NotificationListner />
        </ToastProvider>
      </body>
    </html>
  );
}
