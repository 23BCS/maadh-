import { Eyebrow, Reveal, Split } from '../ui.jsx';
import { useInView } from '../hooks';
import { FOUNDER_PHOTO } from '../config';

export default function Founder() {
  const [ref, on] = useInView({ threshold: 0.3 });
  return (
    <section id="founder" aria-labelledby="fo-h">
      <div className="wrap f-grid">
        <div ref={ref} className={`portrait ${on ? 'in' : ''}`} role="img" aria-label="Anand Ranjan">
          {FOUNDER_PHOTO ? <img src={FOUNDER_PHOTO} alt="" loading="lazy" decoding="async" /> : <span aria-hidden="true">AR</span>}
          <small>Founder &amp; CEO</small>
        </div>
        <div>
          <Eyebrow>Founder</Eyebrow>
          <Split text="Anand Ranjan" as="h2" className="f-name" />
          <p className="f-role">Founder &amp; CEO — MAADH</p>
          <Reveal as="p" className="lead" style={{ marginTop: 0 }} delay={120}>Anand Ranjan is the founder of MAADH, focused on building technology that makes healthcare more connected, accessible and resilient for underserved communities.</Reveal>
          <Reveal as="blockquote" className="fq" delay={220} style={{ margin: '34px 0 0' }}>
            “Healthcare should not depend on where a patient lives, whether the internet works, or whether their previous medical history is available on paper.”
          </Reveal>
        </div>
      </div>
    </section>
  );
}
