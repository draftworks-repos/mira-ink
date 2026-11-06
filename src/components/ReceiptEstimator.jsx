import React, { useState, useMemo } from 'react';
import CtaButton from './CtaButton.jsx';
import { pricingData } from '../data/pricing.js';
import { useBooking } from '../context/BookingContext.jsx';
import './ReceiptEstimator.css';

export default function ReceiptEstimator() {
  const { openBooking } = useBooking();

  const [inches, setInches] = useState(4);
  const [selectedStyle, setSelectedStyle] = useState('Fine Line');
  const [hasColor, setHasColor] = useState(false);
  const [isCoverUp, setIsCoverUp] = useState(false);

  const rate = pricingData.ratesPerInch[selectedStyle] || 1800;

  // Calculation formula
  const calculation = useMemo(() => {
    const rawBase = inches * rate;
    let base = Math.max(pricingData.minInr, rawBase);

    let colorAdd = 0;
    if (hasColor) {
      colorAdd = Math.round(base * 0.2);
    }

    let coverAdd = 0;
    if (isCoverUp) {
      coverAdd = Math.round(base * 0.25);
    }

    const subtotal = base + colorAdd + coverAdd;
    const lowEst = Math.round((subtotal * 0.9) / 100) * 100;
    const highEst = Math.round((subtotal * 1.15) / 100) * 100;

    return {
      base,
      colorAdd,
      coverAdd,
      subtotal,
      lowEst,
      highEst
    };
  }, [inches, rate, hasColor, isCoverUp]);

  const formatInr = (val) => new Intl.NumberFormat('en-IN').format(val);

  const handleBookEstimate = () => {
    openBooking({
      source: `Estimate: ${selectedStyle} (${inches} in)`,
      style: selectedStyle,
      inches: inches,
      budget: calculation.highEst
    });
  };

  return (
    <div className="receipt-card">
      <div className="receipt-card__torn-top" aria-hidden="true" />

      <div className="receipt-card__content">
        {/* Header */}
        <div className="receipt-card__header">
          <span className="display-type receipt-card__brand">MIRA INK</span>
          <span className="label-type receipt-card__doc-title">ESTIMATE RECEIPT</span>
          <span className="receipt-card__meta tabular-num">
            REF #{(inches * 137).toString(16).toUpperCase()} • {new Date().toLocaleDateString('en-GB')}
          </span>
        </div>

        <div className="receipt-card__divider" />

        {/* Inputs */}
        <div className="receipt-card__controls">
          {/* Inches Slider */}
          <div className="receipt-card__ctrl-group">
            <div className="receipt-card__ctrl-label-row">
              <label htmlFor="est-inches" className="label-type">
                Dimension (Longest side)
              </label>
              <span className="receipt-card__slider-val tabular-num">{inches} INCHES</span>
            </div>
            <input
              id="est-inches"
              type="range"
              min="1"
              max="24"
              step="1"
              value={inches}
              onChange={(e) => setInches(parseInt(e.target.value, 10))}
              className="receipt-card__slider"
            />
          </div>

          {/* Style Selector */}
          <div className="receipt-card__ctrl-group">
            <label htmlFor="est-style" className="label-type">
              Tattoo Style
            </label>
            <select
              id="est-style"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="receipt-card__select"
            >
              {Object.keys(pricingData.ratesPerInch).map((st) => (
                <option key={st} value={st}>
                  {st} (₹{formatInr(pricingData.ratesPerInch[st])}/in)
                </option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="receipt-card__toggles-row">
            <label className="receipt-card__toggle-label">
              <input
                type="checkbox"
                checked={hasColor}
                onChange={(e) => setHasColor(e.target.checked)}
                className="receipt-card__checkbox"
              />
              <span className="label-type">Colour Accents (+20%)</span>
            </label>

            <label className="receipt-card__toggle-label">
              <input
                type="checkbox"
                checked={isCoverUp}
                onChange={(e) => setIsCoverUp(e.target.checked)}
                className="receipt-card__checkbox"
              />
              <span className="label-type">Cover-Up (+25%)</span>
            </label>
          </div>
        </div>

        <div className="receipt-card__divider" />

        {/* Live Line Items */}
        <div className="receipt-card__ledger tabular-num">
          <div className="receipt-card__line-item">
            <span>Base ({inches}" @ ₹{formatInr(rate)}/in):</span>
            <span>₹{formatInr(calculation.base)}</span>
          </div>

          {hasColor && (
            <div className="receipt-card__line-item">
              <span>Colour Accents (+20%):</span>
              <span>+₹{formatInr(calculation.colorAdd)}</span>
            </div>
          )}

          {isCoverUp && (
            <div className="receipt-card__line-item">
              <span>Cover-Up Complexity (+25%):</span>
              <span>+₹{formatInr(calculation.coverAdd)}</span>
            </div>
          )}
        </div>

        <div className="receipt-card__divider receipt-card__divider--double" />

        {/* Total Range */}
        <div className="receipt-card__total-wrap" key={`${inches}-${selectedStyle}-${hasColor}-${isCoverUp}`}>
          <span className="label-type receipt-card__total-label">ESTIMATED RANGE:</span>
          <div className="receipt-card__total-range display-type">
            <span>₹{formatInr(calculation.lowEst)}</span>
            <span className="receipt-card__total-dash">—</span>
            <span>₹{formatInr(calculation.highEst)}</span>
          </div>
        </div>

        <div className="receipt-card__disclaimer">
          <p>Estimate only. Final quote confirmed after free consultation and stencil fitting.</p>
        </div>

        {/* CTA Button */}
        <div className="receipt-card__action">
          <CtaButton
            size="md"
            variant="blood"
            onClick={handleBookEstimate}
            className="receipt-card__btn"
          >
            BOOK WITH THIS ESTIMATE
          </CtaButton>
        </div>

        {/* Fake Barcode */}
        <div className="receipt-card__barcode-wrap">
          <div className="receipt-card__barcode" aria-hidden="true" />
          <span className="label-type receipt-card__barcode-num">
            * 9 8 7 6 5 4 3 2 1 0 *
          </span>
        </div>
      </div>

      <div className="receipt-card__torn-bottom" aria-hidden="true" />
    </div>
  );
}
