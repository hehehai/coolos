"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { isAdmin } from "@/lib/user"
import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

const menus = [
  {
    name: "Home",
    href: "/panel",
    icon: "i-lucide-home",
    admin: true,
  },
  {
    name: "Users",
    href: "/panel/users",
    icon: "i-lucide-users",
    admin: true,
  },
  {
    name: "Colors",
    href: "/panel/colors",
    icon: "i-lucide-verified",
  },
  {
    name: "Palettes",
    href: "/panel/palettes",
    icon: "i-ic-outline-palette",
  },
]

const SideMenu = ({ role }: { role?: string }) => {
  const path = usePathname()

  const visibleMenus = useMemo(() => {
    if (isAdmin(role)) {
      return menus
    }
    return menus.filter((menu) => !menu.admin)
  }, [role])

  return (
    <div className="flex flex-col space-y-4 p-4">
      {visibleMenus.map((menu) => (
        <Link key={menu.name} href={menu.href} legacyBehavior passHref>
          <div
            className={cn(
              navigationMenuTriggerStyle(),
              "flex w-full cursor-pointer justify-start space-x-3",
              {
                "bg-accent text-accent-foreground": path === menu.href,
              }
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

export default SideMenu
