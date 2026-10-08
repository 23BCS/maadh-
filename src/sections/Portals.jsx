import { Eyebrow, Reveal, Split, Flow, Illustrative } from '../ui.jsx';
import { useInView } from '../hooks';

function InView({ children, className = '' }) {
  const [ref, on] = useInView({ threshold: 0.3 });
  return <div ref={ref} className={`${className} ${on ? 'in' : ''}`}>{children}</div>;
}

function Doctor() {
  const f = ['Patient search', 'Patient registration', 'Patient timeline', 'Medical history', 'Digital prescription', 'Prescription templates', 'Lab test recommendations', 'Follow-up information', 'Doctor schedule', 'Clinical documentation', 'Patient identification', 'Fingerprint identification (where supported)', 'Offline workflows'];
  return (
    <section className="portal" id="features" aria-labelledby="doc-h">
      <div className="wrap p-grid">
        <div>
          <Eyebrow>Doctor portal</Eyebrow>
          <Split text="Give doctors more *context.* Less paperwork." as="h2" />
          <Reveal as="p" className="lead" delay={150}>The doctor portal opens the patient’s whole story before the first question — and keeps working in a clinic with no signal. Doctors in a private clinic, an organisation or an unaffiliated practice each get an experience scoped to how they work.</Reveal>
          <ul className="fchips">{f.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <InView>
          <div className="pane">
            <div className="pane-h"><i /><i /><i /><span>Doctor portal</span></div>
            <div className="dash">
              <aside aria-hidden="true"><i /><i /><i /><i /><i /></aside>
              <main>
                <div className="srch">Search patient by name, mobile or code</div>
                <div className="mini-tl">
                  {[['Follow-up consultation', 'Today'], ['Lab result received', 'Recent'], ['Prescription issued', 'Earlier'], ['First visit', 'Earlier']].map(([a, b], i) => <div key={a} style={{ '--d': `${i * 220}ms` }}><span>{a}</span><small>{b}</small></div>)}
                </div>
                <div className="rx"><b>Prescription</b>
                  <span className="write" style={{ '--w': 0.75 }} /><span className="write" style={{ '--w': 0.55, '--d': '0.9s' }} /><span className="write" style={{ '--w': 0.65, '--d': '1.4s' }} />
                </div>
                <div className="two"><span className="chip g">Offline-ready</span><span className="chip">Template applied</span></div>
              </main>
            </div>
          </div>
          <div style={{ marginTop: 12 }}><Illustrative /></div>
        </InView>
      </div>
    </section>
  );
}

function Hospital() {
  const f = ['Hospital profile', 'Bed availability', 'Doctor schedules', 'Departments', 'Ambulance information', 'Patient management', 'Referral workflows', 'Resource visibility', 'Hospital analytics', 'Administrative notifications'];
  return (
    <section className="portal alt" id="hospital" aria-labelledby="hos-h">
      <div className="wrap p-grid rev">
        <InView>
          <div className="pane">
            <div className="pane-h"><i /><i /><i /><span>Hospital dashboard</span></div>
            <div className="pane-b">
              <div className="kpis"><div><b>Beds</b><small>LIVE AVAILABILITY</small></div><div><b>OPD</b><small>TODAY’S FLOW</small></div><div><b>Referrals</b><small>IN / OUT</small></div></div>
              <div className="bars">
                {[['General ward', '62%', ''], ['ICU', '84%', 'warn'], ['Maternity', '47%', ''], ['Emergency', '91%', 'bad']].map(([n, v, c], i) => (
                  <div className="bar-row" key={n}><span>{n}</span><div className="tr"><i className={c} style={{ '--v': v, '--d': `${0.2 + i * 0.2}s` }} /></div><b>{v}</b></div>
                ))}
              </div>
              <svg className="spark" viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 L30 44 L60 48 L90 30 L120 36 L150 20 L180 28 L210 12 L240 22 L270 8 L300 16" /></svg>
              <div className="two"><span className="chip">Ambulance · available</span><span className="chip g">Doctors on duty</span></div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}><Illustrative /> <span className="note" style={{ display: 'inline' }}>Figures are sample visuals.</span></div>
        </InView>
        <div>
          <Eyebrow>Hospital management</Eyebrow>
          <Split text="Hospital operations, *connected.*" as="h2" />
          <Reveal as="p" className="lead" delay={150}>MAADH ties the clinical and operational sides of a hospital into one view — from the front desk and wards to billing, nursing and radiology — so teams share the same facts.</Reveal>
          <ul className="fchips">{f.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Lab() {
  const f = ['Test orders', 'Patient identification', 'Sample workflow', 'Report management', 'Digital reports', 'Doctor access', 'Patient access', 'Result notifications'];
  return (
    <section className="portal" id="lab" aria-labelledby="lab-h">
      <div className="wrap">
        <div className="two" style={{ gap: 'clamp(30px,5vw,80px)', alignItems: 'start' }}>
          <div>
            <Eyebrow>Laboratory portal</Eyebrow>
            <Split text="From order to result, *without paper.*" as="h2" />
          </div>
          <div>
            <Reveal as="p" className="lead" delay={100} style={{ marginTop: 0 }}>Laboratories — from standalone diagnostic centres to hospital labs — receive digital test orders, manage samples and issue reports that reach the doctor and the patient automatically.</Reveal>
          </div>
        </div>
        <Flow steps={['Doctor orders test', 'Lab receives order', 'Test processed', 'Result generated', 'Doctor & patient receive result']} label="Laboratory workflow" />
        <ul className="fchips">{f.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
    </section>
  );
}

function Pharmacy() {
  const f = ['Digital prescription reception', 'Prescription verification', 'Medicine dispensing workflow', 'Patient information', 'Prescription history', 'Pharmacy notifications'];
  return (
    <section className="portal alt" id="pharmacy" aria-labelledby="ph-h">
      <div className="wrap">
        <div className="two" style={{ gap: 'clamp(30px,5vw,80px)', alignItems: 'start' }}>
          <div>
            <Eyebrow>Pharmacy portal</Eyebrow>
            <Split text="The prescription arrives *before the patient does.*" as="h2" />
          </div>
          <div>
            <Reveal as="p" className="lead" delay={100} style={{ marginTop: 0 }}>Pharmacies receive verified digital prescriptions, dispense against them and keep a clear history — fewer illegible slips, fewer errors, fewer repeat trips.</Reveal>
          </div>
        </div>
        <Flow steps={['Doctor', 'Digital prescription', 'Pharmacy', 'Medicine', 'Patient']} label="Pharmacy workflow" ms={1400} />
        <ul className="fchips">{f.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
    </section>
  );
}

export default function Portals() { return <><Doctor /><Hospital /><Lab /><Pharmacy /></>; }
