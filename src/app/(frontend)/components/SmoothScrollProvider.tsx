'use client'

import { useEffect } from 'react'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false
    let idleCallbackId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const startSmoothScroll = async () => {
      const { default: Lenis } = await import('lenis')

      if (cancelled) return

      const lenis = new Lenis({
        duration: 2,
        smoothWheel: true,
      })

      let frameId = 0
      const raf = (time: number) => {
        lenis.raf(time)
        frameId = requestAnimationFrame(raf)
      }

      frameId = requestAnimationFrame(raf)
      cleanup = () => {
        cancelAnimationFrame(frameId)
        lenis.destroy()
      }
    }

    const hasIdleCallback = typeof window.requestIdleCallback === 'function'

    if (hasIdleCallback) {
      idleCallbackId = window.requestIdleCallback(startSmoothScroll, { timeout: 1800 })
    } else {
      timeoutId = globalThis.setTimeout(startSmoothScroll, 800)
    }

    return () => {
      cancelled = true
      cleanup?.()

      if (idleCallbackId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleCallbackId)
      }

      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId)
    }
  }, [])

  return <>{children}</>
}
