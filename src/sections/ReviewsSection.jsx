import React from 'react';
import SectionHead from '../components/SectionHead.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { clientReviews } from '../data/reviews.js';
import './ReviewsSection.css';

export default function ReviewsSection() {
  const headline = [
    <span>SKIN IN</span>,
    <span>
      <em className="serif-accent">the game.</em>
    </span>
  ];

  const row1 = clientReviews.slice(0, 3);
  const row2 = clientReviews.slice(3, 6);

  return (
    <section id="reviews" className="reviews-section section section--char section--below-fold" aria-labelledby="reviews-head">
      <div className="container">
        <SectionHead
          number="09"
          label="WORDS"
          lines={headline}
          theme="dark"
        />
      </div>

      <div className="reviews-section__marquee-wrapper">
        {/* Row 1: Moves Left */}
        <div className="reviews-section__marquee reviews-section__marquee--left" style={{ '--speed': '60s' }}>
          <div className="reviews-section__track">
            {row1.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
            {row1.map((rev) => (
              <ReviewCard key={`${rev.id}-dup1`} review={rev} />
            ))}
            {row1.map((rev) => (
              <ReviewCard key={`${rev.id}-dup2`} review={rev} />
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="reviews-section__marquee reviews-section__marquee--right" style={{ '--speed': '60s' }}>
          <div className="reviews-section__track">
            {row2.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
            {row2.map((rev) => (
              <ReviewCard key={`${rev.id}-dup1`} review={rev} />
            ))}
            {row2.map((rev) => (
              <ReviewCard key={`${rev.id}-dup2`} review={rev} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
