import React from 'react';
import SectionHead from '../components/SectionHead.jsx';
import InstaGrid from '../components/InstaGrid.jsx';
import './InstagramSection.css';

export default function InstagramSection() {
  const headline = [
    <span>ON THE</span>,
    <span>
      <em className="serif-accent">gram.</em>
    </span>
  ];

  return (
    <section id="instagram" className="instagram-section section section--void section--below-fold" aria-labelledby="instagram-head">
      <div className="container">
        <SectionHead
          number="10"
          label="INSTAGRAM"
          lines={headline}
          theme="dark"
        />

        <InstaGrid />
      </div>
    </section>
  );
}
