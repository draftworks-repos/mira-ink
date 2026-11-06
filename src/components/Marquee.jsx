import React from 'react';
import './Marquee.css';

export default function Marquee({
  items = [
    "FINE LINE",
    "BLACK & GREY",
    "BLACKWORK",
    "REALISM",
    "TRADITIONAL"
  ],
  direction = "left",
  speed = "30s",
  variant = "blood",
  className = ""
}) {
  const content = (
    <div className="marquee__segment">
      {items.map((item, idx) => (
        <span key={idx} className="marquee__item display-type">
          <span>{item}</span>
          <svg
            className="marquee__star"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee marquee--${variant} marquee--${direction} ${className}`.trim()}
      style={{ '--marquee-speed': speed }}
    >
      <div className="marquee__track">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
