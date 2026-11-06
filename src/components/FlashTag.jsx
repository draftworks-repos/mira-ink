import React from 'react';
import { useBooking } from '../context/BookingContext.jsx';
import { images } from '../data/images.js';
import './FlashTag.css';

export default function FlashTag({
  flash,
  index = 0
}) {
  const { openBooking } = useBooking();
  const imgData = images.flash[flash.imageIndex] || images.flash[0];
  const formattedPrice = new Intl.NumberFormat('en-IN').format(flash.priceInr);

  const isRotatedLeft = index % 2 === 0;

  const handleBook = () => {
    if (flash.sold) return;
    openBooking({
      source: `Flash: ${flash.name}`,
      design: flash.name,
      inches: flash.inches,
      budget: flash.priceInr
    });
  };

  return (
    <div
      className={`flash-tag ${isRotatedLeft ? 'flash-tag--tilt-left' : 'flash-tag--tilt-right'} ${flash.sold ? 'flash-tag--sold' : ''}`}
    >
      {/* Hanging tag punched hole & string */}
      <div className="flash-tag__hang" aria-hidden="true">
        <span className="flash-tag__string" />
        <span className="flash-tag__hole" />
      </div>

      <div className="flash-tag__media">
        <img
          src={imgData.src}
          alt={flash.name}
          className="flash-tag__img"
          loading="lazy"
        />

        {flash.sold && (
          <div className="flash-tag__sold-strike" aria-hidden="true">
            <span className="flash-tag__sold-label display-type">SOLD</span>
          </div>
        )}
      </div>

      <div className="flash-tag__body">
        <div className="flash-tag__status-row">
          {!flash.sold ? (
            <span className="flash-tag__badge flash-tag__badge--available label-type">
              <span className="flash-tag__dot" />
              Available
            </span>
          ) : (
            <span className="flash-tag__badge flash-tag__badge--claimed label-type">
              Claimed
            </span>
          )}
          <span className="flash-tag__size label-type">{flash.inches} in</span>
        </div>

        <h3 className="display-type flash-tag__name">{flash.name}</h3>

        <div className="flash-tag__price-row">
          <span className="flash-tag__price tabular-num">
            <span className="flash-tag__currency">₹</span>
            {formattedPrice}
          </span>

          <button
            type="button"
            disabled={flash.sold}
            onClick={handleBook}
            className="flash-tag__btn label-type"
            aria-label={flash.sold ? `${flash.name} is sold` : `Book ${flash.name} for ₹${formattedPrice}`}
          >
            {flash.sold ? 'CLAIMED' : 'BOOK THIS'}
          </button>
        </div>
      </div>
    </div>
  );
}
