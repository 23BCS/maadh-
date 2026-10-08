import { useEffect, useRef } from 'react';
import { Logo, Magnetic } from '../ui.jsx';
import { reduced } from '../hooks';
import { ICONS } from '../icons.jsx';
import { ADDRESS } from '../config';

const CHAIN = [['patient', 'Patient'], ['doctor', 'Doctor'], ['hospital', 'Hospital'], ['lab', 'Lab'], ['pharmacy', 'Pharmacy']];
const BLUE = '27,111,209', GREEN = '79,174,46';

function Network() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    const RM = reduced();
    let w = 0, h = 0, raf = 0, vis = true, nodes = [], parts = [];
    let mx = 0, my = 0, sx = 0, sy = 0, last = performance.now();
    const pulses = CHAIN.map(() => 0);
    const paths = Object.fromEntries(CHAIN.map(([k]) => [k, new Path2D(ICONS[k])]));

    const layout = () => {
      const r = c.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = w > 900;
      const px = wide ? [0.56, 0.66, 0.77, 0.87, 0.95] : [0.12, 0.31, 0.5, 0.69, 0.88];
      const py = wide ? [0.68, 0.4, 0.64, 0.36, 0.6].map((v) => v * h) : [h - 170, h - 105, h - 170, h - 105, h - 170];
      nodes = CHAIN.map((n, i) => ({ x: px[i] * w, y: py[i], ph: i * 1.3 }));
      const count = wide ? 48 : 22;
      parts = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: 1 + Math.random() * 1.8, z: 0.3 + Math.random() }));
    };

    const frame = (now) => {
      const dt = Math.min(now - last, 50); last = now;
      sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
      ctx.clearRect(0, 0, w, h);

      for (const p of parts) {
        p.x += p.vx * dt * 0.06 * 16; p.y += p.vy * dt * 0.06 * 16;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10; if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      }
      // soft links between nearby particles
      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i], ax = a.x + sx * 14 * a.z, ay = a.y + sy * 14 * a.z;
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j], bx = b.x + sx * 14 * b.z, by = b.y + sy * 14 * b.z;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 120) { ctx.strokeStyle = `rgba(${BLUE},${0.1 * (1 - d / 120)})`; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); }
        }
        ctx.fillStyle = `rgba(${a.r > 2 ? GREEN : BLUE},0.35)`;
        ctx.beginPath(); ctx.arc(ax, ay, a.r, 0, 6.283); ctx.fill();
      }

      const P = nodes.map((n, i) => ({ x: n.x + sx * 26, y: n.y + sy * 22 + Math.sin(now / 1400 + n.ph) * 4 }));
      // chain edges
      for (let i = 0; i < P.length - 1; i++) {
        const a = P[i], b = P[i + 1];
        const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, `rgba(${BLUE},0.45)`); g.addColorStop(1, `rgba(${GREEN},0.45)`);
        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.setLineDash([2, 6]); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]);
        // health-record packet travelling the edge
        const t = ((now / 2600) + i * 0.27) % 1, e = t * t * (3 - 2 * t);
        const x = a.x + (b.x - a.x) * e, y = a.y + (b.y - a.y) * e;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 16);
        grd.addColorStop(0, `rgba(${GREEN},0.55)`); grd.addColorStop(1, `rgba(${GREEN},0)`);
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(x, y, 16, 0, 6.283); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.strokeStyle = `rgb(${GREEN})`; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.roundRect(x - 7, y - 9, 14, 18, 2.5); ctx.fill(); ctx.stroke();
        ctx.fillStyle = `rgb(${BLUE})`; ctx.fillRect(x - 3.5, y - 4, 7, 1.5); ctx.fillRect(x - 3.5, y, 7, 1.5); ctx.fillRect(x - 3.5, y + 4, 4, 1.5);
        if (t > 0.94) pulses[i + 1] = 1;
      }
      // nodes
      P.forEach((n, i) => {
        pulses[i] = Math.max(0, pulses[i] - dt / 900);
        const R = 25;
        if (pulses[i] > 0) { ctx.strokeStyle = `rgba(${BLUE},${pulses[i] * 0.5})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(n.x, n.y, R + (1 - pulses[i]) * 26, 0, 6.283); ctx.stroke(); }
        const gl = ctx.createRadialGradient(n.x, n.y, R * 0.6, n.x, n.y, R * 2.4);
        gl.addColorStop(0, `rgba(${BLUE},0.16)`); gl.addColorStop(1, `rgba(${BLUE},0)`);
        ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(n.x, n.y, R * 2.4, 0, 6.283); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(27,111,209,0.5)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, R, 0, 6.283); ctx.fill(); ctx.stroke();
        ctx.save(); ctx.translate(n.x - 13, n.y - 13); ctx.scale(1.08, 1.08); ctx.strokeStyle = `rgb(${BLUE})`; ctx.lineWidth = 1.7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(paths[CHAIN[i][0]]); ctx.restore();
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '600 11px Inter Variable, system-ui, sans-serif'; ctx.fillStyle = '#4a5b72';
        ctx.fillText(CHAIN[i][1].toUpperCase(), n.x, n.y + R + 17);
      });
      if (!RM && vis) raf = requestAnimationFrame(frame);
    };

    layout();
    const onMove = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    const onResize = () => { layout(); if (RM) frame(performance.now()); };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; cancelAnimationFrame(raf); if (vis) { last = performance.now(); raf = requestAnimationFrame(frame); } });
    io.observe(c);
    if (!RM) addEventListener('pointermove', onMove, { passive: true });
    addEventListener('resize', onResize);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('pointermove', onMove); removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Network />
      <div className="wrap hero-in">
        <div className="hero-copy">
          <div className="logo-row fade" style={{ '--d': '.1s' }}>
            <Logo size={118} />
            <span className="sub">Mission for<br />Accessible &amp;<br />Digital Health</span>
          </div>
          <p className="badge fade" style={{ '--d': '.2s' }}><span className="pdot" />Work in progress · Building from {ADDRESS}</p>
          <h1 className="fade" style={{ '--d': '.25s' }}>Healthcare That <em>Cares.</em><br />Technology That <em>Protects.</em></h1>
          <p className="tag fade" style={{ '--d': '.4s' }}>MAADH — Mission for Accessible &amp; Digital Health</p>
          <p className="lead fade" style={{ '--d': '.5s' }}>An offline-first digital healthcare platform designed to connect patients, doctors, hospitals, laboratories, pharmacies and healthcare administrators through a unified digital healthcare ecosystem.</p>
          <div className="ctas fade" style={{ '--d': '.65s' }}>
            <Magnetic href="#story" className="primary">Explore MAADH <Arrow /></Magnetic>
            <Magnetic href="#vision" className="ghost">Our Vision</Magnetic>
          </div>
        </div>
      </div>
      <svg className="ecg" viewBox="0 0 1600 54" preserveAspectRatio="none" aria-hidden="true">
        <path className="base" d="M0 27H1600" />
        <path d="M0 27H300l14-3 12 3h20l8-3 8 3h70l10-22 14 46 12-24h24l12-6 12 6h160l10-22 14 46 12-24h24l12-6 12 6h160l10-22 14 46 12-24h24l12-6 12 6H1600" />
      </svg>
      <span className="scroll-cue">Scroll ↓</span>
    </section>
  );
}

export const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" /></svg>
);
