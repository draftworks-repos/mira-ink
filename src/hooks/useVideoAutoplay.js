import { useEffect } from 'react';

export function useVideoAutoplay(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check reduced motion or data saver
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSaveData = navigator.connection && navigator.connection.saveData;

    if (prefersReducedMotion || isSaveData) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser prevented autoplay, graceful fallback to poster
            });
          }
        } else {
          video.pause();
        }
      },
      {
        threshold: [0.6]
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [videoRef]);
}
