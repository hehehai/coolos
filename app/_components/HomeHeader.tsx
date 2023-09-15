import HomeNav from "./HomeNav";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import HeaderAuth from "./HeaderAuth";

const inter = Inter({ subsets: ["latin"] });

const HomeHeader = () => {
  return (
    <div className={cn("max-w-7xl mx-auto w-full", inter.className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold">Coolor</div>
          <div className="ml-20">
            <HomeNav />
          </div>
        </div>
        <HeaderAuth></HeaderAuth>
      </div>
    </div>
  );
};

HomeHeader.displayName = "HomeHeader";

export default HomeHeader;
