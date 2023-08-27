'use client';

import React, { useRef } from "react";
import { throttleByRaf } from "@/lib/throttle-by-raf";

const firstGtAnchor = (anchorsTops: [string, number][], point: number) => {
  for (let i = 0; i < anchorsTops.length; i++) {
    const [key, top] = anchorsTops[i]
    if (top <= point) {
      return key
    }
  }
  return null
}

export const useAnchorPoint = (anchors: string[]) => {
  const [anchorPoint, setAnchorPoint] = React.useState<string | null>(null);

  const anchorsTops = useRef<[string, number][]>([])

  const handleScroll = throttleByRaf(() => {
    const scrollTop = document.documentElement.scrollTop
    const viewHalf = document.documentElement.clientHeight / 2
    const pointLIne = scrollTop + viewHalf

    const nextAnchor = firstGtAnchor(anchorsTops.current, pointLIne)

    setAnchorPoint(nextAnchor)
  })

  React.useEffect(() => {
    anchors.forEach((anchor) => {
      const anchorDom = document.getElementById(anchor);
      if (!anchorDom) {
        return;
      }
      anchorsTops.current.push([anchor, anchorDom.offsetTop])
    })

    if (anchorsTops.current.length) {
      anchorsTops.current.sort((a, b) => b[1] - a[1])
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [anchors])

  const handleScrollToAnchor = (key: string) => {
    const anchorPoint = anchorsTops.current.find(([a, _]) => a === key)

    if (anchorPoint?.length) {
      const [_, top] = anchorPoint
      const viewHalf = document.documentElement.clientHeight / 2

      window.scrollTo({
        top: Math.max(top - viewHalf, 0),
        behavior: 'smooth'
      })
    }
  }

  return [anchorPoint, handleScrollToAnchor] as const
}
