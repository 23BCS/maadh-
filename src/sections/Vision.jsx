import { useEffect, useRef, useState } from 'react';
import { Eyebrow, Reveal } from '../ui.jsx';
import { useScrollVars, useInView, reduced } from '../hooks';
import { ADDRESS } from '../config';

const clamp = (v) => Math.min(1, Math.max(0, v));
const mix = (a, b, t) => a + (b - a) * t;
const GREY = [93, 115, 150], GREEN = [127, 224, 162];

// Scattered points drift toward a hex lattice and link up as the section scrolls: "fragmented" -> "connected".
function Converge({ secRef }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d'), RM = reduced();
    let w = 0, h = 0, raf = 0, vis = true, nodes = [], edges = [];
    const build = () => {
      const r = c.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const R = Math.min(w, h) * 0.44, step = R / 4.2;
      nodes = [];
      for (let q = -6; q <= 6; q++) for (let s = -6; s <= 6; s++) {
        const x = step * (q + s / 2), y = step * s * 0.866;
        if (Math.hypot(x, y) <= R) nodes.push({ tx: w / 2 + x, ty: h / 2 + y, d: Math.hypot(x, y) / R, sx: Math.random() * w, sy: Math.random() * h, ph: Math.random() * 6.28 });
      }
      edges = [];
      nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && Math.hypot(a.tx - b.tx, a.ty - b.ty) < step * 1.1) edges.push([i, j, Math.random()]); }));
    };
    const progress = () => {
      if (RM) return 1;
      const r = secRef.current.getBoundingClientRect();
      return clamp(((-r.top / Math.max(1, r.height - innerHeight)) - 0.04) / 0.8);
    };
    const frame = (now) => {
      const P = progress();
      ctx.clearRect(0, 0, w, h);
      const k = nodes.map((n) => { const l = clamp((P - n.d * 0.35) / 0.65); return 1 - Math.pow(1 - l, 3); });
      const pos = nodes.map((n, i) => {
        const dr = (1 - k[i]) * 16;
        return [mix(n.sx + Math.sin(now / 1100 + n.ph) * dr, n.tx, k[i]), mix(n.sy + Math.cos(now / 1300 + n.ph) * dr, n.ty, k[i])];
      });
      edges.forEach(([i, j, rnd]) => {
        const a = Math.pow(Math.min(k[i], k[j]), 2);
        if (a < 0.02) return;
        ctx.strokeStyle = `rgba(${GREEN},${(a * 0.5).toFixed(3)})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(...pos[i]); ctx.lineTo(...pos[j]); ctx.stroke();
        if (a > 0.9 && rnd < 0.3) {
          const t = ((now / 2000) + rnd * 3) % 1, x = mix(pos[i][0], pos[j][0], t), y = mix(pos[i][1], pos[j][1], t);
          ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(x, y, 1.8, 0, 6.283); ctx.fill(); ctx.globalAlpha = 1;
        }
      });
      nodes.forEach((n, i) => {
        const col = GREY.map((g, m) => Math.round(mix(g, GREEN[m], k[i])));
        ctx.fillStyle = `rgb(${col})`;
        ctx.beginPath(); ctx.arc(pos[i][0], pos[i][1], mix(2.4, 4, k[i]), 0, 6.283); ctx.fill();
      });
      if (P > 0.9) {
        const pulse = (now / 1600) % 1;
        ctx.strokeStyle = `rgba(${GREEN},${1 - pulse})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(w / 2, h / 2, 8 + pulse * 40, 0, 6.283); ctx.stroke();
      }
      if (!RM && vis) raf = requestAnimationFrame(frame);
    };
    build(); frame(performance.now());
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; cancelAnimationFrame(raf); if (vis) raf = requestAnimationFrame(frame); });
    io.observe(c);
    const rs = () => { build(); if (RM) frame(performance.now()); };
    addEventListener('resize', rs);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', rs); };
  }, [secRef]);
  return <canvas ref={ref} className="conv" role="img" aria-label="Scattered points gradually link into one connected network" />;
}

const WIP = [['Core healthcare platform', 'Building'], ['Patient app and clinic, hospital, lab & pharmacy portals', 'Building'], ['Intelligence and resource monitoring', 'Building'], ['Field rollout and partnerships', 'Planning']];

export default function Vision() {
  const [done, setDone] = useState(reduced());
  const ref = useScrollVars((p) => { if (!reduced()) setDone((d) => { const n = p > 0.72; return n === d ? d : n; }); });
  return (
    <>
      <section className="dark vtall" id="vision" ref={ref} aria-labelledby="vis-h">
        <div className="vstick">
          <div className="wrap v-grid">
            <div className="conv-wrap">
              <Converge secRef={ref} />
              <div className="state-line"><span className={!done ? 'on' : ''}>Fragmented healthcare</span><span className={done ? 'on' : ''}>Connected healthcare</span></div>
              <div className="meter" aria-hidden="true"><i /></div>
            </div>
            <div>
              <Eyebrow>Our vision</Eyebrow>
              <h2 id="vis-h" className="sr">Our vision</h2>
              <p className="vq">To build the digital backbone for accessible, connected and resilient primary healthcare.</p>
              <Reveal as="p" className="lead" delay={150}>From fragmented healthcare to connected healthcare — one facility, one district, one state at a time, starting where the need is greatest.</Reveal>
              <Reveal className="wip" delay={250}>
                <p className="wip-h"><span className="pdot" />Work in progress</p>
                <ul>{WIP.map(([t, s]) => <li key={t}><span>{t}</span><b className={s === 'Building' ? 'b' : ''}>{s}</b></li>)}</ul>
                <small>MAADH is in active development. Features and timelines will change as we learn from the field.</small>
              </Reveal>
              <p className="where"><span>Based in</span> {ADDRESS}</p>
            </div>
          </div>
        </div>
      </section>
      <Roadmap />
    </>
  );
}

const PH = [['Phase 1', 'Build', 'Core healthcare infrastructure', 'In progress'], ['Phase 2', 'Connect', 'Clinics, hospitals, labs and pharmacies', 'Next'], ['Phase 3', 'Scale', 'District and state-level healthcare networks', 'Planned'], ['Phase 4', 'Intelligence', 'AI-powered healthcare infrastructure and resource intelligence', 'Planned'], ['Phase 5', 'Expand', 'A scalable healthcare infrastructure for underserved communities across India', 'Planned']];

function Roadmap() {
  const [ref, on] = useInView({ threshold: 0.3 });
  return (
    <section id="roadmap" aria-labelledby="rm-h">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow>Roadmap</Eyebrow>
          <h2 id="rm-h">From building to <span className="mark">belonging everywhere.</span></h2>
          <p className="note">Work in progress — phases show direction, not delivery dates.</p>
        </div>
        <ol className={`road ${on ? 'in' : ''}`} ref={ref}>
          {PH.map(([n, t, d, s], i) => <li className="phase" key={t} style={{ '--d': `${i * 280}ms` }}><span className="no">{n}</span><h3>{t}</h3><span className={`st ${s === 'In progress' ? 'live' : ''}`}>{s}</span><p>{d}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
