import Link from "next/link";
import Image from "next/image";

function TopBar() {
  return (
    <Link href={"/"}>
      <div className="ml-26 py-4">
        <Image
          src="/assets/logo-light.png"
          width={140}
          height={150}
          alt="KSIGN Logo"
          className="object-contain"
        />
      </div>
    </Link>
  );
}

enum NavMenus {
  Assessment = "/eval-assessment",
  Evaluate = "/evaluate",
}

function NavBar() {
  return (
    <div className="flex items-center bg-base-900 text-gray-300 pl-24 py-3 gap-4">
      {Object.keys(NavMenus).map((key) => (
        <Link
          key={key}
          href={NavMenus[key as keyof typeof NavMenus]}
          className="p-2"
        >
          {key}
        </Link>
      ))}
    </div>
  );
}

export default function EvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-base-950 text-white">
      <TopBar />

      <NavBar />

      <div className="flex flex-1">
        <main className="bg-gray-850 px-26 py-6 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
