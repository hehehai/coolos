"use client"

import { useEffect, useRef, useState } from "react"

export const useEyeDropper = () => {
  const isSupport = useRef(false)

  const [color, setColor] = useState("")

  const eyeDropperAbortRef = useRef<AbortController>()
  const eyeDropperRef = useRef<EyeDropper>()

  useEffect(() => {
    isSupport.current = window.isSecureContext && "EyeDropper" in window
    if (isSupport.current) {
      eyeDropperAbortRef.current = new AbortController()
      eyeDropperRef.current = new window.EyeDropper!()
    }
  }, [])

  const onOpenDropper = async () => {
    if (!isSupport.current) return
    try {
      const { signal } = eyeDropperAbortRef.current!
      const { sRGBHex } = await eyeDropperRef.current!.open({ signal })
      setColor(sRGBHex)
      return sRGBHex
    } catch (error) {
      console.log(error)
    }
  }

  const onAbortDropper = () => {
    if (!isSupport.current) return
    eyeDropperAbortRef.current!.abort()
  }

  return {
    color,
    onOpenDropper,
    onAbortDropper,
    isSupport,
  }
}
