import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// 1) Smooth, eased scrolling for the mouse wheel / trackpad.
// 2) Jumps to the top of the page whenever the route changes.
export default function ScrollManager() {
  const lenis = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual'; // don't reopen a refreshed page at the bottom
    // lerp = how quickly the scroll catches up: higher = snappier, lower = floatier
    lenis.current = new Lenis({ lerp: 0.12, autoRaf: true });
    return () => lenis.current.destroy();
  }, []);

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
