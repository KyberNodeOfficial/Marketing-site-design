const SERVICES = [
  {
    icon: 'ads_click',
    title: 'Paid Advertising',
    desc: 'Hyper-targeted campaigns on Google, Meta, and LinkedIn designed for maximum conversion.',
  },
  {
    icon: 'search',
    title: 'SEO Mastery',
    desc: 'Dominating search engines through technical excellence and high-authority content strategy.',
  },
  {
    icon: 'mail',
    title: 'Email Lifecycle',
    desc: 'Turn subscribers into repeat buyers with automated, high-conversion email flows.',
  },
  {
    icon: 'bar_chart',
    title: 'Conversion Audit',
    desc: 'Data-driven CRO to squeeze every drop of value from your existing web traffic.',
  },
  {
    icon: 'brush',
    title: 'Content Creation',
    desc: 'Engaging visuals and copy that resonate with your audience and build brand equity.',
  },
  {
    icon: 'psychology',
    title: 'AI Strategy',
    desc: 'Future-proof your marketing using custom AI models for prediction and automation.',
  },
]

type ServicesProps = {
  inView: boolean
  reducedMotion: boolean
}

export function Services({ inView, reducedMotion }: ServicesProps) {
  return (
    <section className="services" id="services">
      <div className="section-inner">
        <h2 className="section-title">Expertise That Drives Impact</h2>
        <p className="section-subtitle">
          From high-intent search ads to viral social campaigns, we cover the full spectrum of digital growth.
        </p>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="service-card"
              data-inview={inView}
              data-reduced={reducedMotion}
              data-index={i}
            >
              <div className="service-icon-wrap">
                <span className="material-symbols-outlined service-icon" aria-hidden>{s.icon}</span>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <a href="#contact" className="service-link">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
