import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      {/* by percentage: w-[25%], by ratio: w-1/6 */}
      {/* md, lg, xl: how big the screen is. changing ratio depending on screen size */}
      <div className="w-[14%] md:w[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">SM-Dashboard</span>
        </Link>
        <Menu/>
      </div>
      {/* RIGHT */}
      {/* overflow-scroll: allows to scroll within this div */}
      <div className="w-[86%] md:w[8%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
        <Navbar/>
        {children}
      </div>
    </div>
  );
}
