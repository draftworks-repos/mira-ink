import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext.jsx';
import './StyleList.css';

export default function StyleList({
  styles = [],
  activeIndex = 0,
  onActivate
}) {
  const { openBooking } = useBooking();

  return (
    <div className="style-list" role="list">
      {styles.map((style, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div
            key={style.id}
            className={`style-list__row ${isActive ? 'style-list__row--active' : ''}`}
            onMouseEnter={() => onActivate(idx)}
            onFocus={() => onActivate(idx)}
            onClick={() => onActivate(idx)}
            tabIndex={0}
            role="button"
            aria-selected={isActive}
            aria-label={`View style: ${style.name}`}
          >
            <div className="style-list__header">
              <span className="style-list__num display-type">{style.num}</span>
              <span className="style-list__title display-type">{style.name}</span>
              <ArrowUpRight
                size={28}
                className="style-list__arrow"
                aria-hidden="true"
              />
            </div>

            <div className="style-list__details">
              <p className="style-list__tagline">{style.tagline}</p>
              <button
                type="button"
                className="style-list__book-btn label-type"
                onClick={(e) => {
                  e.stopPropagation();
                  openBooking({
                    source: `Style List: ${style.name}`,
                    style: style.name
                  });
                }}
              >
                <span>Book this style</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
