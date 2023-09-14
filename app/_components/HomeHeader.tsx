'use client';

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import HomeNav from "./HomeNav";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const HomeHeader = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/sign-in");
  };

  return (
    <div className={cn("max-w-7xl mx-auto w-full", inter.className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold">Coolor</div>
          <div className="ml-20">
            <HomeNav />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleLogin}>Login</Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

HomeHeader.displayName = "HomeHeader";

export default HomeHeader;
