import { Component, lazy, Suspense, useEffect, useState } from 'react';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import { Logo } from './ui.jsx';
import { reduced } from './hooks';

const load = {
  Story: () => import('./sections/Story.jsx'),
  Problem: () => import('./sections/Problem.jsx'),
  Solution: () => import('./sections/Solution.jsx'),
  Offline: () => import('./sections/Offline.jsx'),
  Patient: () => import('./sections/Patient.jsx'),
  Portals: () => import('./sections/Portals.jsx'),
  Command: () => import('./sections/Command.jsx'),
  Intelligence: () => import('./sections/Intelligence.jsx'),
  Security: () => import('./sections/Security.jsx'),
  Ecosystem: () => import('./sections/Ecosystem.jsx'),
  Founder: () => import('./sections/Founder.jsx'),
  Vision: () => import('./sections/Vision.jsx'),
  Closing: () => import('./sections/Closing.jsx'),
};
const Lazy = Object.fromEntries(Object.entries(load).map(([k, f]) => [k, lazy(f)]));
const order = Object.keys(load);

class Boundary extends Component {
  state = { bad: false };
  static getDerivedStateFromError() { return { bad: true }; }
  render() {
    if (!this.state.bad) return this.props.children;
    return <div className="err" role="alert"><p>This section could not load.</p><button onClick={() => this.setState({ bad: false })}>Try again</button></div>;
  }
}

// Below-the-fold chunks start fetching only after first paint is idle.
function useIdle() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    const id = 'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 1200 }) : setTimeout(go, 400);
    return () => ('cancelIdleCallback' in window ? cancelIdleCallback(id) : clearTimeout(id));
  }, []);
  return ready;
}

function CursorGlow() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduced() || matchMedia('(pointer: coarse)').matches) return;
    const el = document.querySelector('.cursor-glow');
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => { x += (tx - x) * 0.14; y += (ty - y) * 0.14; el.style.transform = `translate(${x}px, ${y}px)`; raf = requestAnimationFrame(loop); };
    const mv = (e) => { tx = e.clientX; ty = e.clientY; setOn(true); };
    addEventListener('pointermove', mv, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', mv); cancelAnimationFrame(raf); };
  }, []);
  return <div className={`cursor-glow ${on ? 'on' : ''}`} aria-hidden="true" />;
}

// Thin read-progress bar + 3D tilt on hover cards. Both write straight to the DOM (no re-renders).
function useFx() {
  useEffect(() => {
    if (reduced()) return;
    const root = document.documentElement;
    const onScroll = () => root.style.setProperty('--sp', (scrollY / Math.max(1, root.scrollHeight - innerHeight)).toFixed(4));
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    if (!matchMedia('(pointer: fine)').matches) return () => removeEventListener('scroll', onScroll);
    const SEL = '.pcard, .scell, .layer, .glance > div, .io > div';
    const move = (e) => {
      const el = e.target.closest?.(SEL);
      if (!el) return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = 'transform .15s ease-out';
      el.style.transform = `perspective(700px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
    };
    const out = (e) => { const el = e.target.closest?.(SEL); if (el) { el.style.transition = ''; el.style.transform = ''; } };
    addEventListener('pointermove', move, { passive: true });
    addEventListener('pointerout', out, { passive: true });
    return () => { removeEventListener('scroll', onScroll); removeEventListener('pointermove', move); removeEventListener('pointerout', out); };
  }, []);
}

const TICKER = ['Offline-first', 'Patient continuity', 'Connected care', 'Secure by design', 'Built in Jharkhand', 'Work in progress', 'Care that protects'];
function Ticker() {
  const row = TICKER.map((t) => <span key={t}>{t}<i aria-hidden="true" /></span>);
  return <div className="ticker" aria-hidden="true"><div className="tk">{row}{row}{row}{row}</div></div>;
}

export default function App() {
  useFx();
  const idle = useIdle();
  const [loaded, setLoaded] = useState(reduced());

  useEffect(() => {
    if (loaded) return;
    const done = () => setTimeout(() => setLoaded(true), 650);
    if (document.readyState === 'complete') done(); else addEventListener('load', done, { once: true });
  }, [loaded]);

  // Anchor links to not-yet-mounted sections: wait a frame so layout exists.
  useEffect(() => {
    if (location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 800);
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className={`loader ${loaded ? 'off' : ''}`} aria-hidden={loaded}>
        <div className="loader-in"><Logo size={92} /><div className="loader-bar"><i /></div></div>
      </div>
      <CursorGlow />
      <div className="progress" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        {idle && order.map((k) => {
          const C = Lazy[k];
          return <Boundary key={k}><Suspense fallback={<div className="ph" aria-hidden="true" />}><C /></Suspense></Boundary>;
        })}
      </main>
    </>
  );
}
