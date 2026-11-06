import React from 'react';
import { useInView } from '../hooks/useInView.js';
import './Reveal.css';

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <Component
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Component>
  );
}
