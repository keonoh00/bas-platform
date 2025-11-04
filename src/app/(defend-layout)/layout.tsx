import ClientLayoutShell from "@/components/ClientLayoutShell/ClientLayoutShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayoutShell>{children}</ClientLayoutShell>;
}
