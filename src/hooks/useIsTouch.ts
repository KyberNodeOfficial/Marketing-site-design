import { useState, useEffect } from 'react'

export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return touch
}
