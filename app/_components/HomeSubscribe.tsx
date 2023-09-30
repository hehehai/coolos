"use client"

import { memo } from "react"
import toast from "react-hot-toast"
import useSWRMutation from "swr/mutation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { subscribe } from "../_actions/subscribe"

const HomeSubscribe = memo(() => {
  const { trigger, isMutating } = useSWRMutation("/api/send", subscribe, {
    onSuccess: () => {
      toast.success("Thank you for subscribing!")
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(`Subscribe error: ${err.message}`)
      }
      console.log(err)
    },
  })
  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement
    }
    if (!formElements.email.value) {
      toast.error("Please enter your email")
      return
    }
    await trigger({ email: formElements.email.value })
  }

  return (
    <div className="flex w-full items-center">
      <div className="mr-4 text-xl">📬</div>
      <form className="flex grow" onSubmit={handleSubscribe}>
        <Input
          className="grow"
          placeholder="Weekly latest color report"
          type="email"
          name="email"
        />
        <Button className="ml-3" type="submit" disabled={isMutating}>
          <span
            className={cn(isMutating && "i-lucide-loader-2 mr-2 animate-spin")}
          />
          <span>Subscribe</span>
        </Button>
      </form>
    </div>
  )
})

HomeSubscribe.displayName = "HomeSubscribe"

export default HomeSubscribe
