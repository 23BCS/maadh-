import { useState } from 'react';
import { Eyebrow, Reveal, Split, Illustrative } from '../ui.jsx';
import { useInView } from '../hooks';

const TABS = {
  reg: {
    label: 'Patient registration',
    h: 'Start with the person, not the paperwork.',
    p: 'Registration is built for the front desk and for the patient’s own phone.',
    items: ['Mobile-based registration with OTP', 'Aadhaar / ABHA-compatible workflows where applicable', 'Patient identification at every visit', 'A digital profile that follows the patient across facilities'],
    mock: (
      <div className="pane"><div className="pane-h"><i /><i /><i /><span>New patient</span></div>
        <div className="pane-b">
          <div className="field"><small>Mobile</small><b>+91 ••••• ••210</b></div>
          <div className="field"><small>Identifier</small><b>12-character patient code</b></div>
          <div className="field"><small>ABHA-compatible</small><span className="chip g">Where applicable</span></div>
          <div className="field"><small>Profile</small><span className="chip">Created</span></div>
        </div></div>
    ),
  },
  rec: {
    label: 'Health record',
    h: 'One record. Every visit.',
    p: 'Doctors, labs and pharmacies work from the same longitudinal record — so the patient never starts from zero.',
    items: ['Medical history & diagnoses', 'Prescriptions', 'Laboratory reports', 'Previous visits', 'Allergies & vaccination history', 'Patient timeline'],
    mock: (
      <div className="pane"><div className="pane-h"><i /><i /><i /><span>Health record</span></div>
        <div className="pane-b">
          <div className="field"><small>Conditions</small><span><span className="chip">Recorded</span></span></div>
          <div className="field"><small>Allergies</small><span className="chip" style={{ background: '#fde7e4', color: '#b32b1d' }}>Flagged</span></div>
          <div className="field"><small>Visits</small><b>Across facilities</b></div>
          <div className="field"><small>Reports</small><b>Digital, attached</b></div>
        </div></div>
    ),
  },
  rx: {
    label: 'Digital prescription',
    h: 'Prescriptions that travel with the patient.',
    p: 'Doctors create digital prescriptions using structured workflows, templates and other supported input methods — including handwriting recognition on supported setups.',
    items: ['Structured medicine entry', 'Reusable prescription templates', 'Lab test recommendations', 'Instantly visible to the pharmacy'],
    mock: (
      <div className="pane"><div className="pane-h"><i /><i /><i /><span>Prescription</span></div>
        <div className="pane-b">
          <div className="rx"><b>Rx</b>
            {[['72%'], ['58%'], ['66%']].map(([w], k) => <span key={k} className="write in" style={{ '--w': parseFloat(w) / 100, '--d': `${0.3 + k * 0.5}s` }} />)}
          </div>
          <div className="field"><small>Template</small><span className="chip">Applied</span></div>
          <div className="field"><small>Send to</small><b>Pharmacy · Lab</b></div>
        </div></div>
    ),
  },
};

const TL = [['Visit', 'Patient is seen'], ['Diagnosis', 'Recorded by the doctor'], ['Prescription', 'Issued digitally'], ['Lab test', 'Ordered & sampled'], ['Result', 'Delivered to record'], ['Follow-up', 'Scheduled & tracked']];

export default function Patient() {
  const [k, setK] = useState('reg');
  const [ref, on] = useInView({ threshold: 0.3 });
  const t = TABS[k];
  return (
    <section id="patient" aria-labelledby="pat-h">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow>Patient experience</Eyebrow>
          <Split text="A journey that remembers *you.*" as="h2" />
          <Reveal as="p" className="lead" delay={150}>From first registration to follow-up, every step is captured once and available wherever care continues.</Reveal>
        </div>
        <div className="tabs" role="tablist" aria-label="Patient journey">
          {Object.entries(TABS).map(([id, v]) => (
            <button key={id} role="tab" id={`t-${id}`} aria-selected={k === id} aria-controls="tp" onClick={() => setK(id)}>{v.label}</button>
          ))}
        </div>
        <div className="tabpanel" role="tabpanel" id="tp" aria-labelledby={`t-${k}`} key={k}>
          <div>
            <h3>{t.h}</h3><p>{t.p}</p>
            <ul className="checks">{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>{t.mock}<div style={{ marginTop: 12 }}><Illustrative /></div></div>
        </div>
        <div className="tl" ref={ref}>
          <h3>The patient timeline</h3>
          <ol className={`tl-row ${on ? 'in' : ''}`}>
            {TL.map(([a, b], i) => (
              <li className="tl-item" key={a} style={{ '--d': `${i * 260}ms` }}><span className="pt" /><div><b>{a}</b><span>{b}</span></div></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
