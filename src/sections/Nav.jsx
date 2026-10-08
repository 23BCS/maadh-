import { useEffect, useState } from 'react';
import { Logo, Magnetic, mailto } from '../ui.jsx';

export const LINKS = [
  ['About', '#story'],
  ['Technology', '#technology'],
  ['Features', '#features'],
  ['Healthcare Ecosystem', '#ecosystem'],
  ['Security', '#security'],
  ['Vision', '#vision'],
  ['Founder', '#founder'],
  ['Contact', '#contact'],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(scrollY > 24);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <header className={`nav ${solid || open ? 'solid' : ''}`}>
      <div className="wrap nav-in">
        <a className="brand" href="#top" aria-label="MAADH home" onClick={() => setOpen(false)}>
          <Logo size={44} />
          <b>Mission for Accessible &amp; Digital Health</b>
        </a>
        <nav aria-label="Primary">
          <ul>{LINKS.slice(0, 7).map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}</ul>
        </nav>
        <Magnetic href={mailto('Talk to the MAADH team')} className="primary">Talk to us</Magnetic>
        <button className="burger" aria-expanded={open} aria-controls="drawer" aria-label="Menu" onClick={() => setOpen(!open)}><i /></button>
      </div>
      <nav id="drawer" className={`drawer ${open ? 'open' : ''}`} aria-label="Mobile" aria-hidden={!open}>
        {LINKS.map(([t, h]) => <a key={h} href={h} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{t}</a>)}
      </nav>
    </header>
  );
}
