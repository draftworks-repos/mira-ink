import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import SectionHead from '../components/SectionHead.jsx';
import GalleryTile from '../components/GalleryTile.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { galleryPieces } from '../data/gallery.js';
import './GallerySection.css';

const CATEGORIES = [
  'All',
  'Fine Line',
  'Black & Grey',
  'Blackwork',
  'Realism',
  'Traditional'
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(() => (
    typeof window !== 'undefined' && window.innerWidth <= 640 ? 3 : 5
  ));
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth <= 640 ? 3 : 5);
    };

    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const headline = [
    <span>HEALED &amp;</span>,
    <span>
      <em className="serif-accent">still</em> hurting.
    </span>
  ];

  const filteredPieces = useMemo(() => {
    if (activeTab === 'All') return galleryPieces;
    return galleryPieces.filter((p) => p.style === activeTab);
  }, [activeTab]);

  const displayedPieces = filteredPieces.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPieces.length;

  const handleCategorySelect = (category) => {
    setActiveTab(category);
    setVisibleCount(window.innerWidth <= 640 ? 3 : 5);
    setDrawerOpen(false);
  };

  const handleNext = () => {
    if (!selectedPiece) return;
    const currentIndex = filteredPieces.findIndex((p) => p.id === selectedPiece.id);
    const nextIndex = (currentIndex + 1) % filteredPieces.length;
    setSelectedPiece(filteredPieces[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPiece) return;
    const currentIndex = filteredPieces.findIndex((p) => p.id === selectedPiece.id);
    const prevIndex = (currentIndex - 1 + filteredPieces.length) % filteredPieces.length;
    setSelectedPiece(filteredPieces[prevIndex]);
  };

  const filterTriggerAction = (
    <div className="gallery-section__controls">
      <button
        type="button"
        className="gallery-section__drawer-trigger label-type"
        onClick={() => setDrawerOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={drawerOpen}
        aria-label={`Filter styles, currently ${activeTab}`}
      >
        <SlidersHorizontal size={14} className="gallery-section__trigger-icon" />
        <span className="gallery-section__trigger-label">STYLE:</span>
        <span className="gallery-section__trigger-value">{activeTab.toUpperCase()}</span>
        <span className="gallery-section__trigger-badge">{filteredPieces.length}</span>
      </button>
    </div>
  );

  return (
    <section id="work" className="gallery-section section section--void section--below-fold" aria-labelledby="work-head">
      <div className="container">
        <SectionHead
          number="02"
          label="WORK"
          lines={headline}
          action={filterTriggerAction}
          theme="dark"
        />

        {/* Active Style Indicator Pill Strip */}
        <div className="gallery-section__active-bar">
          <span className="label-type gallery-section__active-meta">
            Showing {displayedPieces.length} of {filteredPieces.length} pieces in{' '}
            <strong className="gallery-section__active-name">{activeTab}</strong>
          </span>
          {activeTab !== 'All' && (
            <button
              type="button"
              className="gallery-section__clear-btn label-type"
              onClick={() => handleCategorySelect('All')}
            >
              Reset to All
            </button>
          )}
        </div>

        {/* Contact Sheet Grid */}
        <div className="gallery-section__grid" key={activeTab}>
          {displayedPieces.map((piece, idx) => (
            <GalleryTile
              key={piece.id}
              piece={piece}
              isFeatured={activeTab === 'All' && idx === 0}
              onClick={setSelectedPiece}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="gallery-section__load-more">
            <button
              type="button"
              className="gallery-section__load-btn label-type"
              onClick={() => setVisibleCount((prev) => prev + 4)}
            >
              LOAD MORE WORK ({filteredPieces.length - visibleCount} REMAINING)
            </button>
          </div>
        )}
      </div>

      {/* Bottom-to-Top Category Drawer Sheet Portal */}
      {typeof document !== 'undefined' && createPortal(
        <>
          <div
            className={`gallery-drawer__backdrop ${drawerOpen ? 'gallery-drawer__backdrop--open' : ''}`}
            onClick={() => setDrawerOpen(false)}
            aria-hidden={!drawerOpen}
          />

          <div
            className={`gallery-drawer ${drawerOpen ? 'gallery-drawer--open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Filter work by category"
          >
            <div className="gallery-drawer__header">
              <div className="gallery-drawer__drag-pill" />
              <div className="gallery-drawer__header-row">
                <div>
                  <span className="label-type gallery-drawer__tag">PORTFOLIO FILTER</span>
                  <h3 className="display-type gallery-drawer__title">SELECT STYLE</h3>
                </div>
                <button
                  type="button"
                  className="gallery-drawer__close-btn"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filter drawer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="gallery-drawer__body">
              <div className="gallery-drawer__list" role="radiogroup" aria-label="Tattoo style categories">
                {CATEGORIES.map((category) => {
                  const isSelected = activeTab === category;
                  const count = category === 'All'
                    ? galleryPieces.length
                    : galleryPieces.filter((p) => p.style === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleCategorySelect(category)}
                      className={`gallery-drawer__item ${isSelected ? 'gallery-drawer__item--selected' : ''}`}
                    >
                      <div className="gallery-drawer__item-left">
                        <span className="gallery-drawer__radio-indicator">
                          {isSelected && <span className="gallery-drawer__radio-dot" />}
                        </span>
                        <span className="gallery-drawer__item-name">{category}</span>
                      </div>

                      <div className="gallery-drawer__item-right">
                        <span className="gallery-drawer__item-count label-type">{count} pieces</span>
                        {isSelected && <Check size={16} className="gallery-drawer__check-icon" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="gallery-drawer__footer">
              <button
                type="button"
                className="gallery-drawer__done-btn label-type"
                onClick={() => setDrawerOpen(false)}
              >
                VIEW RESULTS ({filteredPieces.length})
              </button>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Lightbox Dialog */}
      <Lightbox
        piece={selectedPiece}
        onClose={() => setSelectedPiece(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
