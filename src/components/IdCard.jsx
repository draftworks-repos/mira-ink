import React from 'react';
import ImageTile from './ImageTile.jsx';
import { images } from '../data/images.js';
import { site } from '../data/site.js';
import './IdCard.css';

export default function IdCard() {
  return (
    <div className="id-card">
      <div className="id-card__header">
        <span className="label-type id-card__studio">{site.studioName}</span>
        <span className="label-type id-card__badge">ARTIST CREDENTIAL</span>
      </div>

      <div className="id-card__main-photo-wrap">
        <ImageTile
          src={images.artist01.src}
          alt={images.artist01.alt}
          position={images.artist01.position}
          aspect="4 / 5"
          priority={true}
          className="id-card__main-photo"
        />

        {/* artist-02 tucked at bottom right corner, rotated 3deg */}
        <div className="id-card__sub-photo-wrap">
          <img
            src={images.artist02.src}
            alt={images.artist02.alt}
            className="id-card__sub-photo"
            loading="lazy"
          />
        </div>
      </div>

      <div className="id-card__ledger">
        <div className="id-card__row">
          <span className="label-type id-card__field">NAME</span>
          <span className="label-type id-card__val">{site.artistName}</span>
        </div>
        <div className="id-card__row">
          <span className="label-type id-card__field">CHAIR</span>
          <span className="label-type id-card__val">01 (SOLO RESIDENT)</span>
        </div>
        <div className="id-card__row">
          <span className="label-type id-card__field">SINCE</span>
          <span className="label-type id-card__val">{site.foundedYear}</span>
        </div>
        <div className="id-card__row">
          <span className="label-type id-card__field">SPECIALTY</span>
          <span className="label-type id-card__val">Fine Line, Blackwork</span>
        </div>
        <div className="id-card__row">
          <span className="label-type id-card__field">BASED IN</span>
          <span className="label-type id-card__val">{site.city}</span>
        </div>
      </div>
    </div>
  );
}
