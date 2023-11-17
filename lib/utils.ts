import { ReadonlyURLSearchParams } from "next/navigation"
import { env } from "@/env.mjs"
import { JsonValue } from "@prisma/client/runtime/library"
import { clsx, type ClassValue } from "clsx"
import SuperJSON from "superjson"
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

export function numDigitsSeparation(num: number, digits: number = 3) {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: digits,
  }).format(num)
}
// 123000 -> 123K, 39400 -> 39.4K, 3200 -> 3,200, 240 -> 240
export function convertToShortFormat(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 10000 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`
  } else if (num >= 1000 && num < 10000) {
    return numDigitsSeparation(num)
  }
  return num.toString()
}

export function queryStringToObject<T = Record<string, string>>(url: string) {
  return [...new URLSearchParams(url.split("?")[1])].reduce(
    (a, [k, v]) => {
      a[k as keyof T] = v as string
      return a
    },
    {} as { [K in keyof T]: string }
  )
}

export function objectToQueryString(obj: object): string {
  const searchParams = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    if (value != null) {
      searchParams.append(key, value)
    }
  })

  return searchParams.toString()
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getStatisticDataByJSON<T>(val?: JsonValue): T | null {
  if (!val) {
    return null
  }
  try {
    if (typeof val !== "string") {
      return null
    }
    const data = SuperJSON.parse(val)

    return data as T
  } catch (err) {
    return null
  }
}
