import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element enters the viewport.
 * Unobserves after the first trigger for optimal performance.
 */
export function useInView(options = {}) {
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If prefers-reduced-motion is active, mark inView immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const node = elementRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, {
      rootMargin: options.rootMargin || '0px 0px -40px 0px',
      threshold: options.threshold || 0.15
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options.rootMargin, options.threshold]);

  return [elementRef, inView];
}
