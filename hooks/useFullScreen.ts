import { RefObject, useEffect, useState } from "react"

export interface UseFullScreenOptions {
  onClose?: () => void
}

export const useFullScreen = (
  elRef: RefObject<Element>,
  options?: UseFullScreenOptions
) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const enter = async () => {
    if (!elRef.current) return
    if (isFullScreen) return

    await elRef.current.requestFullscreen()
    setIsFullScreen(true)
  }

  const exit = async () => {
    if (!elRef.current) return
    if (!isFullScreen) return

    await document.exitFullscreen()
    setIsFullScreen(false)
    options?.onClose?.()
  }

  const toggle = () => {
    if (isFullScreen) {
      exit()
    } else {
      enter()
    }
  }

  const handleCallback = () => {
    let nextState = true
    if (!elRef.current) {
      nextState = false
    } else if (!document.fullscreenElement) {
      nextState = false
    } else {
      const isFull = document.fullscreenElement === elRef.current
      nextState = isFull
    }
    setIsFullScreen(nextState)
    if (nextState) {
      options?.onClose?.()
    }
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleCallback)

    return () => {
      document.removeEventListener("fullscreenchange", handleCallback)
    }
  }, [])

  return {
    isFullScreen,
    enter,
    exit,
    toggle,
  }
}
