import React from 'react';

const schemes = [
  {
    id: 1,
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description:
      'An initiative by the government of India in which all farmers will get up to ₹6,000 per year as minimum income support.',
    link: 'https://pmkisan.gov.in/',
    icon: '🌾',
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description:
      'Provides insurance coverage and financial support to farmers in the event of crop failure as a result of natural calamities, pests & diseases.',
    link: 'https://pmfby.gov.in/',
    icon: '🛡️',
  },
  {
    id: 3,
    title: 'Soil Health Card Scheme',
    description:
      'Government issues soil cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers required for the individual farms.',
    link: 'https://soilhealth.dac.gov.in/',
    icon: '🧪',
  },
  {
    id: 4,
    title: 'Kisan Credit Card (KCC) Scheme',
    description:
      'Aims to save farmers from high-interest rates usually charged by money lenders. Provides credit for agricultural needs.',
    link: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card',
    icon: '💳',
  },
];

const Schemes = () => {
  return (
    <section
      className="section"
      style={{
        background: 'var(--bg-primary)',
        minHeight: '100vh',
      }}
    >
      <div className="section-container" style={{ maxWidth: 1100 }}>
        {/* ── Header ── */}
        <div
          className="animate-fade-in-up"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span className="section-label" style={{ letterSpacing: '0.15em' }}>
            GOVERNMENT INITIATIVES
          </span>

          <h1
            className="section-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginTop: 12,
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Govt Schemes for Farmers
          </h1>

          <p
            className="section-subtitle"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Explore key government initiatives designed to support farmers
            financially and provide resources for better yield.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap: 28,
          }}
        >
          {schemes.map((scheme, idx) => (
            <div
              key={scheme.id}
              className={`glass-card animate-fade-in-up stagger-${idx + 1}`}
              style={{
                padding: '36px 36px 32px',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-glass)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.35s cubic-bezier(.25,.8,.25,1), border-color 0.35s ease, box-shadow 0.35s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.25)';
                e.currentTarget.style.boxShadow =
                  '0 -2px 20px -4px rgba(52, 211, 153, 0.18), 0 12px 40px -8px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top green glow bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: 2,
                  background:
                    'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                  pointerEvents: 'none',
                }}
                className="glow-bar"
              />

              {/* Icon */}
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: 18,
                  width: 52,
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(52, 211, 153, 0.08)',
                  border: '1px solid rgba(52, 211, 153, 0.12)',
                }}
              >
                {scheme.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                  lineHeight: 1.35,
                }}
              >
                {scheme.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                {scheme.description}
              </p>

              {/* CTA Button */}
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.88';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Learn More &amp; Apply
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped style for the green glow bar on hover */}
      <style>{`
        .glass-card:hover .glow-bar {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default Schemes;
