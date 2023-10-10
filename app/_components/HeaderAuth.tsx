"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { appEnv } from "@/lib/utils"

const HeaderAuth = () => {
  const router = useRouter()

  return (
    <div className="flex items-center space-x-3">
      <SignedIn>
        <UserButton
          afterSignOutUrl={appEnv.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
        />
      </SignedIn>
      <SignedOut>
        <Button onClick={() => router.replace("/sign-in")} size={"sm"}>
          Login
        </Button>
      </SignedOut>
    </div>
  )
}

export default HeaderAuth
