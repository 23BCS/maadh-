import { useRef } from 'react';
import { useInView, useCycle, reduced } from './hooks';
import { LOGO_SRC, CONTACT_EMAIL } from './config';

export function Reveal({ children, as: T = 'div', delay = 0, className = '', ...p }) {
  const [ref, on] = useInView({ threshold: 0.15 });
  return <T ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...p}>{children}</T>;
}

// "*word*" marks accent words. Words slide up from a mask.
export function Split({ text, as: T = 'h2', className = '', delay = 0 }) {
  const [ref, on] = useInView({ threshold: 0.3 });
  let em = false;
  const words = text.split(' ').map((raw, i) => {
    let w = raw;
    if (w.startsWith('*')) { em = true; w = w.slice(1); }
    const isEm = em;
    if (w.endsWith('*')) { em = false; w = w.slice(0, -1); }
    return (
      <span className="sw" key={i} aria-hidden="true">
        <span className={isEm ? 'em' : ''} style={{ transitionDelay: `${delay + i * 55}ms` }}>{w}</span>
      </span>
    );
  });
  return <T ref={ref} className={`split ${on ? 'in' : ''} ${className}`} aria-label={text.replace(/\*/g, '')}>{words}</T>;
}

export function Eyebrow({ children }) { return <p className="eyebrow">{children}</p>; }

export function Magnetic({ as: T = 'a', children, className = '', ...p }) {
  const ref = useRef(null);
  const move = (e) => {
    if (reduced()) return;
    const el = ref.current, r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return <T ref={ref} className={`btn ${className}`} onMouseMove={move} onMouseLeave={leave} {...p}>{children}</T>;
}

// Single place the official logo is rendered; crops the asset's built-in whitespace via CSS only.
export function Logo({ size = 56 }) {
  return (
    <span className="logo" style={{ '--w': `${size}px` }}>
      <span className="logo-crop"><img src={LOGO_SRC} alt="MAADH — Health. Connected." width="512" height="512" decoding="async" /></span>
    </span>
  );
}

export const mailto = (subject) => (CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` : '#contact');

// Marks mock dashboards so they are never mistaken for real data.
export const Illustrative = () => <span className="illus">Illustrative interface</span>;

// Cycles an active step through a row of labelled steps while on screen.
export function Flow({ steps, ms = 1500, label }) {
  const [ref, on] = useInView({ threshold: 0.4, once: false });
  const i = useCycle(steps.length, ms, on);
  return (
    <ol className="flow" ref={ref} aria-label={label}>
      {steps.map((s, k) => (
        <li key={s} className={k === i ? 'on' : k < i ? 'done' : ''}>
          <span className="dot" /><span className="lbl">{s}</span>
        </li>
      ))}
    </ol>
  );
}
