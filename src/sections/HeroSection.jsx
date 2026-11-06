import React from 'react';
import { Instagram, ArrowDown } from 'lucide-react';
import HeadlineMask from '../components/HeadlineMask.jsx';
import CtaButton from '../components/CtaButton.jsx';
import SpinBadge from '../components/SpinBadge.jsx';
import ImageTile from '../components/ImageTile.jsx';
import Reveal from '../components/Reveal.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { images } from '../data/images.js';
import { site } from '../data/site.js';
import './HeroSection.css';

export default function HeroSection() {
  const { openBooking } = useBooking();

  const headlineLines = [
    <span>PERMANENT</span>,
    <span>
      BY <em className="serif-accent">design</em> NO
    </span>,
    <span>TEMPLATES.</span>
  ];

  return (
    <section id="top" className="hero-section section--void" aria-label="Hero Introduction">
      <div className="hero-section__container container">
        {/* Full-width Stacked Headline */}
        <div className="hero-section__headline-wrap">
          <HeadlineMask
            lines={headlineLines}
            as="h1"
            className="hero-section__title"
          />
        </div>

        {/* Tiny Meta Row */}
        <div className="hero-section__meta-row label-type">
          <span className="hero-section__meta-item">Based in {site.city}</span>
          <span className="hero-section__meta-bullet">•</span>
          <span className="hero-section__meta-item">Since {site.foundedYear}</span>
          <span className="hero-section__meta-bullet">•</span>
          <span className="hero-section__meta-item hero-section__meta-item--status">
            <span className="hero-section__status-dot" aria-hidden="true" />
            Books open
          </span>
        </div>

        {/* 12-Column Content Row */}
        <div className="hero-section__grid">
          {/* Left Column (4 cols) */}
          <div className="hero-section__copy-col">
            <Reveal delay={150}>
              <p className="hero-section__desc">
                One artist, one chair. Every single tattoo is hand-drawn from custom stencils—crafted specifically for your anatomy and engineered to heal cleanly for life.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="hero-section__actions">
                <CtaButton
                  size="lg"
                  variant="blood"
                  onClick={() => openBooking({ source: 'Hero Section' })}
                >
                  BOOK A SESSION
                </CtaButton>

                <div className="hero-section__sub-actions">
                  <a href="#reels" className="hero-section__text-link label-type">
                    <span>Watch reels</span>
                    <ArrowDown size={14} />
                  </a>

                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-section__ig-link label-type"
                  >
                    <Instagram size={16} />
                    <span>{site.handle}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column (8 cols): Hero photo with overlapping SpinBadge */}
          <div className="hero-section__media-col">
            <div className="hero-section__photo-frame">
              <ImageTile
                src={images.hero.src}
                alt={images.hero.alt}
                position={images.hero.position}
                aspect="16 / 10"
                priority={true}
                wipe={false}
                className="hero-section__hero-img"
              />

              {/* Overlapping SpinBadge at top-left corner */}
              <div className="hero-section__badge-pos">
                <SpinBadge onClick={() => openBooking({ source: 'Hero Badge' })} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
