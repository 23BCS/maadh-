import { Eyebrow, Reveal, Split } from '../ui.jsx';

const I = (d) => <svg className="ic" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;

const CARDS = [
  ['Fragmented healthcare records', 'Across many underserved regions, a patient’s history is scattered across paper files, clinics and hospitals that never see each other.', I(<><rect x="4" y="5" width="10" height="13" rx="1" /><rect x="18" y="14" width="10" height="13" rx="1" /><path d="M14 11h4M18 20h-4" strokeDasharray="2 3" /></>)],
  ['Repeating the medical story', 'Patients are often asked to explain their history again — every visit, every doctor, every facility.', I(<><path d="M5 8h14a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-6l-5 4v-4H8a3 3 0 0 1-3-3z" /><path d="M24 12h1a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3v3l-3-3" /></>)],
  ['Limited digital infrastructure', 'Many primary-care clinics run without reliable systems, devices or trained digital workflows.', I(<><rect x="5" y="6" width="22" height="15" rx="1.5" /><path d="M11 26h10M16 21v5M9 11l3 3-3 3" /></>)],
  ['Unreliable connectivity', 'In rural regions the network drops often — software that needs a constant connection simply stops working.', I(<><path d="M4 12a17 17 0 0 1 24 0M8 17a11 11 0 0 1 16 0M12 22a5 5 0 0 1 8 0" /><path d="M5 5l22 22" /></>)],
  ['Disconnected clinics & hospitals', 'Facilities operate as islands. Referrals, results and follow-ups rely on the patient carrying paper.', I(<><circle cx="7" cy="9" r="3" /><circle cx="25" cy="9" r="3" /><circle cx="16" cy="25" r="3" /><path d="M10 9h12M8.5 12l6 10.5M23.5 12l-6 10.5" strokeDasharray="2 3" /></>)],
  ['Hard to reach past prescriptions', 'Previous prescriptions and reports are lost, faded or left at home when they are needed most.', I(<><path d="M8 4h11l6 6v18H8z" /><path d="M19 4v6h6M12 16h9M12 21h9" /></>)],
  ['Little visibility into resources', 'Beds, medicines, blood and ambulances are hard to see across a district — decisions get made blind.', I(<><circle cx="15" cy="15" r="8" /><path d="m21 21 7 7M12 15h6M15 12v6" /></>)],
  ['No continuity across facilities', 'When a patient moves between facilities, the thread of care breaks — and so does continuity of treatment.', I(<><path d="M4 16h8l3-8 4 16 3-8h6" /></>)],
];

export default function Problem() {
  return (
    <section id="problem" aria-labelledby="prob-h">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow>The problem</Eyebrow>
          <Split text="Care breaks where *connection* breaks." as="h2" />
          <Reveal as="p" className="lead" delay={150}>Healthcare in underserved and rural India does not fail for lack of caring people. It fails where records, systems and networks do not connect them.</Reveal>
        </div>
        <div className="pgrid">
          {CARDS.map(([t, d, ic], i) => (
            <Reveal key={t} className="pcard" delay={(i % 4) * 90}>
              <span className="n">0{i + 1}</span>
              {ic}
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
        <p className="note">These are qualitative patterns observed across underserved regions, not statistics. MAADH makes no numerical claims here without a verified source.</p>
      </div>
    </section>
  );
}
