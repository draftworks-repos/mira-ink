import React, { useState } from 'react';
import SectionHead from '../components/SectionHead.jsx';
import StyleList from '../components/StyleList.jsx';
import { tattooStyles } from '../data/styles.js';
import { images } from '../data/images.js';
import './StylesSection.css';

export default function StylesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const headline = [
    <span>PICK YOUR</span>,
    <span>
      <em className="serif-accent">poison.</em>
    </span>
  ];

  const styleImages = [
    images.styles.fineline,
    images.styles.blackgrey,
    images.styles.blackwork,
    images.styles.realism,
    images.styles.traditional
  ];

  return (
    <section id="styles" className="styles-section section section--void section--below-fold" aria-labelledby="styles-head">
      <div className="container">
        <SectionHead
          number="06"
          label="STYLES"
          lines={headline}
          theme="dark"
        />

        <div className="styles-section__layout">
          {/* Left Column: StyleList of 5 big rows */}
          <div className="styles-section__list-col">
            <StyleList
              styles={tattooStyles}
              activeIndex={activeIndex}
              onActivate={setActiveIndex}
            />
          </div>

          {/* Right Column: ONE Sticky Image Frame with stacked crossfade images */}
          <div className="styles-section__frame-col">
            <div className="styles-section__sticky-frame">
              <div className="styles-section__aspect-wrap">
                {styleImages.map((img, idx) => {
                  const isActive = activeIndex === idx;
                  const currentStyle = tattooStyles[idx];
                  return (
                    <div
                      key={currentStyle.id}
                      className={`styles-section__layer ${isActive ? 'styles-section__layer--active' : ''}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="styles-section__img"
                        loading="lazy"
                      />
                      <span className="styles-section__chip chip chip--blood">
                        {currentStyle.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active description under image frame on desktop */}
              <div className="styles-section__caption-box">
                <span className="label-type styles-section__caption-rate">
                  Rates from ₹{tattooStyles[activeIndex].ratePerInch}/in
                </span>
                <p className="styles-section__caption-desc">
                  {tattooStyles[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
