import React, { useRef, useState } from 'react';
import { pricingData } from '../data/pricing.js';
import './SizeStrip.css';

export default function SizeStrip() {
  const formatInr = (val) => new Intl.NumberFormat('en-IN').format(val);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="size-strip">
      <div className="size-strip__header">
        <span className="label-type size-strip__tag">SCALE &amp; PROPORTION</span>
        <h3 className="display-type size-strip__title">SIZING VISUALISER</h3>
        <p className="size-strip__subtitle">
          True physical proportion guide. Pricing scales with detail intricacy and anatomical placement. (Drag to explore)
        </p>
      </div>

      {/* Small to Medium Sizes: Proportional Boxes with drag-to-scroll */}
      <div
        className={`size-strip__track ${isDragging ? 'is-dragging' : ''}`}
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {pricingData.sizeStrips.map((item) => (
          <div key={item.inches} className="size-strip__item">
            <div className="size-strip__box-stage">
              <div
                className="size-strip__box"
                style={{ '--in': item.inches }}
              >
                <span className="size-strip__box-in label-type">{item.inches}"</span>
              </div>
            </div>

            <div className="size-strip__info">
              <span className="size-strip__ref label-type">{item.reference}</span>
              <span className="size-strip__price tabular-num">
                <span className="size-strip__from">from </span>
                ₹{formatInr(item.startingPriceInr)}
              </span>
              <span className="size-strip__note">{item.note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Large Work Row */}
      <div className="size-strip__large-work">
        <div className="size-strip__large-head">
          <span className="label-type size-strip__large-tag">LARGE CANVASES</span>
        </div>
        <div className="size-strip__large-grid">
          {pricingData.largeWork.map((piece) => (
            <div key={piece.name} className="size-strip__large-card">
              <div className="size-strip__large-top">
                <h4 className="display-type size-strip__large-name">{piece.name}</h4>
                <span className="size-strip__large-size label-type">{piece.size}</span>
              </div>
              <div className="size-strip__large-bottom">
                <span className="size-strip__large-price tabular-num">
                  {piece.startingPriceInr
                    ? `from ₹${formatInr(piece.startingPriceInr)}`
                    : 'Quoted on consult'}
                </span>
                <span className="size-strip__large-note">{piece.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
