import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeftRight } from 'lucide-react';
import { images } from '../data/images.js';
import './CompareSlider.css';

export default function CompareSlider({
  items = [],
  className = ""
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const currentItem = items[currentIndex] || items[0];
  const freshImg = images.healed[currentItem.freshImgIndex]?.fresh?.src || `/temp/healed-0${currentIndex + 1}-fresh.jpg`;
  const healedImg = images.healed[currentItem.healedImgIndex]?.healed?.src || `/temp/healed-0${currentIndex + 1}-healed.jpg`;

  const handlePointerDown = (e) => {
    // Only drag when clicking/tapping the middle handle!
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const clamped = Math.max(5, Math.min(95, percent));
    setSliderPos(clamped);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setSliderPos(50); // reset slider to center on switch
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setSliderPos(50);
  };

  return (
    <div className={`compare-slider ${className}`.trim()}>
      {/* Top Header / Piece Navigation */}
      <div className="compare-slider__controls-bar">
        <div className="compare-slider__meta">
          <span className="label-type compare-slider__counter">
            PIECE {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <h3 className="display-type compare-slider__piece-title">{currentItem.title}</h3>
          <span className="label-type compare-slider__piece-sub">
            {currentItem.placement} • <strong className="compare-slider__highlight">{currentItem.healingTime}</strong>
          </span>
        </div>

        <div className="compare-slider__nav-buttons">
          <button
            type="button"
            className="compare-slider__nav-btn"
            onClick={handlePrev}
            aria-label="Previous piece"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="compare-slider__nav-btn"
            onClick={handleNext}
            aria-label="Next piece"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Big Interactive Comparison Block (16:9 desktop, 1:1 mobile/tablet) */}
      <div
        className="compare-slider__stage"
        ref={containerRef}
      >
        {/* Right Side: Healed (After) image background */}
        <div className="compare-slider__layer compare-slider__layer--healed">
          <img
            src={healedImg}
            alt={`${currentItem.title} - Healed result`}
            className="compare-slider__img"
            loading="lazy"
          />
          <span className="compare-slider__badge compare-slider__badge--right chip chip--dark">
            AFTER • HEALED
          </span>
        </div>

        {/* Left Side: Fresh (Before) image clipped to slider position */}
        <div
          className="compare-slider__layer compare-slider__layer--fresh"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={freshImg}
            alt={`${currentItem.title} - Fresh needle stencil`}
            className="compare-slider__img"
            loading="lazy"
          />
          <span className="compare-slider__badge compare-slider__badge--left chip chip--blood">
            BEFORE • FRESH
          </span>
        </div>

        {/* Center Vertical Separator Line */}
        <div
          className="compare-slider__separator"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Draggable Grab Handle in the middle ONLY */}
          <div
            className={`compare-slider__handle ${isDragging ? 'is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="slider"
            aria-label="Comparison separator grab handle"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={5}
            aria-valuemax={95}
            tabIndex={0}
          >
            <ChevronsLeftRight size={16} className="compare-slider__handle-icon" />
          </div>
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="compare-slider__hint label-type">
        <span>&larr; Drag center handle to inspect line retention &rarr;</span>
      </div>
    </div>
  );
}
