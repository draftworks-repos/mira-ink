import React from 'react';
import { useInView } from '../hooks/useInView.js';
import './HeadlineMask.css';

export default function HeadlineMask({
  lines = [],
  as: Tag = 'h2',
  className = ''
}) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <Tag
      ref={ref}
      className={`headline-mask display-type ${inView ? 'is-in' : ''} ${className}`.trim()}
    >
      {lines.map((line, idx) => (
        <span key={idx} className="headline-mask__line">
          <span
            className="headline-mask__inner"
            style={{ '--line-delay': `${idx * 80}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
