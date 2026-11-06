import React from 'react';
import SectionHead from '../components/SectionHead.jsx';
import IdCard from '../components/IdCard.jsx';
import CtaButton from '../components/CtaButton.jsx';
import Reveal from '../components/Reveal.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { site } from '../data/site.js';
import './ArtistSection.css';

export default function ArtistSection() {
  const { openBooking } = useBooking();

  const headline = [
    <span>HI, I'M</span>,
    <span>
      <em className="serif-accent">Mira.</em>
    </span>
  ];

  const stylePills = [
    "FINE LINE BOTANICALS",
    "OBSIDIAN BLACKWORK",
    "MICRO REALISM",
    "CLASSIC FLASH",
    "COVER-UPS"
  ];

  return (
    <section id="artist" className="artist-section section section--char section--below-fold" aria-labelledby="artist-head">
      <div className="container">
        <SectionHead
          number="05"
          label="THE ARTIST"
          lines={headline}
          theme="dark"
        />

        <div className="artist-section__grid">
          {/* Left Column (5 cols): IdCard */}
          <div className="artist-section__card-col">
            <IdCard />
          </div>

          {/* Right Column (7 cols): Editorial text, signature, facts, pills & CTAs */}
          <div className="artist-section__content-col">
            {/* Signature */}
            <div className="artist-section__signature-wrap" aria-hidden="true">
              <span className="serif-accent artist-section__signature">— Mira</span>
            </div>

            <Reveal delay={100}>
              <div className="artist-section__bio">
                <p>
                  I started drawing flash at nineteen, self-taught through sketchbooks before completing a rigorous traditional tattoo apprenticeship in 2016. Over the last 8+ years, I have focused exclusively on fine line single-needle craft and high-saturation blackwork.
                </p>
                <p>
                  A great tattoo shouldn’t merely look breathtaking on an illuminated studio table under fresh green soap. My philosophy is that ink must look majestic at sixty—settling organically into your dermis without bleed, blowout, or muddy blurring. Every stencil is mapped to your natural anatomical curves.
                </p>
              </div>
            </Reveal>

            {/* Staggered Facts Row */}
            <Reveal delay={200}>
              <div className="artist-section__facts">
                <div className="artist-section__fact">
                  <span className="artist-section__fact-num display-type">{site.experienceYears}</span>
                  <span className="label-type artist-section__fact-label">Years Inking</span>
                </div>
                <div className="artist-section__fact">
                  <span className="artist-section__fact-num display-type">{site.piecesCompleted}</span>
                  <span className="label-type artist-section__fact-label">Custom Pieces</span>
                </div>
                <div className="artist-section__fact">
                  <span className="artist-section__fact-num display-type">{site.chairCount}</span>
                  <span className="label-type artist-section__fact-label">Private Chair</span>
                </div>
              </div>
            </Reveal>

            {/* Style Pills (1px outlined) */}
            <Reveal delay={300}>
              <div className="artist-section__pills">
                {stylePills.map((pill) => (
                  <span key={pill} className="artist-section__pill label-type">
                    {pill}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={400}>
              <div className="artist-section__actions">
                <CtaButton
                  size="lg"
                  variant="blood"
                  onClick={() => openBooking({ source: 'Artist Section: Mira' })}
                >
                  BOOK WITH MIRA
                </CtaButton>

                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="artist-section__dm-link label-type"
                >
                  DM ON INSTAGRAM
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
