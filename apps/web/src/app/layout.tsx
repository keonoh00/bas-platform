import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "~/components/ToastProvider/ToastProvider";
import NotificationListner from "~/components/NotificationListener/NotificationListner";
import SideBarLayout from "~/components/page/layout/SideBarLayout";

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
          <SideBarLayout>{children}</SideBarLayout>
          <NotificationListner />
        </ToastProvider>
      </body>
    </html>
  );
}
