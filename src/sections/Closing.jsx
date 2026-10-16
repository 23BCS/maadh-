ĺimport { Eyebrow, Reveal, Split, Magnetic, Logo, mailto } from '../ui.jsx';
import { useInView } from '../hooks';
import { CONTACT_EMAIL, SOCIALS, ADDRESS } from '../config';
import { LINKS } from './Nav.jsx';
import { Arrow } from './Hero.jsx';

const LAYERS = [
  ['Flutter', 'Patient / Mobile applications', 'Offline-first patient app with local storage and background sync.'],
  ['React', 'Web portals', 'Role-specific portals for doctors, hospitals, labs, pharmacies and administrators.'],
  ['Node.js + Express', 'Backend services', 'Scoped, rate-limited APIs with role-based access and audit logging.'],
  ['MongoDB', 'Data layer', 'Document store for records, with offline-sync checkpoints and de-duplication.'],
  ['WebSockets / Socket.IO', 'Real-time communication', 'Live notifications and updates across portals and the patient app.'],
  ['Cloud infrastructure', 'Scalable deployment', 'Containerized services, Redis caching and managed document storage.'],
  ['AI layer', 'Intelligence & automation', 'Independent forecasting, risk, surveillance and resource-intelligence services.'],
];

function Tech() {
  const [ref, on] = useInView({ threshold: 0.15 });
  return (
    <section id="technology" aria-labelledby="tech-h">
      <div className="wrap">
        <div className="sec-head center">
          <Eyebrow>Technology</Eyebrow>
          <Split text="Architecture built to *scale and survive.*" as="h2" className="wide" />
          <Reveal as="p" className="lead" delay={150}>A modern, modular stack — each layer independently deployable, and each designed to keep working when the layer next to it cannot.</Reveal>
        </div>
        <div className={`arch ${on ? 'in' : ''}`} ref={ref}>
          {LAYERS.map(([n, r, d], i) => (
            <div className="layer" key={n} style={{ '--d': `${i * 130}ms` }}>
              <span className="tn">{n}</span><span className="role">{r}</span><span className="what">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  const href = (s) => mailto(s);
  return (
    <section className="cta dark" id="contact" aria-labelledby="cta-h">
      <div className="wrap">
        <Eyebrow>Join the mission</Eyebrow>
        <Split text="The future of healthcare should be *connected.*" as="h2" />
        <Reveal as="p" className="lead" delay={150}>We are building MAADH to make healthcare more accessible, connected and resilient — starting where the need is greatest.</Reveal>
        <Reveal className="ctas" delay={250}>
          <Magnetic href={href('Partner with MAADH')} className="primary">Partner With MAADH <Arrow /></Magnetic>
          <Magnetic href={href('Talk to the MAADH team')} className="ghost">Talk to Our Team</Magnetic>
          <Magnetic href="#features" className="ghost">Explore the Platform</Magnetic>
        </Reveal>
        {CONTACT_EMAIL
          ? <p className="contact-note">Write to us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          : <p className="contact-note">Contact details will be published here soon.</p>}
        <p className="contact-note">Based in {ADDRESS} · Work in progress</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div className="f-brand">
            <span className="logo-chip"><Logo size={64} /></span>
            <div>
              <h4>Mission for Accessible &amp; Digital Health</h4>
              <p>Founder &amp; CEO: <b>Anand Ranjan</b></p>
              <p>{ADDRESS}</p>
            </div>
          </div>
          <nav aria-label="Footer"><ul>{LINKS.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}</ul></nav>
        </div>
        <div className="f-bot">
          <span>© 2026 MAADH. All rights reserved.</span>
          {SOCIALS.length > 0 && <span>{SOCIALS.map((s) => <a key={s.href} href={s.href} rel="noopener noreferrer" target="_blank" style={{ marginLeft: 16 }}>{s.label}</a>)}</span>}
        </div>
      </div>
    </footer>
  );
}

export default function Closing() { return <><Tech /><Cta /><Footer /></>; }
