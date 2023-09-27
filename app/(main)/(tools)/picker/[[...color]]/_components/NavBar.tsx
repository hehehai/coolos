"use client"

import { memo, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"
import { useAnchorPoint } from "@/hooks/useAnchorPoint"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

import { NavItems } from "../constants.schema"

const NavBar = memo(({ navItems }: { navItems: NavItems }) => {
  const navRef = useRef<HTMLDivElement>(null)
  const navStuck = useIntersectionObserver(navRef, {
    threshold: [1],
    logicFn: (entry) => entry.intersectionRatio < 1,
  })
  const navKeys = useMemo(() => Object.keys(navItems), [navItems])
  const [navAnchorPoint, setAnchorPoint] = useAnchorPoint(navKeys)

  return (
    <div
      ref={navRef}
      className={cn(
        `sticky top-[-1px] border-b border-transparent bg-white py-4`,
        {
          "border-gray-200": navStuck,
        }
      )}
    >
      <ul className="mx-auto flex max-w-2xl items-center justify-between">
        {Object.entries(navItems).map(([key, item]) => (
          <li
            key={key}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 hover:bg-gray-100",
              {
                "bg-blue-100 text-blue-600": navAnchorPoint === key,
              }
            )}
            onClick={() => setAnchorPoint(key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
})

NavBar.displayName = "NavBar"

export default NavBar
