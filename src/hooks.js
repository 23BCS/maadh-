import { useEffect, useRef, useState } from 'react';

export const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null);
  const [on, set] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !('IntersectionObserver' in window)) { set(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { set(true); if (once) io.disconnect(); }
      else if (!once) set(false);
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, on];
}

// Writes --p (0..1 through the element's scroll travel) straight to CSS; no React re-render.
export function useScrollVars(fn) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      el.style.setProperty('--p', p.toFixed(4));
      fn && fn(p, el);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

// Cycles 0..n-1 while `active`; static at last step under reduced motion.
export function useCycle(n, ms, active) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) { setI(n - 1); return; }
    if (!active) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms, active]);
  return i;
}
