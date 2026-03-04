type CaseStudiesProps = {
  inView: boolean
  reducedMotion: boolean
}

export function CaseStudies({ inView, reducedMotion }: CaseStudiesProps) {
  return (
    <section className="case-studies" id="case-studies">
      <div className="case-studies-inner">
        <div className="case-studies-header">
          <div>
            <h2 className="case-studies-title">Case Studies</h2>
            <p className="case-studies-subtitle">Real businesses, tangible results. Explore how we transformed these brands.</p>
          </div>
          <button className="case-studies-all-btn">
            View All Success Stories <span className="material-symbols-outlined case-btn-icon">open_in_new</span>
          </button>
        </div>

        <div className="case-cards-stack" data-inview={inView} data-reduced={reducedMotion}>
          {/* Card 1: image left */}
          <div className="case-card-full">
            <div className="case-card-image-col">
              <div className="case-card-image case-card-image-purple">
                <div className="case-card-texture case-card-texture-cubes" />
                <span className="case-card-badge">FINTECH</span>
              </div>
            </div>
            <div className="case-card-text-col">
              <h3 className="case-card-title">Scaling a Neobank to 1M+ Monthly Active Users</h3>
              <div className="case-card-metrics">
                <div>
                  <p className="case-metric-label">Result</p>
                  <p className="case-metric-value text-gradient">+340% Growth</p>
                </div>
                <div>
                  <p className="case-metric-label">Cost Per Lead</p>
                  <p className="case-metric-value text-gradient">-45% Decrease</p>
                </div>
              </div>
              <button className="case-card-cta">Read Story</button>
            </div>
          </div>

          {/* Card 2: image right (reversed) */}
          <div className="case-card-full case-card-reversed">
            <div className="case-card-image-col">
              <div className="case-card-image case-card-image-cyan">
                <div className="case-card-texture case-card-texture-carbon" />
                <span className="case-card-badge">E-COMMERCE</span>
              </div>
            </div>
            <div className="case-card-text-col">
              <h3 className="case-card-title">Revolutionizing D2C Sales for a Premium Tech Brand</h3>
              <div className="case-card-metrics">
                <div>
                  <p className="case-metric-label">ROAS</p>
                  <p className="case-metric-value text-gradient">8.2x Average</p>
                </div>
                <div>
                  <p className="case-metric-label">Revenue</p>
                  <p className="case-metric-value text-gradient">$12M Incremental</p>
                </div>
              </div>
              <button className="case-card-cta">Read Story</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
