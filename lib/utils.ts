import { ReadonlyURLSearchParams } from "next/navigation"
import { env } from "@/env.mjs"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const appEnv = env

export function absoluteUrl(path: string) {
  return `${appEnv.NEXT_PUBLIC_APP_URL}${path}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}

// 调整数值到限定范围内（环）
export function adjustValue(val: number, full: number): number {
  if (val < 0) {
    return full + val
  }

  if (val > full) {
    return val % full
  }

  return val
}

// 下载 svg
export function downloadSVG(svgCode: string, name?: string) {
  "use client"
  const blob = new Blob([svgCode], { type: "image/svg+xml" })

  const url = URL.createObjectURL(blob)

  // 创建a标签下载
  const a = document.createElement("a")
  a.href = url
  a.download = `${name ?? Date.now()}.svg`

  document.body.appendChild(a)
  a.click()

  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

// 在新标签打开 svg
export function openSVGinNewTab(svgCode: string) {
  "use client"

  return window.open("")?.document.write(svgCode)
}

const CID_PREFIX = "CID__"

export function generateIdByRandom() {
  return Math.random().toString(36).substring(2)
}

export function generateCombinedId() {
  return `${CID_PREFIX}${Date.now()}${generateIdByRandom()}`
}

export function firstCharUpper(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
