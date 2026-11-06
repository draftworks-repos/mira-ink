import React, { useRef, useEffect } from 'react';
import { Play, Pause, Instagram, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { useBooking } from '../context/BookingContext.jsx';
import './ReelTile.css';

export default function ReelTile({
  reel,
  isPlaying = false,
  onTogglePlay,
  className = ""
}) {
  const videoRef = useRef(null);
  const { openBooking } = useBooking();
  const [isMuted, setIsMuted] = React.useState(true);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked if unmuted
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().catch(() => {});
      });
    } else if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handleTileClick = (e) => {
    // If clicked on "Book this style" or mute button, don't trigger play/pause
    if (e.target.closest('.reel-tile__book-btn') || e.target.closest('.reel-tile__mute-btn')) {
      return;
    }
    if (onTogglePlay) {
      onTogglePlay(reel.id);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`reel-tile ${className}`.trim()}>
      <div
        className={`reel-tile__media-wrap ${isPlaying ? 'is-playing' : ''}`}
        onClick={handleTileClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleTileClick(e);
          }
        }}
        aria-label={`${isPlaying ? 'Pause' : 'Play'} reel: ${reel.caption}`}
      >
        {/* Only mount the video element when playing has been initiated */}
        {isPlaying ? (
          <video
            ref={videoRef}
            src={reel.src}
            poster={reel.poster}
            muted={isMuted}
            loop
            playsInline
            className="reel-tile__video"
          />
        ) : (
          <img
            src={reel.poster}
            alt={reel.caption}
            loading="lazy"
            draggable="false"
            className="reel-tile__video"
          />
        )}

        {/* Play / Pause Indicator Badge */}
        <div className={`reel-tile__play-btn ${isPlaying ? 'reel-tile__play-btn--playing' : ''}`} aria-hidden="true">
          {isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
          )}
        </div>

        {/* Audio Toggle (visible only when playing) */}
        {isPlaying && (
          <button
            type="button"
            className="reel-tile__mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}

        {/* Gradient shadow limited to bottom */}
        <div className="reel-tile__scrim" aria-hidden="true" />

        {/* Top-Right Instagram Chip */}
        <a
          href={reel.igUrl || "https://instagram.com/mira.ink"}
          target="_blank"
          rel="noopener noreferrer"
          className="reel-tile__ig-chip chip chip--dark"
          onClick={(e) => e.stopPropagation()}
          aria-label="View on Instagram"
        >
          <Instagram size={13} />
        </a>

        {/* Bottom Metadata */}
        <div className="reel-tile__overlay-info">
          <div className="reel-tile__meta-row">
            <span className="chip chip--blood">
              <Play size={10} fill="currentColor" />
              <span>{reel.views}</span>
            </span>
            <span className="chip">{reel.style}</span>
          </div>
          <p className="reel-tile__caption">{reel.caption}</p>
        </div>
      </div>

      {/* Book This Style text action */}
      <button
        type="button"
        className="reel-tile__book-btn label-type"
        onClick={() => openBooking({ source: `Reel: ${reel.caption}`, style: reel.style })}
      >
        <span>Book this style</span>
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
