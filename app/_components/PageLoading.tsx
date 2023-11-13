import { Spinners } from "@/components/icons"

export const PageLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-4xl">
      <Spinners className="animate-spin" />
    </div>
  )
}
