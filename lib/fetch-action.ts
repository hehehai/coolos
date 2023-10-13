import superjson from "superjson"
import { match } from "ts-pattern"

import {
  NoPermissionError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/error"

export function getFetchAction<T>() {
  const fetchAction = async (url: string, { arg }: { arg: T }) => {
    const res = await fetch(url, {
      method: "POST",
      body: superjson.stringify(arg),
    })
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

  return fetchAction
}
