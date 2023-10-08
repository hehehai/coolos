"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

const menus = [
  {
    name: "Home",
    href: "/panel",
    icon: "i-lucide-home",
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
    icon: "i-lucide-candy",
  },
]

const SideMenu = () => {
  const path = usePathname()

  return (
    <div className="flex flex-col space-y-4 p-4">
      {menus.map((menu) => (
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
