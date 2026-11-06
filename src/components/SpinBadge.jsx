import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useInView } from '../hooks/useInView.js';
import './SpinBadge.css';

export default function SpinBadge({
  text = "BOOK A SESSION • BOOK A SESSION • ",
  onClick,
  className = ""
}) {
  const [badgeRef, inView] = useInView({ threshold: 0.1 });

  return (
    <button
      ref={badgeRef}
      type="button"
      onClick={onClick}
      className={`spin-badge ${!inView ? 'spin-badge--paused' : ''} ${className}`.trim()}
      aria-label="Book a tattoo session"
    >
      <div className="spin-badge__ring">
        <svg viewBox="0 0 100 100" className="spin-badge__svg">
          <path
            id="textPathCircle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="spin-badge__text">
            <textPath href="#textPathCircle" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      <div className="spin-badge__center">
        <ArrowDown size={22} className="spin-badge__arrow" />
      </div>
    </button>
  );
}
