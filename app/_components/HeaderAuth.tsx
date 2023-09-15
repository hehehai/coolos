"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { match, P } from "ts-pattern";

const HeaderAuth = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const authKit = useMemo(() => {
    return match(isSignedIn)
      .with(false, P.nullish, () => (
        <Button onClick={() => router.replace("/sign-in")}>Login</Button>
      ))
      .otherwise(() => <UserButton afterSignOutUrl="/" />);
  }, [isSignedIn]);

  return <div className="flex items-center space-x-3">{authKit}</div>;
};

export default HeaderAuth;
