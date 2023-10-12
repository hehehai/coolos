import { SvgSpinners90RingWithBg } from "@/components/icons/Loading"

export const PageLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-4xl">
      <SvgSpinners90RingWithBg className="animate-spin" />
    </div>
  )
}
