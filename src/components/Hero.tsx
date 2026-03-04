import React, { useRef, useEffect, useState } from 'react'
import { lerp } from '../utils/lerp'

const AVATAR_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCE2xnm7NyKs3ibpywa9Yfqa24VEZVk0lY0G7Tn4fyqLWRAjjZ3GYdGGFGPU-d0ChQX0d26AmxZR3s3LxnO-oSIhLf_4jI18T8vDuc-C0XpgZ4JOqC2gnMcztBgSCfpRUoJM-lOgBy6BBycYUG3Wy47GNumPqv4-PSbSdQe83gUTmVQfgI-3SZNlldN7F2Vb3Ipupavs1Xks8i_rYiGt2doIy1B-e3E5P6tmQFO5nE06VtlfD1Ufn79eN52mRnBacEOHvea8IEpZQU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBIN6gQ85wxuqxIkvXLpbqbS_QDtDf79lH2JoTpwEN86SUqNfAT-4u6ziRcN2KFb9_pR7skb0WnwN8EDOxHR5BFNam_Lp4VPYoFORYxXOJQgSrmZR7xCGDkIQsWhI6wQw0Q_N-RG6YjMDX20oj-RjADjTiBmemHq48LKi2nANyrX0YOEgJC9ptIBINctmUwOZZAyQ0YfRQLTKrBGgHxifXHAIXXXK_k44Fd--tAjOEwhc0Jnkdxyx2llGJt_T_ja52PNY62RPaYMWo',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDRMG-O7mjCJCrbYcE1IJeeaIO82tASqVucZqb0FkqhdhTHpBGeaTCuvG0DzmW8R7_8kSrHgVwwFV1DZIuY4WrGRwhpyNXIr4j3aOQBwzTT8QDIUQQ3ztpYjVZ7jUuXTW43Z9esA7LeIjywoYWGOZywVSLW5Nn6AzLGtcOKWwfcTx12rnzljNXXYW-uO64WiJjtCZIV4_dLIUgPnx5WmlseBtcfk-au2eNOVlAsk4lOjLoUkRM2EBnpuV_P8d5j-TLpa2FPHGNXQKk',
]

const BAR_HEIGHTS = [40, 65, 85, 55, 95, 75, 100]
const BAR_GRADIENT = [false, false, true, false, false, false, true]

type HeroProps = {
  entranceDone: boolean
  scrollY: number
  onNavClick: (href: string) => void
  isTouch: boolean
  mouseX: number
  mouseY: number
  heroRef: React.RefObject<HTMLElement | null>
}

