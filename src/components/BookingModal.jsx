import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Copy, MessageCircle, ExternalLink } from 'lucide-react';
import { useBooking } from '../context/BookingContext.jsx';
import { site } from '../data/site.js';
import CtaButton from './CtaButton.jsx';
import './BookingModal.css';

const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export default function BookingModal() {
  const { isOpen, bookingData, closeBooking } = useBooking();
  const dialogRef = useRef(null);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [style, setStyle] = useState('Fine Line');
  const [placement, setPlacement] = useState('Forearm');
  const [size, setSize] = useState('');
  const [budget, setBudget] = useState('');
  const [date, setDate] = useState('');
  const [idea, setIdea] = useState('');

  // Status & validation
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastSummary, setLastSummary] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Today for min date
  const todayStr = new Date().toISOString().split('T')[0];

  // Sync modal state with HTML dialog & prefill data
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setSubmitted(false);
      setCopied(false);
      setErrors({});

      // Apply prefill
      if (bookingData.style) setStyle(bookingData.style);
      if (bookingData.inches) setSize(String(bookingData.inches));
      if (bookingData.budget) setBudget(String(bookingData.budget));
      if (bookingData.design) {
        setIdea((prev) => (prev ? prev : `Booking request for flash design: ${bookingData.design}`));
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen, bookingData]);

  // Handle click on backdrop
  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) {
      closeBooking();
    }
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!phone.trim()) {
      errs.phone = 'Phone / WhatsApp is required';
    } else if (!PHONE_REGEX.test(phone.trim().replace(/\s+/g, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian phone number (+91 optional)';
    }
    const numSize = parseFloat(size);
    if (!size || isNaN(numSize) || numSize < 1 || numSize > 40) {
      errs.size = 'Enter approximate size between 1 and 40 inches';
    }
    if (!idea.trim()) {
      errs.idea = 'Please share a brief description of your idea';
    }
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Focus first error
      const firstField = Object.keys(errs)[0];
      const el = document.getElementById(`field-${firstField}`);
      if (el) el.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const summaryLines = [
      `TATTOO ENQUIRY - ${site.studioName}`,
      `Name: ${name.trim()}`,
      `Phone/WhatsApp: ${phone.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      `Style: ${style}`,
      `Placement: ${placement}`,
      `Size: ${size} inches (longest side)`,
      budget ? `Budget: ₹${budget}` : null,
      date ? `Preferred Date: ${date}` : null,
      bookingData.design ? `Flash Design: ${bookingData.design}` : null,
      bookingData.source ? `Source: ${bookingData.source}` : null,
      `Deposit Policy: ₹${site.depositInr} adjustable against final quote`,
      `\r\nClient Idea / Concept:\r\n${idea.trim().slice(0, 500)}`
    ].filter(Boolean);

    const fullSummary = summaryLines.join('\r\n');
    setLastSummary(fullSummary);

    const subject = `Tattoo enquiry: ${name.trim()} (${style})`;
    const generatedMailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullSummary)}`;
    setMailtoUrl(generatedMailto);

    const cleanPhone = site.whatsappNumber.replace(/[^0-9]/g, '');
    const generatedWa = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      `Hi Mira, I'd like to book a tattoo session!\n\n${fullSummary}`
    )}`;
    setWhatsappUrl(generatedWa);

    setSubmitted(true);

    // Open mail client
    try {
      window.location.href = generatedMailto;
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    if (!lastSummary) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastSummary)
        .then(() => setCopied(true))
        .catch(() => fallbackCopy(lastSummary));
    } else {
      fallbackCopy(lastSummary);
    }
    setTimeout(() => setCopied(false), 3000);
  };

  const fallbackCopy = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      setCopied(true);
    } catch {
      // copy failed
    }
    document.body.removeChild(el);
  };

  return (
    <dialog
      ref={dialogRef}
      className="booking-modal"
      onClick={handleDialogClick}
      onCancel={(e) => {
        e.preventDefault();
        closeBooking();
      }}
    >
      <div className="booking-modal__container">
        <button
          type="button"
          onClick={closeBooking}
          className="booking-modal__close"
          aria-label="Close booking modal"
        >
          <X size={24} />
        </button>

        {/* Prefill indicator chip */}
        {(bookingData.design || bookingData.style || bookingData.source) && (
          <div className="booking-modal__prefill-chip chip chip--blood">
            {bookingData.design
              ? `Design: ${bookingData.design}`
              : bookingData.style
              ? `Style: ${bookingData.style}`
              : `Selected: ${bookingData.source}`}
          </div>
        )}

        {!submitted ? (
          <>
            <div className="booking-modal__header">
              <span className="label-type booking-modal__tag">DIRECT WITH MIRA</span>
              <h2 className="display-type booking-modal__title">BOOK A SESSION</h2>
            </div>

            <form onSubmit={handleSubmit} className="booking-modal__form" noValidate>
              <div className="booking-modal__grid">
                {/* Name */}
                <div className="booking-modal__field">
                  <label htmlFor="field-name" className="label-type booking-modal__label">
                    Full Name *
                  </label>
                  <input
                    id="field-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tara Mehta"
                    className={`booking-modal__input ${errors.name ? 'booking-modal__input--error' : ''}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && (
                    <span id="err-name" className="booking-modal__error">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="booking-modal__field">
                  <label htmlFor="field-phone" className="label-type booking-modal__label">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="field-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`booking-modal__input ${errors.phone ? 'booking-modal__input--error' : ''}`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                  />
                  {errors.phone && (
                    <span id="err-phone" className="booking-modal__error">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="booking-modal__field">
                  <label htmlFor="field-email" className="label-type booking-modal__label">
                    Email Address (Optional)
                  </label>
                  <input
                    id="field-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tara@example.com"
                    className="booking-modal__input"
                  />
                </div>

                {/* Style */}
                <div className="booking-modal__field">
                  <label htmlFor="field-style" className="label-type booking-modal__label">
                    Style Preference
                  </label>
                  <select
                    id="field-style"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="booking-modal__input booking-modal__select"
                  >
                    <option value="Fine Line">Fine Line</option>
                    <option value="Black & Grey">Black & Grey</option>
                    <option value="Blackwork">Blackwork</option>
                    <option value="Realism">Realism</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Not sure / Open to advice">Not sure / Open to advice</option>
                  </select>
                </div>

                {/* Placement */}
                <div className="booking-modal__field">
                  <label htmlFor="field-placement" className="label-type booking-modal__label">
                    Placement
                  </label>
                  <select
                    id="field-placement"
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="booking-modal__input booking-modal__select"
                  >
                    <option value="Forearm">Forearm</option>
                    <option value="Upper arm">Upper arm</option>
                    <option value="Shoulder">Shoulder</option>
                    <option value="Back">Back</option>
                    <option value="Chest">Chest</option>
                    <option value="Ribs">Ribs</option>
                    <option value="Thigh">Thigh</option>
                    <option value="Calf">Calf</option>
                    <option value="Ankle">Ankle</option>
                    <option value="Hand/Fingers">Hand / Fingers</option>
                    <option value="Neck">Neck</option>
                    <option value="Other">Other / Multi-placement</option>
                  </select>
                </div>

                {/* Size */}
                <div className="booking-modal__field">
                  <label htmlFor="field-size" className="label-type booking-modal__label">
                    Approx. Size in Inches *
                  </label>
                  <input
                    id="field-size"
                    type="number"
                    min="1"
                    max="40"
                    step="0.5"
                    required
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 4"
                    className={`booking-modal__input ${errors.size ? 'booking-modal__input--error' : ''}`}
                    aria-invalid={!!errors.size}
                    aria-describedby={errors.size ? 'err-size' : undefined}
                  />
                  <span className="booking-modal__helper">Longest dimension across the piece</span>
                  {errors.size && (
                    <span id="err-size" className="booking-modal__error">
                      {errors.size}
                    </span>
                  )}
                </div>

                {/* Budget */}
                <div className="booking-modal__field">
                  <label htmlFor="field-budget" className="label-type booking-modal__label">
                    Estimated Budget (INR)
                  </label>
                  <div className="booking-modal__input-prefix">
                    <span className="booking-modal__currency">₹</span>
                    <input
                      id="field-budget"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. 8000"
                      className="booking-modal__input booking-modal__input--prefixed"
                    />
                  </div>
                </div>

                {/* Preferred Date */}
                <div className="booking-modal__field">
                  <label htmlFor="field-date" className="label-type booking-modal__label">
                    Preferred Date
                  </label>
                  <input
                    id="field-date"
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="booking-modal__input"
                  />
                </div>
              </div>

              {/* Idea */}
              <div className="booking-modal__field booking-modal__field--full">
                <div className="booking-modal__field-head">
                  <label htmlFor="field-idea" className="label-type booking-modal__label">
                    Your Idea / Concept *
                  </label>
                  <span className="booking-modal__counter">{idea.length}/600</span>
                </div>
                <textarea
                  id="field-idea"
                  rows={4}
                  maxLength={600}
                  required
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe reference elements, mood, whether it is a cover-up, or any personal symbolism..."
                  className={`booking-modal__textarea ${errors.idea ? 'booking-modal__input--error' : ''}`}
                  aria-invalid={!!errors.idea}
                  aria-describedby={errors.idea ? 'err-idea' : undefined}
                />
                {errors.idea && (
                  <span id="err-idea" className="booking-modal__error">
                    {errors.idea}
                  </span>
                )}
              </div>

              <div className="booking-modal__footer">
                <CtaButton type="submit" size="lg" variant="blood">
                  SEND ENQUIRY
                </CtaButton>
              </div>
            </form>
          </>
        ) : (
          <div className="booking-modal__success">
            <span className="label-type booking-modal__tag">ENQUIRY PREPARED</span>
            <h2 className="display-type booking-modal__success-title">
              EMAIL APP OPENING...
            </h2>
            <p className="booking-modal__success-notice">
              Your default email app should trigger automatically with the pre-formatted subject and details.
              <strong> Remember to attach your reference screenshots or photo inspirations directly in the email.</strong>
            </p>

            <div className="booking-modal__actions-block">
              <button
                type="button"
                onClick={handleCopy}
                className="booking-modal__copy-btn"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'DETAILS COPIED TO CLIPBOARD' : 'COPY ENQUIRY DETAILS'}</span>
              </button>

              <div className="booking-modal__links-row">
                <a
                  href={mailtoUrl}
                  className="booking-modal__fallback-link"
                >
                  <ExternalLink size={16} />
                  <span>Open Email App Directly</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="booking-modal__wa-link"
                >
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="booking-modal__summary-box">
              <span className="label-type booking-modal__summary-label">Formatted Summary:</span>
              <pre className="booking-modal__summary-text">{lastSummary}</pre>
            </div>

            <CtaButton
              size="md"
              variant="outline"
              onClick={closeBooking}
              className="booking-modal__done-btn"
            >
              DONE / CLOSE
            </CtaButton>
          </div>
        )}
      </div>
    </dialog>
  );
}
