import React from 'react';
import SectionHead from '../components/SectionHead.jsx';
import SizeStrip from '../components/SizeStrip.jsx';
import ReceiptEstimator from '../components/ReceiptEstimator.jsx';
import { pricingData } from '../data/pricing.js';
import './PricingSection.css';

export default function PricingSection() {
  const headline = [
    <span>PRICED BY</span>,
    <span>
      <em className="serif-accent">the inch.</em>
    </span>
  ];

  return (
    <section id="pricing" className="pricing-section section section--paper section--below-fold" data-theme="paper" aria-labelledby="pricing-head">
      <div className="container">
        <SectionHead
          number="07"
          label="PRICING"
          lines={headline}
          theme="light"
        />

        <div className="pricing-section__content">
          {/* Part A: SizeStrip */}
          <SizeStrip />

          {/* Part B & C: ReceiptEstimator + Staggered Policies */}
          <div className="pricing-section__interactive-row">
            <div className="pricing-section__estimator-col">
              <ReceiptEstimator />
            </div>

            <div className="pricing-section__notes-col">
              <div className="pricing-section__notes-header">
                <span className="label-type pricing-section__notes-tag">STUDIO STANDARDS</span>
                <h3 className="display-type pricing-section__notes-title">TRANSPARENT TERMS</h3>
                <p className="pricing-section__notes-desc">
                  No hidden hourly creep. You are quoted before ink enters needle. Every commitment is guaranteed in writing.
                </p>
              </div>

              <div className="pricing-section__staggered-notes">
                {pricingData.notes.map((note, idx) => (
                  <div key={note.title} className="pricing-section__note-card" style={{ '--note-idx': idx }}>
                    <div className="pricing-section__note-num display-type">0{idx + 1}</div>
                    <div className="pricing-section__note-body">
                      <h4 className="label-type pricing-section__note-title">{note.title}</h4>
                      <p className="pricing-section__note-text">{note.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
