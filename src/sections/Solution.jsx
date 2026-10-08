import { useEffect, useState } from 'react';
import { Eyebrow, Reveal, Split } from '../ui.jsx';
import { useInView, reduced } from '../hooks';
import { Icon } from '../icons.jsx';

const CHAIN = [
  ['patient', 'Patient', 'One identity and one longitudinal record, in their hand through the Flutter app.'],
  ['doctor', 'Doctor', 'Full history in context before the consultation starts.'],
  ['hospital', 'Clinic / Hospital', 'Registration, referrals, beds, schedules and departments in one place.'],
  ['lab', 'Laboratory', 'Orders arrive digitally; results return to doctor and patient.'],
  ['pharmacy', 'Pharmacy', 'Digital prescriptions verified and dispensed against the record.'],
  ['admin', 'Healthcare Administration', 'District, state and national visibility into capacity and trends.'],
];

// Verified from the codebase: 10 web portals (doctor, hospital, lab, pharmacy, billing, nurse,
// reception, district, state, super) / 1 Flutter patient app / 17 AI services (ports 6001–6017).
const STATS = [[10, 'role-based web portals'], [1, 'offline-first patient mobile app'], [17, 'independent intelligence services'], [4, 'administrative tiers: hospital, district, state, national']];

function Count({ to }) {
  const [ref, on] = useInView({ threshold: 0.6 });
  const [v, setV] = useState(reduced() ? to : 0);
  useEffect(() => {
    if (!on || reduced()) { if (on) setV(to); return; }
    let raf, t0;
    const step = (t) => { t0 ??= t; const k = Math.min(1, (t - t0) / 1400); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [on, to]);
  return <b ref={ref}>{v}</b>;
}

export default function Solution() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section id="solution" className="portal" aria-labelledby="sol-h">
      <div className="wrap sol">
        <div>
          <div className="sec-head" style={{ marginBottom: 40 }}>
            <Eyebrow>Our solution</Eyebrow>
            <Split text="One healthcare ecosystem. *Connected care.*" as="h2" />
            <Reveal as="p" className="lead" delay={150}>MAADH is an offline-first digital healthcare platform. Every participant in the care journey works from the same connected record — and keeps working when the network does not.</Reveal>
          </div>
          <div className="glance">
            {STATS.map(([n, l], i) => <Reveal key={l} delay={i * 90}><Count to={n} /><span>{l}</span></Reveal>)}
          </div>
          <p className="note">Counts describe what is built in the MAADH platform today.</p>
        </div>
        <ol className={`chain ${on ? 'in' : ''}`} ref={ref} aria-label="Care ecosystem">
          <li className="fill" aria-hidden="true" />
          {CHAIN.map(([e, t, d], i) => (
            <li className="link" key={t} style={{ '--d': `${i * 260}ms` }}>
              <span className="node" aria-hidden="true"><Icon n={e} size={22} /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
