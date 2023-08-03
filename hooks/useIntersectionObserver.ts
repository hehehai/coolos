'use client';

import React from "react";

export const useIntersectionObserver = <T extends HTMLElement | null>(
  ref: React.MutableRefObject<T>,
  options: {
    threshold?: number | number[];
    logicFn?: (entry: IntersectionObserverEntry) => boolean
  }
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(
        options?.logicFn ? options.logicFn(entry) : entry.isIntersecting
      );
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return isIntersecting;
};