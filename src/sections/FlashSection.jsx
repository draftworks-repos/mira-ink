import React, { useState, useEffect } from 'react';
import SectionHead from '../components/SectionHead.jsx';
import FlashTag from '../components/FlashTag.jsx';
import { flashDesigns } from '../data/flash.js';
import './FlashSection.css';

export default function FlashSection() {
  const [availableOnly, setAvailableOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      // Initialize count based on viewport
      setVisibleCount(mobile ? 4 : 8);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const headline = [
    <span>TAKE ME</span>,
    <span>
      <em className="serif-accent">home.</em>
    </span>
  ];

  const filteredFlash = availableOnly
    ? flashDesigns.filter((item) => !item.sold)
    : flashDesigns;

  const displayedFlash = filteredFlash.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFlash.length;

  const handleToggleAvailable = () => {
    setAvailableOnly(!availableOnly);
    setVisibleCount(isMobile ? 4 : 8);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const toggleAction = (
    <div className="flash-section__controls">
      <span className="serif-accent flash-section__sub-note">
        ready to ink, first come first served
      </span>
      <button
        type="button"
        role="button"
        aria-pressed={availableOnly}
        onClick={handleToggleAvailable}
        className={`flash-section__toggle label-type ${availableOnly ? 'flash-section__toggle--active' : ''}`}
      >
        <span>Available only</span>
        <span className="flash-section__toggle-line" />
      </button>
    </div>
  );

  return (
    <section id="flash" className="flash-section section section--paper section--below-fold" data-theme="paper" aria-labelledby="flash-head">
      <div className="container">
        <SectionHead
          number="03"
          label="FLASH"
          lines={headline}
          action={toggleAction}
          theme="light"
        />

        {/* Dense Flash Tags Board */}
        <div className="flash-section__grid">
          {displayedFlash.map((flash, idx) => (
            <FlashTag
              key={flash.id}
              flash={flash}
              index={idx}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flash-section__load-more">
            <button
              type="button"
              className="flash-section__load-btn label-type"
              onClick={handleLoadMore}
            >
              LOAD MORE FLASH ({filteredFlash.length - visibleCount} REMAINING)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
