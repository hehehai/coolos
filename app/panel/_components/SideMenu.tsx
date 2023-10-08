"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import { menus } from "./SiderMenu"

export const SideMenu = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {menus.map((menu) => (
        <Link key={menu.name} href={menu.href} legacyBehavior passHref>
          <div
            className={cn(
              navigationMenuTriggerStyle(),
              "flex w-full cursor-pointer justify-start space-x-3"
            )}
          >
            <span className={cn(menu.icon, "text-lg")} />
            <span>{menu.name}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
