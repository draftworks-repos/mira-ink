import React, { useState } from 'react';
import { images } from '../data/images.js';
import './CompareToggle.css';

export default function CompareToggle({
  item,
  isFeatured = false
}) {
  const [activeTab, setActiveTab] = useState('healed'); // default state is HEALED
  const comparison = images.healed[item.freshImgIndex] || images.healed[0];

  return (
    <div className={`compare-toggle ${isFeatured ? 'compare-toggle--featured' : ''}`}>
      <div className="compare-toggle__frame">
        {/* Fresh Image */}
        <div
          className={`compare-toggle__layer ${activeTab === 'fresh' ? 'compare-toggle__layer--active' : ''}`}
        >
          <img
            src={comparison.fresh.src}
            alt={comparison.fresh.alt}
            className="compare-toggle__img"
            loading="lazy"
          />
          <span className="compare-toggle__chip chip chip--blood">FRESH</span>
        </div>

        {/* Healed Image */}
        <div
          className={`compare-toggle__layer ${activeTab === 'healed' ? 'compare-toggle__layer--active' : ''}`}
        >
          <img
            src={comparison.healed.src}
            alt={comparison.healed.alt}
            className="compare-toggle__img"
            loading="lazy"
          />
          <span className="compare-toggle__chip chip chip--dark">HEALED</span>
        </div>
      </div>

      <div className="compare-toggle__controls">
        <div
          className="compare-toggle__segmented"
          role="tablist"
          aria-label={`Compare fresh and healed state for ${item.title}`}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'fresh'}
            className={`compare-toggle__tab label-type ${activeTab === 'fresh' ? 'compare-toggle__tab--active' : ''}`}
            onClick={() => setActiveTab('fresh')}
          >
            FRESH
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'healed'}
            className={`compare-toggle__tab label-type ${activeTab === 'healed' ? 'compare-toggle__tab--active' : ''}`}
            onClick={() => setActiveTab('healed')}
          >
            HEALED
          </button>
          <span
            className={`compare-toggle__indicator ${activeTab === 'healed' ? 'compare-toggle__indicator--healed' : ''}`}
            aria-hidden="true"
          />
        </div>

        <div className="compare-toggle__caption label-type">
          <span>{item.title}</span>
          <span className="compare-toggle__bullet">•</span>
          <span>{item.placement}</span>
          <span className="compare-toggle__bullet">•</span>
          <span className="compare-toggle__time">{item.healingTime}</span>
        </div>
      </div>
    </div>
  );
}
