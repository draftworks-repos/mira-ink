import React, { useState } from 'react';
import { useInView } from '../hooks/useInView.js';
import './ImageTile.css';

export default function ImageTile({
  src,
  alt = "",
  position = "50% 50%",
  aspect = "4 / 5",
  priority = false,
  wipe = false,
  className = "",
  width,
  height,
  children
}) {
  const [hasError, setHasError] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={wipe ? ref : undefined}
      className={`image-tile ${wipe ? 'image-tile--wipe' : ''} ${wipe && inView ? 'is-in' : ''} ${hasError ? 'image-tile--error' : ''} ${className}`.trim()}
      style={{
        aspectRatio: aspect,
        '--focal-pos': position
      }}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          width={width}
          height={height}
          onError={() => setHasError(true)}
          className="image-tile__img"
        />
      ) : (
        <div className="image-tile__fallback">
          <span className="image-tile__fallback-text label-type">{alt || 'MIRA INK'}</span>
        </div>
      )}
      {children}
    </div>
  );
}
