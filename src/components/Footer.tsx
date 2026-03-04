import { useState } from 'react'
import { submitSubscribe } from '../api/client'

const SOCIAL_ICONS = [
  { alt: 'Twitter', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrikUB78MYIZdymKmLVkuVwzuMKA7l4wAF622EBSNLZ46Gl9F7d1FOGxG7wv810n6PmxGEkFk9Qy7kZlWzHHc2aOFyzSerKLn4lXoVf3K7VGCD9m4c9LCWUCHi0Pnx1Q-4hmiHYhsaoN2eIDFHA1cDM3NizkMr7IjZsg99FWAcE3-_SEgyFTlUcvzjGXk1WzIkyhSWrIs4fVV8WXwah9ICHJscSkfZI3Xb7DIiF-I-PDMzxeT6HhsfMpOsXd87HPbMqu5zzUVn-1E' },
  { alt: 'LinkedIn', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1QQs_pveua0pKQb8kDS-T-M-6hWt9zSsIjYxOmYv467rvhBe46v71_RopvCUMzim44xJQmsg6coXLcQIZwttPIR-JBqdmUuoCVAlLeNHWBdOcYA3suBeB2lnkSJeDYtwSv6RjolXtzF3JxgRgeg6G1Zdxu4cJnaXK6ZZN1m8AtmMpexuxMuLVLyMYHuPjxzXKFEtcS6Jb-QCF1irdTGShBoXueSf-Xjlq-J2jeTeoJKb9A9Ob3vBTjECauaK4Bw7VQKwiIbUcuNc' },
  { alt: 'Instagram', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzQtx4mM9ZsZ-2-va26lFDrI3ry3xs23hqSt3eTCkXiGyBOOpJjv7CImu2dIyZT7miqs9HhJzXCT_NUakfs5Ji9Ory4Qq4jaq5RBufpIuyw5KQLTFjKmck1ugMvfoFu9iA5X2TibT8orViceWIJVVh7X05XgXle9QR74J5pHubWllcWi7LnGCdkBJL1M6PgCVrVwEni9yPq91vwAnHbCgu4udlvD6Pd-aimBSqlD1dfN0mncVKF724_-RYSGKpIwTLukQISALSmlI' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!value) return
    setError(null)
    setLoading(true)
    try {
      await submitSubscribe({ email: value })
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-logo-icon">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <span className="footer-logo-text">KyberNode</span>
            </div>
            <p className="footer-tagline">
              Scaling brands with AI-powered marketing. The intelligence-driven agency powering high-growth performance.
            </p>
            <div className="footer-social">
              {SOCIAL_ICONS.map((s) => (
                <a key={s.alt} href="#" className="footer-social-link" aria-label={s.alt}>
                  <img src={s.img} alt={s.alt} className="footer-social-img" width={16} height={16} loading="lazy" />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-link-list">
              <li><a href="#">Paid Social</a></li>
              <li><a href="#">Search Ads</a></li>
              <li><a href="#">SEO Mastery</a></li>
              <li><a href="#">Conversion Audit</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-link-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#case-studies">Case Studies</a></li>
              <li><a href="#">Our Process</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">Stay Updated</h4>
            {subscribed ? (
              <p className="footer-subscribed-msg">You&apos;re subscribed. Look for our weekly insights.</p>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                {error && <p className="footer-newsletter-error" role="alert">{error}</p>}
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                  required
                  disabled={loading}
                />
                <button type="submit" className="footer-newsletter-btn" disabled={loading}>
                  {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
            {!subscribed && (
              <p className="footer-newsletter-note">Latest insights on AI marketing delivered weekly.</p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 KyberNode. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
