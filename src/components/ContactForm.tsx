import { useState, useRef } from 'react'
import { submitContact } from '../api/client'

type ContactFormProps = {
  inView: boolean
  reducedMotion: boolean
}

export function ContactForm({ inView, reducedMotion }: ContactFormProps) {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const lastClickRef = useRef<{ x: number; y: number } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (success) return
    setError(null)
    setLoading(true)
    const btn = btnRef.current
    if (btn && lastClickRef.current) {
      setRipple(lastClickRef.current)
    } else if (btn) {
      const rect = btn.getBoundingClientRect()
      setRipple({ x: rect.width / 2, y: rect.height / 2 })
    }
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const spend = (form.elements.namedItem('spend') as HTMLSelectElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    if (!name || !email || !message) {
      setLoading(false)
      setRipple(null)
      setError('Please fill in all required fields.')
      return
    }
    try {
      await submitContact({ name, email, spend, message })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setRipple(null)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-line" aria-hidden />
      <div className="contact-grid">
        <div
          className="contact-left"
          data-inview={inView}
          data-reduced={reducedMotion}
        >
          <h2 className="contact-title">Ready to Scale Your Growth?</h2>
          <p className="contact-subtitle">
            Book a free strategy call with our growth experts. No fluff, just data-driven insights tailored to your brand.
          </p>
          <ul className="contact-checklist">
            <li className="contact-checklist-item">
              <div className="contact-check-circle">
                <span className="material-symbols-outlined contact-check-icon">check</span>
              </div>
              <p className="contact-check-text">Detailed audit of your current digital presence</p>
            </li>
            <li className="contact-checklist-item">
              <div className="contact-check-circle">
                <span className="material-symbols-outlined contact-check-icon">check</span>
              </div>
              <p className="contact-check-text">Custom multi-channel scaling roadmap</p>
            </li>
            <li className="contact-checklist-item">
              <div className="contact-check-circle">
                <span className="material-symbols-outlined contact-check-icon">check</span>
              </div>
              <p className="contact-check-text">ROI projections based on real industry data</p>
            </li>
          </ul>
        </div>

        <div
          className="contact-right"
          data-inview={inView}
          data-reduced={reducedMotion}
        >
          <div className="contact-card" data-success={success}>
            {!success ? (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && (
                  <p className="contact-error" role="alert">{error}</p>
                )}
                <div className="contact-row-2col">
                  <div className="contact-field">
                    <label className="contact-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="contact-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="contact-field">
                    <label className="contact-label">Company Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      required
                      className="contact-input contact-input-glow"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="contact-field">
                  <label className="contact-label">Current Monthly Spend</label>
                  <select name="spend" className="contact-select" defaultValue="$5k - $20k" disabled={loading}>
                    <option>$5k - $20k</option>
                    <option>$20k - $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>
                <div className="contact-field">
                  <label className="contact-label">Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your goals..."
                    rows={4}
                    required
                    className="contact-textarea"
                    disabled={loading}
                  />
                </div>
                <button
                  ref={btnRef}
                  type="submit"
                  className="contact-submit"
                  disabled={loading}
                  onClick={(e) => {
                    const rect = (e.target as HTMLElement).getBoundingClientRect()
                    lastClickRef.current = {
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    }
                  }}
                >
                  {ripple && (
                    <span
                      className="contact-ripple"
                      style={{ left: ripple.x, top: ripple.y }}
                    />
                  )}
                  {loading ? (
                    <span className="contact-spinner" aria-hidden />
                  ) : (
                    <>
                      Send My Message
                      <span className="material-symbols-outlined contact-send-icon">send</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="url(#successGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <path className="contact-success-check" d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <p className="contact-success-title">We got your message!</p>
                <p className="contact-success-sub">Expect a reply within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
