import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import CtaButton from './CtaButton.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { images } from '../data/images.js';
import './Lightbox.css';

export default function Lightbox({
  piece,
  onClose,
  onPrev,
  onNext
}) {
  const dialogRef = useRef(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (piece) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [piece]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!piece) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [piece, onPrev, onNext, onClose]);

  if (!piece) return null;

  const imgData = images.gallery[piece.imageIndex] || images.gallery[0];

  const handleBookLikeThis = () => {
    onClose();
    openBooking({
      source: `Gallery: ${piece.title}`,
      style: piece.style
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="lightbox__wrapper">
        <button
          type="button"
          onClick={onClose}
          className="lightbox__close"
          aria-label="Close lightbox"
        >
          <X size={26} />
        </button>

        <button
          type="button"
          onClick={onPrev}
          className="lightbox__nav-btn lightbox__nav-btn--prev"
          aria-label="Previous piece"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="lightbox__nav-btn lightbox__nav-btn--next"
          aria-label="Next piece"
        >
          <ChevronRight size={32} />
        </button>

        <div className="lightbox__stage">
          <div className="lightbox__image-frame">
            <img
              src={imgData.src}
              alt={piece.title}
              className="lightbox__img"
            />
          </div>

          <div className="lightbox__footer">
            <div className="lightbox__meta">
              <span className="chip chip--blood">{piece.style}</span>
              <span className="chip chip--dark">{piece.placement}</span>
              <h3 className="display-type lightbox__title">{piece.title}</h3>
            </div>

            <CtaButton
              size="md"
              variant="blood"
              onClick={handleBookLikeThis}
            >
              BOOK SOMETHING LIKE THIS
            </CtaButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}
