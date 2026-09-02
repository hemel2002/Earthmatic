import { useEffect, useRef, useState } from "react"

/** IntersectionObserver-backed visibility flag, used to stop the 3D hero's
 * render loop when it scrolls offscreen (frameloop="never") rather than
 * just pausing -- avoids burning GPU/battery on an invisible canvas. */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options is expected to be stable/inline per call site
  }, [])

  return { ref, inView }
}
