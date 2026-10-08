import { Eyebrow, Reveal, Split } from '../ui.jsx';

const SEC = [
  ['Authentication', 'Token-based sign-in with strong password hashing, OTP options and device trust.'],
  ['Role-based access', 'Each role sees only its own scope — patient, doctor, facility, district, state or national.'],
  ['Encryption', 'Sensitive fields encrypted at rest; transport secured end to end.'],
  ['Secure APIs', 'Hardened headers, input sanitization, rate limiting and abuse protection.'],
  ['Auditability', 'Meaningful actions are written to an audit trail for accountability.'],
  ['Access controls', 'Scope checks enforced server-side on every request, not just in the interface.'],
  ['Data minimization', 'Identifiers such as Aadhaar are stored as keyed hashes rather than in plain form.'],
  ['Secure synchronization', 'Offline changes are validated and de-duplicated when they reach the server.'],
  ['Infrastructure monitoring', 'Continuous health, performance and security-signal monitoring of the platform.'],
  ['Backup & recovery', 'Backups and recovery procedures are part of the platform, not an afterthought.'],
  ['Privacy-focused architecture', 'No advertising or third-party tracking; data is used to deliver care.'],
];

const cells = Array.from({ length: 24 }, (_, k) => k);

export default function Security() {
  return (
    <>
      <section className="dark" id="security" aria-labelledby="sec-h">
        <div className="wrap">
          <div className="sec-grid">
            <div>
              <Eyebrow>Security &amp; privacy</Eyebrow>
              <Split text="Healthcare data deserves *protection.*" as="h2" />
              <Reveal as="p" className="lead" delay={150}>Health information is among the most personal data there is. MAADH treats protection as part of the foundation — the protective half of the name — and designs every layer around it.</Reveal>
            </div>
            <Reveal className="lockviz" delay={100}>
              <svg viewBox="0 0 480 432" role="img" aria-label="A padlock protects data; encrypted data reaches an authorized user">
                <g transform="translate(70 150)">
                  <rect className="lv-lock-body" x="0" y="26" width="64" height="52" rx="4" />
                  <path className="lv-shackle" d="M12 26v-10a20 20 0 0 1 40 0v10" />
                  <circle cx="32" cy="52" r="5" fill="#7fe0a2" />
                </g>
                <g transform="translate(160 138)">
                  {cells.map((k) => <rect key={k} className="lv-cell" style={{ '--k': k }} x={(k % 6) * 22} y={Math.floor(k / 6) * 22} width="16" height="16" rx="2" />)}
                </g>
                <circle className="lv-pkt" cx="150" cy="185" r="4" />
                <g className="lv-user" transform="translate(340 150)">
                  <circle cx="32" cy="22" r="14" fill="none" stroke="#fff" strokeWidth="2" />
                  <path d="M6 76a26 26 0 0 1 52 0" fill="none" stroke="#fff" strokeWidth="2" />
                  <path d="m22 22 7 7 13-14" fill="none" stroke="#7fe0a2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
              <div className="lv-cap"><span>Protected</span><span>Encrypted</span><span>Authorized</span></div>
            </Reveal>
          </div>
          <div className="sgrid">
            {SEC.map(([t, d], i) => <Reveal key={t} className="scell" delay={(i % 3) * 80}><h3><span>{String(i + 1).padStart(2, '0')}</span>{t}</h3><p>{d}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section id="identity" aria-labelledby="id-h">
        <div className="wrap fp-grid">
          <Reveal>
            <div className="fp" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M32 8c-11 0-19 8-19 19v6M32 8c11 0 19 8 19 19v4M20 54c2-5 3-9 3-15v-9a9 9 0 0 1 18 0v8c0 7 2 12 5 17M32 30v10c0 6-1 11-3 16M26 58c2-4 3-8 3-12M38 50c0 3 1 6 2 9M13 40c0 5-1 9-3 13M51 36c0 6 1 12 3 17" />
              </svg>
              <div className="scan" /><div className="ok">✓ MATCH · AUTHORIZED</div>
            </div>
          </Reveal>
          <div>
            <Eyebrow>Patient identification</Eyebrow>
            <Split text="Identity that connects the right patient to the *right record.*" as="h2" className="wide" />
            <Reveal as="p" className="lead" delay={150}>Where a compatible fingerprint scanner is available, MAADH can identify a patient from their fingerprint and open the right record — for authorized healthcare professionals only. It complements, never replaces, other ways to find a patient.</Reveal>
            <ol className="idchain">
              {[['Fingerprint', 'Captured on a compatible scanner'], ['Secure identification', 'Matched by a local service on the same machine'], ['Patient record', 'The correct record is opened'], ['Authorized professional', 'Only a permitted role, within scope, can see it']].map(([a, b], i) => (
                <Reveal as="li" key={a} delay={i * 120}><i>{i + 1}</i><div><b>{a}</b><span>{b}</span></div></Reveal>
              ))}
            </ol>
            <p className="note">Fingerprint identification is available where supported hardware is present. It is not universally available and is not claimed to be government-certified.</p>
          </div>
        </div>
      </section>
    </>
  );
}
