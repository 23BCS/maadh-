import { useState } from 'react';
import { Eyebrow, Reveal, Split } from '../ui.jsx';
import { ICONS } from '../icons.jsx';

const NODES = [
  ['patient', 'Patients', 'Own their record and carry it from clinic to hospital.'],
  ['doctor', 'Doctors', 'Work with full context, online or offline.'],
  ['hospital', 'Hospitals', 'Run operations, beds, referrals and staff in one place.'],
  ['lab', 'Laboratories', 'Receive orders and return digital reports.'],
  ['pharmacy', 'Pharmacies', 'Verify and dispense digital prescriptions.'],
  ['emergency', 'Emergency Services', 'Ambulance availability and readiness, visible when it matters.'],
  ['admin', 'Government / Administration', 'District, state and national visibility into capacity and trends.'],
  ['family', 'Families', 'Family profiles let one person help care for another.'],
];
const CX = 380, CY = 280, RX = 280, RY = 205;
const pts = NODES.map((_, i) => { const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2; return [CX + RX * Math.cos(a), CY + RY * Math.sin(a)]; });

export default function Ecosystem() {
  const [a, setA] = useState(null);
  const n = a === null ? null : NODES[a];
  return (
    <section className="portal alt" id="ecosystem" aria-labelledby="eco-h">
      <div className="wrap">
        <div className="sec-head center">
          <Eyebrow>The MAADH ecosystem</Eyebrow>
          <Split text="Everyone in care, *one connected* system." as="h2" className="wide" />
        </div>
        <div className="eco">
          <Reveal>
            <svg className="eco-svg" viewBox="0 0 760 560" role="group" aria-label="MAADH ecosystem map">
              {[0, 1.2, 2.4].map((d) => <circle key={d} className="halo" cx={CX} cy={CY} r="56" style={{ animationDelay: `${d}s` }} />)}
              {pts.map(([x, y], i) => (
                <g key={i}>
                  <line className="ln" x1={CX} y1={CY} x2={x} y2={y} />
                  <line className="fl" x1={CX} y1={CY} x2={x} y2={y} style={{ animationDelay: `${i * 0.2}s`, opacity: a === i ? 1 : undefined, strokeWidth: a === i ? 3 : undefined }} />
                </g>
              ))}
              <g className="core"><circle cx={CX} cy={CY} r="52" /><text x={CX} y={CY + 7}>MAADH</text></g>
              {pts.map(([x, y], i) => (
                <g key={i} className={`nd ${a === i ? 'act' : ''}`} transform={`translate(${x} ${y})`} tabIndex={0} role="button" aria-label={NODES[i][1]}
                  onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onMouseLeave={() => setA(null)} onBlur={() => setA(null)} onClick={() => setA(i)}>
                  <circle r="32" />
                  <g className="ico" transform="translate(-14 -14) scale(1.17)"><path d={ICONS[NODES[i][0]]} /></g>
                  <text className="lb" y="54">{NODES[i][1]}</text>
                </g>
              ))}
            </svg>
          </Reveal>
          <div className="eco-card" aria-live="polite">
            {n ? <><h3>{n[1]}</h3><p>{n[2]}</p></> : <p style={{ color: 'var(--ink3)' }}>Hover or tap a participant to see how MAADH connects them.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
