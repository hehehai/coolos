"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth, UserButton } from "@clerk/nextjs"

import { appEnv } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const HeaderAuth = () => {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  const authStatusC = useMemo(() => {
    if (!isLoaded) {
      return <Skeleton className="h-8 w-8 rounded-full" />
    } else if (!isSignedIn) {
      return (
        <Button onClick={() => router.push("/sign-in")} size={"sm"}>
          Login
        </Button>
      )
    }

    return (
      <UserButton
        afterSignOutUrl={appEnv.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
      />
    )
  }, [isLoaded, isSignedIn])

  return <div className="flex items-center space-x-3">{authStatusC}</div>
}

export default HeaderAuth
