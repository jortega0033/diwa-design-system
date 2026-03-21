import Link from 'next/link';
import React from 'react';
import styles from './HeroBanner.module.css';

const FRAMEWORKS = ['React', 'Angular', 'Vue', 'Next.js', 'Vanilla JS'] as const;

const STATS = [
  { bold: '43', text: 'Components' },
  { bold: 'TypeScript', text: 'Ready' },
  { bold: 'CSS Tokens', text: 'System' },
  { bold: 'WCAG 2.2 AA', text: 'Compliant' },
] as const;

function ArrowRightIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 6.5h9M8 3l3.5 3.5L8 10" />
    </svg>
  );
}

export function HeroBanner() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Decorative background layers */}
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      {/* Concentric rings */}
      <svg
        className={styles.rings}
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="150" cy="150" r="146" stroke="#10a37f" strokeWidth="1.5" strokeOpacity="0.18" />
        <circle cx="150" cy="150" r="108" stroke="#10a37f" strokeWidth="1"   strokeOpacity="0.11" />
        <circle cx="150" cy="150" r="70"  stroke="#10a37f" strokeWidth="0.8" strokeOpacity="0.07" />
        <circle cx="150" cy="4"   r="4"   fill="#10a37f" fillOpacity="0.42" />
        <circle cx="150" cy="296" r="4"   fill="#10a37f" fillOpacity="0.30" />
        <circle cx="4"   cy="150" r="3"   fill="#10a37f" fillOpacity="0.28" />
        <circle cx="150" cy="150" r="4"   fill="#10a37f" fillOpacity="0.35" />
      </svg>

      {/* Main content */}
      <div className={styles.body}>
        <div className={styles.badge} aria-label="Design system version and compliance">
          <span className={styles.badgeDot} aria-hidden="true" />
          <span>v1.3.1</span>
          <span className={styles.badgeSep} aria-hidden="true">·</span>
          <span>43 Components</span>
          <span className={styles.badgeSep} aria-hidden="true">·</span>
          <span>WCAG 2.2 AA</span>
        </div>

        <h1 id="hero-heading" className={styles.headline}>
          Build Accessible
          <br />
          <span className={styles.headlineAccent}>Interfaces Faster.</span>
        </h1>

        <p className={styles.description}>
          Diwa is a framework-agnostic design system built with Web Components and shared CSS
          tokens. Integrate once, then ship consistent accessible UI across React, Angular, Vue,
          Next.js, and vanilla HTML.
        </p>

        <div className={styles.ctas}>
          <Link href="/developing" className={styles.ctaPrimary}>
            Get Started
            <ArrowRightIcon />
          </Link>
          <Link href="/components" className={styles.ctaSecondary}>
            Browse Components
          </Link>
        </div>

        <div className={styles.frameworks} aria-label="Supported frameworks">
          {FRAMEWORKS.map((fw) => (
            <span key={fw} className={styles.chip}>{fw}</span>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className={styles.statsStrip} aria-label="Design system highlights">
        {STATS.map((s, i) => (
          <React.Fragment key={s.bold}>
            {i > 0 && <span className={styles.statDivider} aria-hidden="true" />}
            <div className={styles.stat}>
              <span className={styles.statBold}>{s.bold}</span>
              <span className={styles.statText}>{s.text}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
