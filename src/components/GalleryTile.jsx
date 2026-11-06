import React from 'react';
import { Plus } from 'lucide-react';
import ImageTile from './ImageTile.jsx';
import { images } from '../data/images.js';
import './GalleryTile.css';

export default function GalleryTile({
  piece,
  onClick,
  isFeatured = false
}) {
  const imgData = images.gallery[piece.imageIndex] || images.gallery[0];

  return (
    <div
      className={`gallery-tile ${isFeatured ? 'gallery-tile--featured' : ''}`}
      onClick={() => onClick(piece)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(piece);
        }
      }}
      aria-label={`View ${piece.title} (${piece.style})`}
    >
      <ImageTile
        src={imgData.src}
        alt={`${piece.title} - ${piece.style} tattoo on ${piece.placement}`}
        position={imgData.position}
        aspect="4 / 5"
        className="gallery-tile__image"
      >
        {/* Top-Left Frame Number Chip */}
        <span className="gallery-tile__chip-frame chip">
          {piece.num}
        </span>

        {/* Bottom-Left Style Chip */}
        <span className="gallery-tile__chip-style chip chip--dark">
          {piece.style}
        </span>

        {/* Hover Plus Icon */}
        <span className="gallery-tile__chip-hover chip chip--blood" aria-hidden="true">
          <Plus size={16} />
        </span>
      </ImageTile>
    </div>
  );
}
