import { Eyebrow, Reveal, Split, Illustrative } from '../ui.jsx';
import { useInView } from '../hooks';

const LEVELS = [['NAT', 'National', 'Whole-system oversight'], ['ST', 'State', 'State-wide capacity & trends'], ['DT', 'District', 'District-level resource view'], ['HOS', 'Hospital', 'Facility operations'], ['FAC', 'Healthcare facility', 'Clinics, labs, pharmacies']];
const FEATURES = ['Healthcare facility visibility', 'Bed availability', 'Resource monitoring', 'Doctor availability', 'Blood bank information', 'Ambulance availability', 'Medicine inventory', 'Laboratory capacity', 'Healthcare analytics', 'Alerts & notifications', 'Resource intelligence'];

export default function Command() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section className="dark" id="command" aria-labelledby="cc-h">
      <div className="wrap">
        <div className="cc-grid">
          <div>
            <Eyebrow>Admin &amp; government intelligence</Eyebrow>
            <Split text="Visibility from the *facility* to the nation." as="h2" />
            <Reveal as="p" className="lead" delay={150}>A hierarchical command view gives each administrative tier exactly the scope it needs — and nothing more. Access is enforced by role at the data layer, not just hidden in the interface.</Reveal>
            <ol className="hier" style={{ marginTop: 40 }}>
              {LEVELS.map(([a, t, d], i) => <li key={t} className="pulse" style={{ '--i': i }}><b>{a}</b><div><span>{t}</span><small>{d}</small></div></li>)}
            </ol>
          </div>
          <div ref={ref} className={on ? 'in' : ''}>
            <div className="cc">
              <div className="pane-h"><i /><i /><i /><span>Command center</span></div>
              <div className="cc-b">
                <div className="tiles">
                  <div className="tile"><small>Facilities</small><b>Visible</b><em>● live</em></div>
                  <div className="tile"><small>Blood bank</small><b>Tracked</b><em>● live</em></div>
                  <div className="tile"><small>Ambulances</small><b>Mapped</b><em>● live</em></div>
                  <div className="tile"><small>Medicine stock</small><b>Monitored</b><em>● live</em></div>
                </div>
                <div className="bars">
                  {[['Bed occupancy', '68%'], ['Lab capacity', '54%'], ['Doctor cover', '77%'], ['Medicine stock', '81%']].map(([n, v], i) => (
                    <div className="bar-row" key={n}><span>{n}</span><div className="tr"><i style={{ '--v': v, '--d': `${0.2 + i * 0.18}s` }} /></div><b>{v}</b></div>
                  ))}
                </div>
                <div className="alert"><i />Early-warning signal raised for review by an authorized administrator</div>
                <Illustrative />
              </div>
            </div>
          </div>
        </div>
        <div className="fgrid">{FEATURES.map((f, i) => <Reveal key={f} delay={(i % 4) * 60}>{f}</Reveal>)}</div>
        <p className="note">MAADH is an independent platform. It is not claimed to be officially integrated with any government system.</p>
      </div>
    </section>
  );
}
