"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth, UserButton } from "@clerk/nextjs"
import { match, P } from "ts-pattern"

import { Button } from "@/components/ui/button"

const HeaderAuth = () => {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const authKit = useMemo(() => {
    return match(isSignedIn)
      .with(false, P.nullish, () => (
        <Button onClick={() => router.replace("/sign-in")} size={"xs"}>
          Login
        </Button>
      ))
      .otherwise(() => <UserButton afterSignOutUrl="/" />)
  }, [isSignedIn, router])

  return <div className="flex items-center space-x-3">{authKit}</div>
}

export default HeaderAuth
