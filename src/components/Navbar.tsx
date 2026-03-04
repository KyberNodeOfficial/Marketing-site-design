const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#case-studies' },
  { label: 'Testimonials', href: '#testimonials' },
]

type NavbarProps = {
  scrolled: boolean
  visible: boolean
  activeSection: string | null
  onNavClick: (href: string) => void
  entranceDone: boolean
}

export function Navbar({ scrolled, visible, activeSection, onNavClick, entranceDone }: NavbarProps) {
  return (
    <header
      className="navbar"
      data-scrolled={scrolled}
      data-visible={visible}
      data-entrance={entranceDone}
    >
      <div className="navbar-inner">
        <a
          href="#hero"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault()
            onNavClick('#hero')
          }}
        >
          <div className="navbar-logo-icon">
            <span className="material-symbols-outlined">bolt</span>
          </div>
          <span className="navbar-logo-text">KyberNode</span>
        </a>
        <nav className="navbar-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="navbar-link"
              data-active={activeSection === href.slice(1)}
              onClick={(e) => {
                e.preventDefault()
                onNavClick(href)
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="navbar-cta"
            onClick={(e) => {
              e.preventDefault()
              onNavClick('#contact')
            }}
          >
            Get a Free Audit
          </a>
        </nav>
      </div>
    </header>
  )
}
