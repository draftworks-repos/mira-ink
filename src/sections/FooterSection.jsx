import React from 'react';
import { Instagram, Youtube, MessageCircle, ArrowUp } from 'lucide-react';
import HeadlineMask from '../components/HeadlineMask.jsx';
import CtaButton from '../components/CtaButton.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { site } from '../data/site.js';
import './FooterSection.css';

export default function FooterSection() {
  const { openBooking } = useBooking();

  const headline = [
    <span>GOT AN IDEA?</span>,
    <span>
      <em className="serif-accent footer-section__serif-ink">let's</em> INK IT.
    </span>
  ];

  return (
    <footer id="contact" className="footer-section section--blood" aria-labelledby="footer-head">
      <div className="container footer-section__container">
        {/* Asymmetric 12 cols: left 7 = headline, email, CTA; right 5 = 3 stacked info blocks */}
        <div className="footer-section__grid">
          {/* Left Column (7 cols) */}
          <div className="footer-section__left-col">
            <span className="label-type footer-section__tag">READY WHEN YOU ARE</span>

            <HeadlineMask
              lines={headline}
              as="h2"
              className="footer-section__title"
            />

            <div className="footer-section__email-wrap">
              <span className="label-type footer-section__email-label">DIRECT ENQUIRY</span>
              <a
                href={`mailto:${site.email}?subject=Tattoo%20Session%20Enquiry`}
                className="footer-section__email-link display-type"
              >
                <span>{site.email}</span>
                <span className="footer-section__email-line" aria-hidden="true" />
              </a>
            </div>

            <div className="footer-section__cta-wrap">
              <CtaButton
                size="lg"
                variant="paper"
                onClick={() => openBooking({ source: 'Footer Primary CTA' })}
              >
                BOOK A SESSION
              </CtaButton>
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="footer-section__right-col">
            {/* Info Block 1: Visit */}
            <div className="footer-section__info-block footer-section__info-block--large">
              <span className="label-type footer-section__info-label">VISIT PRIVATE STUDIO</span>
              <p className="footer-section__info-val">{site.address}</p>
              <span className="footer-section__info-sub">{site.city}</span>
            </div>

            {/* Info Block 2: Hours */}
            <div className="footer-section__info-block footer-section__info-block--med">
              <span className="label-type footer-section__info-label">STUDIO HOURS</span>
              <p className="footer-section__info-val">{site.hours}</p>
              <span className="footer-section__info-sub">Strictly by confirmed appointment</span>
            </div>

            {/* Info Block 3: Reach */}
            <div className="footer-section__info-block footer-section__info-block--sm">
              <span className="label-type footer-section__info-label">DIRECT REACH</span>
              <p className="footer-section__info-val">{site.phone}</p>
              <div className="footer-section__social-row">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-section__social-btn"
                  aria-label="Instagram profile"
                >
                  <Instagram size={20} />
                </a>

                <a
                  href={site.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-section__social-btn"
                  aria-label="YouTube channel"
                >
                  <Youtube size={20} />
                </a>

                <a
                  href={`https://wa.me/${site.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-section__social-btn"
                  aria-label="WhatsApp chat"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Cropped Wordmark with lower 25% cut off */}
        <div className="footer-section__wordmark-wrap" aria-hidden="true">
          <span className="display-type footer-section__wordmark">
            {site.studioName}
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="footer-section__bottom-bar">
          <span className="label-type footer-section__copy">
            © {new Date().getFullYear()} {site.studioName}. ALL RIGHTS RESERVED. SOLO RESIDENT ARTIST.
          </span>

          <a href="#top" className="footer-section__back-to-top label-type">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
