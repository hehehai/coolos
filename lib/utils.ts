import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 调整数值到限定范围内（环）
export function adjustValue(val: number, full: number): number {
  if (val < 0) {
    return full + val;
  }

  if (val > full) {
    return val % full;
  }

  return val;
}
