import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './CtaButton.css';

export default function CtaButton({
  children,
  onClick,
  variant = 'blood',
  size = 'md',
  icon = true,
  href,
  className = '',
  type = 'button',
  ariaLabel
}) {
  const content = (
    <span className="cta-button__roll">
      <span className="cta-button__label cta-button__label--primary">
        <span>{children}</span>
        {icon && <ArrowUpRight className="cta-button__icon" size={16} />}
      </span>
      <span className="cta-button__label cta-button__label--clone" aria-hidden="true">
        <span>{children}</span>
        {icon && <ArrowUpRight className="cta-button__icon" size={16} />}
      </span>
    </span>
  );

  const classes = `cta-button cta-button--${variant} cta-button--${size} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
