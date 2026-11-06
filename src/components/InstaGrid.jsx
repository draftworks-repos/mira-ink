import React from 'react';
import { Instagram } from 'lucide-react';
import { images } from '../data/images.js';
import { site } from '../data/site.js';
import './InstaGrid.css';

export default function InstaGrid() {
  return (
    <div className="insta-grid">
      {/* Sticky Profile Card */}
      <aside className="insta-grid__profile-card">
        <div className="insta-grid__avatar-wrap">
          <img
            src={images.artist01.src}
            alt={site.artistName}
            className="insta-grid__avatar"
            loading="lazy"
          />
        </div>

        <div className="insta-grid__profile-info">
          <span className="insta-grid__handle">{site.handle}</span>
          <span className="label-type insta-grid__studio-tag">{site.studioName}</span>

          <div className="insta-grid__stats tabular-num">
            <div className="insta-grid__stat">
              <span className="insta-grid__stat-val">482</span>
              <span className="insta-grid__stat-label label-type">posts</span>
            </div>
            <div className="insta-grid__stat">
              <span className="insta-grid__stat-val">34.8K</span>
              <span className="insta-grid__stat-label label-type">followers</span>
            </div>
            <div className="insta-grid__stat">
              <span className="insta-grid__stat-val">312</span>
              <span className="insta-grid__stat-label label-type">following</span>
            </div>
          </div>

          <p className="insta-grid__bio">
            Private tattoo studio in {site.city}. Fine line, realism &amp; custom blackwork. Books open for next month.
          </p>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="insta-grid__follow-btn label-type"
          >
            <Instagram size={16} />
            <span>FOLLOW ON INSTAGRAM</span>
          </a>
        </div>
      </aside>

      {/* 3x3 Grid of 9 Square Posts */}
      <div className="insta-grid__posts" role="region" aria-label="Instagram 3x3 feed">
        {images.insta.map((post, idx) => (
          <a
            key={idx}
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="insta-grid__tile"
            aria-label={`View Instagram post ${idx + 1}`}
          >
            <img
              src={post.src}
              alt={post.alt}
              className="insta-grid__img"
              loading="lazy"
            />
            <span className="insta-grid__hover-chip chip chip--blood" aria-hidden="true">
              <Instagram size={14} />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
