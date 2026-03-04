import { useState } from 'react'

const LEFT_ITEMS = [
  {
    q: 'How quickly can we expect to see results?',
    a: 'While initial data collection and optimization take 2-4 weeks, most of our clients see measurable improvements in ROAS and Lead Quality within the first 30 days of campaign launch.',
  },
  { q: 'Do you work with early-stage startups?', a: 'Yes. We work with startups from seed to growth stage, with packages tailored to budget and goals.' },
  { q: 'What platforms do you specialize in?', a: 'Google Ads, Meta, LinkedIn, TikTok, and programmatic. We also integrate with major CRMs and analytics platforms.' },
]

const RIGHT_ITEMS = [
  { q: 'How does your AI optimization work?', a: 'We use custom models for bid optimization, audience prediction, and creative performance so your campaigns improve over time.' },
  { q: 'What is your typical client retention rate?', a: 'Our retention rate is 98%. Most clients stay for multiple years as we scale channels and results.' },
  { q: 'Can you integrate with our existing CRM?', a: 'Yes. We integrate with HubSpot, Salesforce, and other CRMs for lead sync and attribution.' },
]

type FAQProps = {
  inView: boolean
  reducedMotion: boolean
}

export function FAQ({ inView, reducedMotion }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (idx: number) => setOpen((o) => (o === idx ? null : idx))

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <div className="faq-header">
          <span className="faq-eyebrow text-gradient">QUESTIONS?</span>
          <h2 className="faq-title">Common Queries</h2>
        </div>
        <div className="faq-grid" data-inview={inView} data-reduced={reducedMotion}>
          <div className="faq-col">
            {LEFT_ITEMS.map((item, i) => (
              <div
                key={i}
                className="faq-item"
                data-open={open === i}
                onClick={() => toggle(i)}
              >
                <div className="faq-question">
                  <h3 className="faq-question-text">{item.q}</h3>
                  <span className="material-symbols-outlined faq-icon" aria-hidden>add</span>
                </div>
                {open === i && (
                  <p className="faq-answer">{item.a}</p>
                )}
              </div>
            ))}
          </div>
          <div className="faq-col">
            {RIGHT_ITEMS.map((item, i) => {
              const idx = i + LEFT_ITEMS.length
              return (
                <div
                  key={idx}
                  className="faq-item"
                  data-open={open === idx}
                  onClick={() => toggle(idx)}
                >
                  <div className="faq-question">
                    <h3 className="faq-question-text">{item.q}</h3>
                    <span className="material-symbols-outlined faq-icon" aria-hidden>add</span>
                  </div>
                  {open === idx && (
                    <p className="faq-answer">{item.a}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
