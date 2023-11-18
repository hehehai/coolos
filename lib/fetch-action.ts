import superjson from "superjson"
import { match } from "ts-pattern"

import {
  NoPermissionError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/error"

export async function handleRes(res: Response) {
  const data = await res.json()
  if (!res.ok) {
    match(res.status)
      .with(401, () => {
        throw new UnauthorizedError()
      })
      .with(403, () => {
        throw new NoPermissionError()
      })
      .with(404, () => {
        throw new NotFoundError()
      })
      .with(500, () => {
        throw new ServerError()
      })
      .otherwise(() => {
        throw new Error(`${res.statusText}: ${data?.error}`)
      })
  }

  return data
}

export function getFetchAction<T, R = Record<string, any>>(
  init: RequestInit = {},
  transform?: (data: R) => T
) {
  const fetchAction = async (url: string, { arg }: { arg?: T } = {}) => {
    const res = await fetch(url, {
      method: "POST",
      body: arg ? superjson.stringify(arg) : null,
      ...init,
    })
    const data = await handleRes(res)
    if (transform && data) {
      return transform(data)
    }
    return data
  }

  return fetchAction
}
