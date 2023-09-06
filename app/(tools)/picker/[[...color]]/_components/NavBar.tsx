'use client';

import { useAnchorPoint } from "@/hooks/useAnchorPoint";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { memo, useMemo, useRef } from "react";
import { NavItems } from "../constants.schema";

const NavBar = memo(({ navItems }: { navItems: NavItems }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const navStuck = useIntersectionObserver(navRef, {
    threshold: [1],
    logicFn: (entry) => entry.intersectionRatio < 1,
  });
  const navKeys = useMemo(() => Object.keys(navItems), [navItems])
  const [navAnchorPoint, setAnchorPoint] = useAnchorPoint(navKeys);

  return <div
    ref={navRef}
    className={cn(
      `sticky -top-[1px] py-4 bg-white border-b border-transparent`,
      {
        "border-gray-200": navStuck,
      }
    )}
  >
    <ul className="max-w-2xl mx-auto flex items-center justify-between">
      {Object.entries(navItems).map(([key, item]) => (
        <li
          key={key}
          className={cn(
            "px-4 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer",
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
})

NavBar.displayName = "NavBar"

export default NavBar
