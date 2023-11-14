import { useState } from "react"

export const useKeyLoading = <T = string>() => {
  const [loading, setLoading] = useState(new Set<T>())

  const isLoading = (...key: T[]) => {
    return key.some((k) => loading.has(k))
  }

  const startLoading = (...key: T[]) => {
    key.forEach((k) => loading.add(k))
    setLoading(new Set(loading))
  }

  const stopLoading = (...key: T[]) => {
    key.forEach((k) => loading.delete(k))
    setLoading(new Set(loading))
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}
