import { useEffect, useState, useRef } from 'react'
import { easeOutExpo } from '../utils/lerp'

const STATS = [
  { value: 320, suffix: '%', label: 'Avg. Client ROI' },
  { value: 50, suffix: '+', label: 'Active Brands' },
  { value: 2.4, suffix: 'M', label: 'Leads Generated', scale: 1 },
  { value: 98, suffix: '%', label: 'Retention Rate' },
]

type StatsProps = {
  inView: boolean
  reducedMotion: boolean
}

export function Stats({ inView, reducedMotion }: StatsProps) {
  const [counts, setCounts] = useState([0, 0, 0, 0])
  const [done, setDone] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || reducedMotion) {
      setCounts(STATS.map((s) => s.value))
      setDone(true)
      return
    }
    if (started.current) return
    started.current = true
    const duration = 2000
    const start = performance.now()
    let rafId = 0
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = easeOutExpo(t)
      setCounts(
        STATS.map((s) => {
          const v = s.value * eased
          return Math.round(v * (s.scale ? 10 : 1)) / (s.scale ? 10 : 1)
        })
      )
      if (t < 1) rafId = requestAnimationFrame(tick)
      else setDone(true)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, reducedMotion])

  return (
    <section className="stats" id="stats">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div key={s.label} className="stats-item" data-done={done}>
            <span className="stats-value">
              {counts[i]}
              {s.suffix}
            </span>
            <span className="stats-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
