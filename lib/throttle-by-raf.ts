import { caf, raf } from "./raf"

export function throttleByRaf(cb: (...args: unknown[]) => void) {
  let timer = 0

  const throttle = (...args: unknown[]): void => {
    if (timer) {
      caf(timer)
    }
    timer = raf(() => {
      cb(...args)
      timer = 0
    })
  }

  throttle.cancel = () => {
    caf(timer)
    timer = 0
  }

  return throttle
}
