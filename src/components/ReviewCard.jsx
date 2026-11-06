import React from 'react';
import { Star } from 'lucide-react';
import GoogleG from './GoogleG.jsx';
import './ReviewCard.css';

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      {/* (a) 5 filled stars */}
      <div className="review-card__stars" aria-label={`${review.stars} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={18}
            className="review-card__star"
            fill="currentColor"
          />
        ))}
      </div>

      {/* (b) the quote in Space Grotesk 500, 1.15rem, paper */}
      <blockquote className="review-card__quote">
        "{review.quote}"
      </blockquote>

      {/* (c) bottom row: Google G logo + reviewer name */}
      <div className="review-card__author-row">
        <GoogleG size={18} />
        <span className="review-card__author-name">{review.name}</span>
      </div>
    </article>
  );
}
