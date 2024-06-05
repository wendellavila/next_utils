import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * A hook that detects if the provided DOM node is currently in view.
 * @param {RefObject<HTMLElement | null>} ref - A reference to a DOM node.
 * @param {number} threshold - Amount of pixels that needs to be in view
 * to trigger an update. Defaults to 0.
 * @returns {boolean} The visibility status of the provided ref.
 */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  threshold?: number
) {
  const [inView, setVisibility] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!threshold || threshold < 0) {
      threshold = 0;
    } else {
      threshold = Math.floor(threshold);
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => setVisibility(entry.isIntersecting),
      {
        rootMargin:
          threshold !== undefined ? `0px 0px -${threshold}px` : undefined,
      }
    );
  }, [observerRef, threshold]);

  useEffect(() => {
    if (observerRef && observerRef.current && ref.current)
      observerRef.current.observe(ref.current);
    return () => {
      if (observerRef && observerRef.current) observerRef.current.disconnect();
    };
  }, [observerRef, ref]);
  return inView;
}

/**
 * A hook that returns the current width and height of a DOM node.
 * @param {RefObject<HTMLElement | null>} ref - A reference to a DOM node.
 * @param {number} threshold - The minimum difference in height or width (in pixels) to trigger an update.
 * This is used to avoid multiple rerenders while the window is still being resized. Defaults to 0px.
 * @returns {[number, number]} An array containing the current width in the first position and the current
 * height in the second position.
 */
export function useRefDimensions(
  ref: RefObject<HTMLElement | null>,
  threshold = 0
) {
  const [refDimensions, setRefDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      //When component size changes
      const newDimensions = {
        width: ref.current ? ref.current.offsetWidth : refDimensions.width,
        height: ref.current ? ref.current.offsetHeight : refDimensions.height,
      };

      const widthChanged =
        Math.abs(refDimensions.width - newDimensions.width) > threshold;
      const heightChanged =
        Math.abs(refDimensions.height - newDimensions.height) > threshold;
      if (widthChanged || heightChanged) {
        setRefDimensions(newDimensions);
      }
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [
    ref,
    threshold,
    refDimensions.width,
    refDimensions.height,
    setRefDimensions,
  ]);
  return [refDimensions.width, refDimensions.height];
}

/**
 * A hook that returns the current width and height of the window/viewport.
 * @param {number} threshold - The minimum difference in height or width (in pixels) to trigger an update.
 * This is used to avoid multiple rerenders while the window is still being resized. Defaults to 0px.
 * @returns {[number, number]} An array containing the current width in the first position and the current
 * height in the second position.
 */
export function useScreenDimensions(threshold = 0) {
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function getDimensions() {
      const hasWindow = typeof window !== 'undefined';
      return {
        width: hasWindow ? window.innerWidth : screenDimensions.width,
        height: hasWindow ? window.innerHeight : screenDimensions.height,
      };
    }

    function updateDimensions() {
      const newDimensions = getDimensions();
      const widthChanged =
        Math.abs(screenDimensions.width - newDimensions.width) > threshold;
      const heightChanged =
        Math.abs(screenDimensions.height - newDimensions.height) > threshold;
      if (widthChanged || heightChanged) {
        setScreenDimensions(newDimensions);
      }
    }

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions); // clean up
  }, [threshold, screenDimensions.width, screenDimensions.height]);

  return [screenDimensions.width, screenDimensions.height];
}