export function Hero({
  entranceDone: _entranceDone,
  scrollY,
  onNavClick,
  isTouch,
  mouseX,
  mouseY,
  heroRef,
}: HeroProps) {
  const btn1Ref = useRef<HTMLButtonElement>(null)
  const btn2Ref = useRef<HTMLButtonElement>(null)
  const [magnetic1, setMagnetic1] = useState({ x: 0, y: 0 })
  const [magnetic2, setMagnetic2] = useState({ x: 0, y: 0 })
  const magRef1 = useRef({ x: 0, y: 0 })
  const magRef2 = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isTouch) return
    let id = 0
    const tick = () => {
      for (const [ref, setMag, magRef] of [
        [btn1Ref, setMagnetic1, magRef1] as const,
        [btn2Ref, setMagnetic2, magRef2] as const,
      ] as const) {
        const el = ref.current
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = mouseX - cx
        const dy = mouseY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const t = (80 - dist) / 80
          magRef.current.x = lerp(magRef.current.x, (dx / dist) * 6 * t, 0.3)
          magRef.current.y = lerp(magRef.current.y, (dy / dist) * 6 * t, 0.3)
        } else {
          magRef.current.x = lerp(magRef.current.x, 0, 0.3)
          magRef.current.y = lerp(magRef.current.y, 0, 0.3)
        }
        setMag({ x: magRef.current.x, y: magRef.current.y })
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [mouseX, mouseY, isTouch])

  const exitProgress = Math.min(1, scrollY / 300)
  const heroContentStyle = {
    opacity: 1 - exitProgress,
    transform: `translateY(${-40 * exitProgress}px)`,
  }

  return (
    <section
      id="hero"
      ref={heroRef as React.RefObject<HTMLElement>}
      className="hero"
    >
      <div className="hero-bg">
        <HeroOrbs mouseX={mouseX} mouseY={mouseY} scrollY={scrollY} />
      </div>

      <div className="hero-inner">
        <div className="hero-content" style={heroContentStyle}>
          <span className="hero-eyebrow" data-entrance="eyebrow">
            AI-Powered Marketing Agency
          </span>

          <h1 className="hero-headline" data-entrance="headline">
            We Turn <span className="text-gradient">Clicks</span> Into High-Value Clients
          </h1>

          <p className="hero-subheadline" data-entrance="subheadline">
            Stop burning ad spend. Our data-driven strategies pulse with real-time AI insights to maximize your ROI and scale your revenue.
          </p>

          <div className="hero-buttons" data-entrance="buttons">
            <button
              ref={btn1Ref}
              className="hero-cta-primary"
              style={{ transform: `translate(${magnetic1.x}px, ${magnetic1.y}px)` }}
              onClick={() => onNavClick('#contact')}
            >
              Start Growing <span className="material-symbols-outlined hero-cta-arrow">arrow_forward</span>
            </button>
            <button
              ref={btn2Ref}
              className="hero-cta-secondary"
              style={{ transform: `translate(${magnetic2.x}px, ${magnetic2.y}px)` }}
              onClick={() => onNavClick('#case-studies')}
            >
              See Our Work
            </button>
          </div>

          <div className="hero-trust" data-entrance="trust">
            <div className="hero-avatars">
              {AVATAR_URLS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Client ${i + 1}`}
                  className="hero-avatar"
                  width={40}
                  height={40}
                  loading="lazy"
                />
              ))}
            </div>
            <p className="hero-trust-text">
              Trusted by <span className="hero-trust-bold">500+</span> industry leaders
            </p>
          </div>
        </div>

        <div className="hero-card-col" data-entrance="card">
          <div className="hero-card-wrapper">
            <div className="hero-analytics-card">
              <div className="hero-card-header">
                <div>
                  <p className="hero-card-label">Total Conversion ROI</p>
                  <h3 className="hero-card-value">420.8%</h3>
                </div>
                <div className="hero-card-badge">
                  <span className="material-symbols-outlined hero-badge-icon">trending_up</span>
                  +24.5%
                </div>
              </div>

              <div className="hero-chart">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className={`hero-chart-bar ${BAR_GRADIENT[i] ? 'hero-chart-bar-gradient' : ''}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="hero-card-stats">
                <div className="hero-card-stat-box">
                  <p className="hero-card-stat-label">New Leads</p>
                  <p className="hero-card-stat-value">12,842</p>
                </div>
                <div className="hero-card-stat-box">
                  <p className="hero-card-stat-label">CPC Avg.</p>
                  <p className="hero-card-stat-value">$0.84</p>
                </div>
              </div>
            </div>
            <div className="hero-card-offset" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroOrbs({
  mouseX,
  mouseY,
  scrollY,
}: {
  mouseX: number
  mouseY: number
  scrollY: number
}) {
  const orb1 = useRef<HTMLDivElement>(null)
  const orb2 = useRef<HTMLDivElement>(null)
  const orb3 = useRef<HTMLDivElement>(null)
  const baseX = useRef([0.15, 0.75, 0.5])
  const baseY = useRef([0.25, 0.45, 0.7])
  const drift = useRef([0, 0, 0])
  const targetDrift = useRef([0, 0, 0])

  useEffect(() => {
    const start = Date.now()
    const period = [8000, 10000, 12000]
    let id = 0
    const tick = () => {
      const t = (Date.now() - start) / 1000
      for (let i = 0; i < 3; i++) {
        targetDrift.current[i] = Math.sin(t * (Math.PI * 2 / period[i])) * 40
      }
      for (let i = 0; i < 3; i++) {
        drift.current[i] = lerp(drift.current[i], targetDrift.current[i], 0.02)
      }
      const w = window.innerWidth
      const h = window.innerHeight
      const factors = [0.05, 0.03, 0.02]
      for (let i = 0; i < 3; i++) {
        const el = [orb1, orb2, orb3][i].current
        if (!el) continue
        const bx = baseX.current[i] * w
        const by = baseY.current[i] * h
        const mx = (mouseX - bx) * factors[i]
        const my = (mouseY - by) * factors[i]
        const dx = drift.current[i] + (i === 0 ? mx : i === 1 ? -mx * 0.6 : mx * 0.5)
        const dy = (i === 0 ? my : i === 1 ? -my * 0.5 : my * 0.6)
        el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${1 + scrollY * 0.0001})`
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [mouseX, mouseY, scrollY])

  return (
    <>
      <div ref={orb1} className="hero-orb hero-orb-purple" aria-hidden />
      <div ref={orb2} className="hero-orb hero-orb-cyan" aria-hidden />
      <div ref={orb3} className="hero-orb hero-orb-pink" aria-hidden />
    </>
  )
}
