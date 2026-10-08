import { Eyebrow, Reveal, Split } from '../ui.jsx';

const CAPS = ['Patient record summarization', 'Healthcare documentation', 'Administrative intelligence', 'Resource analysis', 'Trend identification', 'Early warning signals', 'Operational insights', 'Workflow automation'];
const N = [[60, 90, 'DATA'], [60, 170, 'RECORDS'], [60, 250, 'RESOURCES'], [190, 60], [190, 140], [190, 220], [190, 300], [320, 110], [320, 190], [320, 270], [440, 150, 'INSIGHT'], [440, 230, 'ALERTS']];
const E = [[0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [7, 10], [8, 10], [8, 11], [9, 11]];

export default function Intelligence() {
  return (
    <>
      <section id="ai" aria-labelledby="ai-h">
        <div className="wrap ai-grid">
          <div>
            <Eyebrow>AI-powered healthcare intelligence</Eyebrow>
            <Split text="Intelligence behind the *infrastructure.*" as="h2" />
            <Reveal as="p" className="lead" delay={150}>AI can assist authorized healthcare and administrative users — turning a flood of operational data into signals a person can review. Surveillance, forecasting, risk and resource analysis run as independent services, each with monitoring and validation of its own.</Reveal>
            <div className="cap">{CAPS.map((c) => <div key={c}>{c}</div>)}</div>
            <Reveal className="guard" delay={100}>AI assists healthcare professionals. It does not replace doctors or make autonomous medical decisions.
              <small>Operational remediation suggested by the platform’s monitoring never executes without explicit approval from an authorized administrator.</small>
            </Reveal>
          </div>
          <Reveal className="ai-viz" delay={100}>
            <svg viewBox="0 0 500 360" role="img" aria-label="Data flowing through a layered network into insights and alerts">
              {E.map(([a, b], i) => (<g key={i}><line className="e" x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} /><line className="pulse-e" style={{ '--dl': `${(i % 8) * 0.5}s` }} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} /></g>))}
              {N.map(([x, y, t], i) => (<g key={i}><circle className={`nd ${t === 'INSIGHT' || t === 'ALERTS' ? 'c' : ''}`} cx={x} cy={y} r="8" />{t && <text x={x} y={y + 24} textAnchor="middle">{t}</text>}</g>))}
            </svg>
          </Reveal>
        </div>
      </section>

      <section className="portal" id="interoperability" aria-labelledby="io-h">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>ABDM / digital health interoperability</Eyebrow>
            <Split text="Built to *connect* with India’s digital health ecosystem." as="h2" className="wide" />
            <Reveal as="p" className="lead" delay={150}>MAADH is designed with interoperability and India’s digital health ecosystem in mind, with the goal of supporting standards-based healthcare connectivity.</Reveal>
          </div>
          <div className="io">
            {[['ABHA', 'Aadhaar / ABHA-compatible identity workflows where applicable.'], ['ABDM', 'Designed with the Ayushman Bharat Digital Mission’s open, standards-led approach in mind.'], ['Digital Health Records', 'Structured records — history, prescriptions, reports — ready to be shared with consent.'], ['Interoperability', 'Clean APIs and clear data models so systems can exchange information safely.']].map(([t, d], i) => (
              <Reveal key={t} delay={i * 90}><b>{t}</b><p>{d}</p></Reveal>
            ))}
          </div>
          <Reveal className="bridge" delay={150}><span className="bx">MAADH</span><span className="wire" /><span className="bx">Digital health ecosystem</span></Reveal>
          <p className="note" style={{ textAlign: 'center', marginInline: 'auto' }}>This describes MAADH’s design goal. MAADH does not claim official ABDM certification or government integration unless and until it is separately verified and announced.</p>
        </div>
      </section>
    </>
  );
}
