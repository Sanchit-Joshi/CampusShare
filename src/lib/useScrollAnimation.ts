import { useEffect, useRef } from 'react';

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  animation?: 'fade-up' | 'fade-in';
  delay?: number;
};

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px',
  animation = 'fade-up',
  delay = 0,
}: AnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add initial state classes
    element.style.opacity = '0';
    element.style.transform = animation === 'fade-up' ? 'translateY(20px)' : 'none';
    element.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add animation classes when element comes into view
          element.style.opacity = '1';
          element.style.transform = 'none';
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [animation, delay, rootMargin, threshold]);

  return elementRef;
};