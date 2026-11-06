import React from 'react';
import SectionHead from '../components/SectionHead.jsx';
import CompareSlider from '../components/CompareSlider.jsx';
import { healedComparisons } from '../data/healed.js';
import './HealedSection.css';

export default function HealedSection() {
  const headline = [
    <span>FRESH VS.</span>,
    <span>
      <em className="serif-accent">6 months</em> later.
    </span>
  ];

  return (
    <section id="healed" className="healed-section section section--void section--below-fold" aria-labelledby="healed-head">
      <div className="container">
        <SectionHead
          number="04"
          label="HEALED"
          lines={headline}
          theme="dark"
        />

        {/* Single Big Block: 16:9 on desktop, 1:1 on tablet & mobile */}
        <div className="healed-section__stage-wrap">
          <CompareSlider items={healedComparisons} />
        </div>
      </div>
    </section>
  );
}
