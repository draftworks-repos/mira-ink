import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import CtaButton from './CtaButton.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { site } from '../data/site.js';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const wasMenuOpen = useRef(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '40px';
    sentinel.style.left = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.opacity = '0';
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (wasMenuOpen.current) {
        menuToggleRef.current?.focus();
      }
    }
    wasMenuOpen.current = menuOpen;
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Reels', href: '#reels' },
    { label: 'Flash', href: '#flash' },
    { label: 'Healed', href: '#healed' },
    { label: 'Artist', href: '#artist' },
    { label: 'Styles', href: '#styles' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container container">
          <a href="#top" className="navbar__brand display-type" aria-label="Mira Ink Home">
            {site.studioName}
          </a>

          <nav className="navbar__nav" aria-label="Primary Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link label-type"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            {/* BOOK button: hidden on mobile <= 640px, visible on tablet & desktop */}
            <div className="navbar__book-btn-wrapper">
              <CtaButton
                size="sm"
                variant="blood"
                onClick={() => openBooking({ source: 'Navbar' })}
              >
                BOOK
              </CtaButton>
            </div>

            <button
              type="button"
              ref={menuToggleRef}
              className="navbar__menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop for the Right Off-Canvas Drawer */}
      <div
        className={`navbar__drawer-backdrop ${menuOpen ? 'navbar__drawer-backdrop--open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Sleek Right Side Off-Canvas Drawer (Slide from Right) */}
      <aside
        className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile Navigation"
      >
        <div className="navbar__drawer-top">
          <span className="navbar__brand display-type">{site.studioName}</span>
          <button
            type="button"
            className="navbar__drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="navbar__drawer-nav">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__drawer-link display-type"
              onClick={handleLinkClick}
              style={{ '--link-idx': idx }}
            >
              <span className="navbar__drawer-link-num label-type">0{idx + 1}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="navbar__drawer-bottom">
          <CtaButton
            size="lg"
            variant="blood"
            onClick={() => {
              setMenuOpen(false);
              openBooking({ source: 'Mobile Drawer' });
            }}
          >
            BOOK A SESSION
          </CtaButton>
          <span className="label-type navbar__drawer-city">
            {site.studioName} • {site.city}
          </span>
        </div>
      </aside>
    </>
  );
}
