"use client"

import { useRouter } from "next/navigation"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

const HeaderAuth = () => {
  const router = useRouter()

  return (
    <div className="flex items-center space-x-3">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
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
