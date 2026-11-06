import React from 'react';
import HeadlineMask from './HeadlineMask.jsx';
import './SectionHead.css';

export default function SectionHead({
  number = "01",
  label = "SECTION",
  lines = [],
  action = null,
  theme = "dark",
  className = ""
}) {
  return (
    <div className={`section-head section-head--${theme} ${className}`.trim()}>
      <div className="section-head__meta">
        <span className="section-head__num display-type" aria-hidden="true">
          {number}
        </span>
        <div className="section-head__label-wrap">
          <span className="section-head__dash" aria-hidden="true" />
          <span className="section-head__label label-type">{label}</span>
        </div>
      </div>

      <div className="section-head__body">
        <HeadlineMask lines={lines} as="h2" className="section-head__title" />
        {action && <div className="section-head__action">{action}</div>}
      </div>
    </div>
  );
}
