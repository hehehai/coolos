import toast from "react-hot-toast"

export async function copyText(text: string | number) {
  if (!navigator?.clipboard) {
    console.warn("Clipboard not supported")
    return false
  }

  // Try to save to clipboard then save it in the state if worked
  try {
    await navigator.clipboard.writeText(text.toString())
    return true
  } catch (error) {
    console.warn("Copy failed", error)
    return false
  }
}

export async function copyTextHasToast(
  text: string | number,
  msg = "Copy success"
) {
  const success = await copyText(text)
  if (success) {
    if (msg) {
      toast.success(msg)
    }
  } else {
    toast.error("Copy failed")
  }
}
