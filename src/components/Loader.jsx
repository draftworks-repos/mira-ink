import React, { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [counterNum, setCounterNum] = useState(0);

  useEffect(() => {
    // Check if reduced motion or already seen in sessionStorage
    try {
      const seen = sessionStorage.getItem('loaderSeen');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (seen || prefersReduced) {
        setVisible(false);
        if (onFinish) onFinish();
        return;
      }
    } catch {
      // sessionStorage unavailable
    }

    document.body.classList.add('loader-locked');

    // JS-based counter fallback / companion to ensure 000-100 counts up reliably
    let start = performance.now();
    let frameId;
    const duration = 1400;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCounterNum(Math.floor(progress * 100));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        // Trigger split curtain opening
        setOpening(true);
        setTimeout(() => {
          setVisible(false);
          document.body.classList.remove('loader-locked');
          try {
            sessionStorage.setItem('loaderSeen', 'true');
          } catch {
            // ignore
          }
          if (onFinish) onFinish();
        }, 550);
      }
    };

    frameId = requestAnimationFrame(tick);

    // Hard fallback safety timer (2.6s)
    const safetyTimer = setTimeout(() => {
      setVisible(false);
      document.body.classList.remove('loader-locked');
      if (onFinish) onFinish();
    }, 2600);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(safetyTimer);
      document.body.classList.remove('loader-locked');
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className={`loader ${opening ? 'loader--opening' : ''}`} aria-hidden="true">
      <div className="loader__curtain loader__curtain--top" />
      <div className="loader__curtain loader__curtain--bottom" />

      <div className="loader__content">
        <div className="loader__brand-wrap">
          <span className="loader__brand loader__brand--outline">MIRA INK</span>
          <span className="loader__brand loader__brand--fill">MIRA INK</span>
        </div>

        <div className="loader__meta">
          <div className="loader__counter">
            <span className="loader__counter-num">
              {String(counterNum).padStart(3, '0')}
            </span>
            <span className="loader__counter-unit">%</span>
          </div>
          <span className="loader__label label-type">inking your screen...</span>
        </div>
      </div>
    </div>
  );
}
