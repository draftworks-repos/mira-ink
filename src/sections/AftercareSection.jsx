import React from 'react';
import SectionHead from '../components/SectionHead.jsx';
import HealStep from '../components/HealStep.jsx';
import { aftercareSteps } from '../data/aftercare.js';
import { useInView } from '../hooks/useInView.js';
import './AftercareSection.css';

export default function AftercareSection() {
  const [railRef, railInView] = useInView({ threshold: 0.2 });

  const headline = [
    <span>HEAL IT</span>,
    <span>
      <em className="serif-accent">right.</em>
    </span>
  ];

  return (
    <section id="aftercare" className="aftercare-section section section--void section--below-fold" aria-labelledby="aftercare-head">
      <div className="container">
        <SectionHead
          number="08"
          label="AFTERCARE"
          lines={headline}
          theme="dark"
        />

        <div className="aftercare-section__timeline-wrap" ref={railRef}>
          {/* Connecting Rail (1px line with blood scaleX/scaleY animation) */}
          <div className="aftercare-section__rail" aria-hidden="true">
            <span
              className={`aftercare-section__rail-fill ${railInView ? 'is-in' : ''}`}
            />
          </div>

          {/* 4 Heal Steps */}
          <div className="aftercare-section__steps">
            {aftercareSteps.map((step, idx) => (
              <HealStep key={step.step} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
