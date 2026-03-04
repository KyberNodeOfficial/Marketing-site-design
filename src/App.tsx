import { useEffect, useRef, useState } from 'react'
import { lerp } from './utils/lerp'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useIsTouch } from './hooks/useIsTouch'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Services } from './components/Services'
import { CaseStudies } from './components/CaseStudies'
import { Testimonials } from './components/Testimonials'
import { ContactForm } from './components/ContactForm'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import './App.css'

const SECTIONS = ['hero', 'services', 'case-studies', 'testimonials', 'contact', 'faq']
const OBSERVED_IDS = ['hero', 'stats', 'services', 'case-studies', 'testimonials', 'contact', 'faq']

export default function App() {
  const reducedMotion = useReducedMotion()
  const isTouch = useIsTouch()
  const [entranceDone, setEntranceDone] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [navScrolled, setNavScrolled] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>('hero')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [cursorHover, setCursorHover] = useState(false)
  const [cursorHero, setCursorHero] = useState(false)
  const [cursorDown, setCursorDown] = useState(false)
  const targetScrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const heroRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Section visibility for reveals & count-up
  const [statsInView, setStatsInView] = useState(false)
  const [servicesInView, setServicesInView] = useState(false)
  const [caseInView, setCaseInView] = useState(false)
  const [testimonialsInView, setTestimonialsInView] = useState(false)
  const [contactInView, setContactInView] = useState(false)
  const [faqInView, setFaqInView] = useState(false)

  // Entrance sequence
  useEffect(() => {
    if (reducedMotion) {
      setEntranceDone(true)
      return
    }
    const t1 = setTimeout(() => setEntranceDone(true), 1200)
    return () => clearTimeout(t1)
  }, [reducedMotion])

  // Smooth scroll (lerp 0.08) — disable on touch
  useEffect(() => {
    const container = containerRef.current
    if (!container || isTouch) return
    let currentScroll = container.scrollTop
    targetScrollRef.current = currentScroll
    let rafId = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const max = container.scrollHeight - window.innerHeight
      targetScrollRef.current = Math.max(0, Math.min(max, targetScrollRef.current + e.deltaY))
    }
    const tick = () => {
      currentScroll = lerp(currentScroll, targetScrollRef.current, 0.08)
      container.scrollTop = currentScroll
      setScrollY(currentScroll)
      rafId = requestAnimationFrame(tick)
    }
    container.addEventListener('wheel', handleWheel, { passive: false })
    rafId = requestAnimationFrame(tick)
    return () => {
      container.removeEventListener('wheel', handleWheel)
      cancelAnimationFrame(rafId)
    }
  }, [isTouch])

  // Native scroll for touch: sync scrollY
  useEffect(() => {
    const container = containerRef.current
    if (!container || !isTouch) return
    const onScroll = () => setScrollY(container.scrollTop)
    container.addEventListener('scroll', onScroll)
    return () => container.removeEventListener('scroll', onScroll)
  }, [isTouch])

  // Navbar: scrolled (80px), hide on scroll down (200px), show on scroll up
  useEffect(() => {
    const y = scrollY
    setNavScrolled(y > 80)
    if (y - lastScrollRef.current > 20 && y > 200) setNavVisible(false)
    if (lastScrollRef.current - y > 20) setNavVisible(true)
    lastScrollRef.current = y
  }, [scrollY])

  // Active section from scroll position
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const tops = SECTIONS.map((id) => {
      const el = document.getElementById(id)
      return el ? el.getBoundingClientRect().top + container.scrollTop : 0
    })
    const y = container.scrollTop + 120
    let idx = 0
    for (let i = 0; i < tops.length; i++) {
      if (y >= tops[i]) idx = i
    }
    setActiveSection(SECTIONS[idx])
  }, [scrollY])

  // IntersectionObserver for sections
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.id
          const inView = e.isIntersecting
          if (id === 'stats') setStatsInView(inView)
          if (id === 'services') setServicesInView(inView)
          if (id === 'case-studies') setCaseInView(inView)
          if (id === 'testimonials') setTestimonialsInView(inView)
          if (id === 'contact') setContactInView(inView)
          if (id === 'faq') setFaqInView(inView)
        })
      },
      { root: container, threshold: 0.15 }
    )
    OBSERVED_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [entranceDone])

  // Mouse position
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Clickable hover detection for cursor
  useEffect(() => {
    const onEnter = () => setCursorHover(true)
    const onLeave = () => setCursorHover(false)
    const clickables = document.querySelectorAll('a, button, [role="button"]')
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [entranceDone])

  // Hero section hover for cursor tint
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onEnter = () => setCursorHero(true)
    const onLeave = () => setCursorHero(false)
    hero.addEventListener('mouseenter', onEnter)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mouseenter', onEnter)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Mousedown/up for cursor squish
  useEffect(() => {
    const onDown = () => setCursorDown(true)
    const onUp = () => setCursorDown(false)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const handleNavClick = (href: string) => {
    const id = href.slice(1)
    const el = document.getElementById(id)
    const container = containerRef.current
    if (el && container && !isTouch) {
      const target = el.getBoundingClientRect().top + container.scrollTop - 80
      targetScrollRef.current = Math.max(0, target)
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app-wrap">
      {/* Custom cursor — desktop only, hidden when reduced motion */}
      {!isTouch && !reducedMotion && (
        <CustomCursor
          mouse={mouse}
          hover={cursorHover}
          hero={cursorHero}
          down={cursorDown}
        />
      )}

      <div
        ref={containerRef}
        className="scroll-container"
      >
        {/* Page load: bg fade black → navy 600ms */}
        <div
          className="page-bg"
          data-entrance={entranceDone}
          data-reduced={reducedMotion}
          aria-hidden
        />

        <Navbar
          scrolled={navScrolled}
          visible={navVisible}
          activeSection={activeSection}
          onNavClick={handleNavClick}
          entranceDone={entranceDone}
        />

        <Hero
          entranceDone={entranceDone}
          scrollY={scrollY}
          onNavClick={handleNavClick}
          isTouch={isTouch}
          mouseX={mouse.x}
          mouseY={mouse.y}
          heroRef={heroRef}
        />

        <Stats inView={statsInView} reducedMotion={reducedMotion} />
        <Services inView={servicesInView} reducedMotion={reducedMotion} />
        <CaseStudies inView={caseInView} reducedMotion={reducedMotion} />
        <Testimonials inView={testimonialsInView} reducedMotion={reducedMotion} />
        <ContactForm inView={contactInView} reducedMotion={reducedMotion} />
        <FAQ inView={faqInView} reducedMotion={reducedMotion} />
        <Footer />
      </div>

      <div className="noise-overlay" aria-hidden />
    </div>
  )
}

// Custom cursor: 8px dot, 32px follower (80ms lerp 0.12), hover 56px + purple tint, hero cyan tint, click squish 0.8
function CustomCursor({
  mouse,
  hover,
  hero,
  down,
}: {
  mouse: { x: number; y: number }
  hover: boolean
  hero: boolean
  down: boolean
}) {
  const dotRef = useRef<HTMLDivElement>(null)
  const followRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: mouse.x, y: mouse.y })

  useEffect(() => {
    let rafId = 0
    const tick = () => {
      posRef.current.x = lerp(posRef.current.x, mouse.x, 0.12)
      posRef.current.y = lerp(posRef.current.y, mouse.y, 0.12)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      }
      if (followRef.current) {
        followRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) scale(${down ? 0.8 : 1})`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [mouse, down])

  return (
    <div className="cursor-wrap" aria-hidden>
      <div
        ref={dotRef}
        className="cursor-dot"
        data-hide={hover}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={followRef}
        className="cursor-follower"
        data-hover={hover}
        data-hero={hero}
        style={{ left: 0, top: 0 }}
      />
    </div>
  )
}
