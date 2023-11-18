"use client"

import React from "react"
import Link from "next/link"
import { SignedIn } from "@clerk/nextjs"

import { toolIntro } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const tools: { title: string; href: string; description: string }[] = [
  {
    title: toolIntro["palette-generator"].name,
    href: "/palette",
    description: toolIntro["palette-generator"].slug,
  },
  {
    title: toolIntro["explore-palette"].name,
    href: "/explore-palette",
    description: toolIntro["explore-palette"].slug,
  },
  {
    title: toolIntro["contrast-checker"].name,
    href: "/contrast",
    description: toolIntro["contrast-checker"].slug,
  },
  {
    title: toolIntro["color-picker"].name,
    href: "/picker",
    description: toolIntro["color-picker"].slug,
  },
  {
    title: toolIntro["gradient-palette"].name,
    href: "/gradient-palette",
    description: toolIntro["gradient-palette"].slug,
  },
  {
    title: toolIntro["color-names"].name,
    href: "/colors",
    description: toolIntro["color-names"].slug,
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const HomeNav = ({ showDashboard = false }: { showDashboard?: boolean }) => {
  return (
    <NavigationMenu position="right">
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger size={"sm"} className="bg-transparent">
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tools.map((tool) => (
                <ListItem key={tool.title} title={tool.title} href={tool.href}>
                  {tool.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger size={"sm"} className="bg-transparent">
            Go Pro
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <span className="i-lucide-palette h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Coolos 👑
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Enjoy more color patterns and explore your own color
                      matching.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Palette Visualizer">
                Preview your colors on real designs for a better visual
                understanding.
              </ListItem>
              <ListItem href="/docs/installation" title="Browser Plugin">
                Install the plugin to your browser.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Image Picker">
                Extract beautiful colors from an image.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {showDashboard && (
          <SignedIn>
            <NavigationMenuItem>
              <Link href="/panel" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({ size: "sm" }),
                    "bg-transparent"
                  )}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </SignedIn>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

HomeNav.displayName = "HomeNav"

export default HomeNav
