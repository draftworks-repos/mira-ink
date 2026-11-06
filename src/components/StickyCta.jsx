import React, { useState, useEffect } from 'react';
import CtaButton from './CtaButton.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import './StickyCta.css';

export default function StickyCta() {
  const { isOpen, openBooking } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after hero leaves viewport, hide when footer is intersecting
    const heroEl = document.getElementById('top');
    const footerEl = document.getElementById('contact');

    let heroPassed = false;
    let footerVisible = false;

    const checkVisibility = () => {
      setVisible(heroPassed && !footerVisible);
    };

    let heroObserver;
    let footerObserver;

    if (heroEl) {
      heroObserver = new IntersectionObserver(([entry]) => {
        heroPassed = !entry.isIntersecting;
        checkVisibility();
      }, { threshold: 0.1 });
      heroObserver.observe(heroEl);
    }

    if (footerEl) {
      footerObserver = new IntersectionObserver(([entry]) => {
        footerVisible = entry.isIntersecting;
        checkVisibility();
      }, { threshold: 0.05 });
      footerObserver.observe(footerEl);
    }

    return () => {
      if (heroObserver) heroObserver.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, []);

  if (isOpen || !visible) return null;

  return (
    <div className="sticky-cta" aria-hidden="true">
      <CtaButton
        size="md"
        variant="blood"
        onClick={() => openBooking({ source: 'Sticky Mobile Pill' })}
        className="sticky-cta__btn"
      >
        BOOK A SESSION
      </CtaButton>
    </div>
  );
}
