import { useScrollVars } from '../hooks';
import { Eyebrow } from '../ui.jsx';

const clamp = (v) => Math.min(1, Math.max(0, v));

export default function Story() {
  const ref = useScrollVars((p, el) => {
    el.style.setProperty('--m', clamp((p - 0.14) / 0.4).toFixed(3));
    el.style.setProperty('--r', clamp((p - 0.66) / 0.22).toFixed(3));
  });
  return (
    <section className="story dark" id="story" ref={ref} aria-labelledby="story-h">
      <div className="story-stick">
        <div className="story-intro">
          <Eyebrow>The MAADH story</Eyebrow>
          <h2 id="story-h" className="sr">MAA plus DH equals MAADH</h2>
        </div>
        <div className="story-grid">
          <div className="merge" aria-hidden="true">
            <span className="maa">MAA</span><span className="plus">+</span><span className="dh">DH</span>
          </div>
          <div className="story-cards">
            <article className="scard m">
              <p className="kw">MAA · Mother</p>
              <h3>Care. Compassion. Accessibility.</h3>
              <p>The emotional foundation of healthcare — the idea that care should reach everyone, regardless of location, income or connectivity.</p>
            </article>
            <article className="scard d">
              <p className="kw">DH · Digital Health &amp; Protection</p>
              <h3>Digital Health. Protection. Responsibility.</h3>
              <p>The protective responsibility behind the platform — a technology layer that helps protect patients, healthcare professionals and healthcare information.</p>
            </article>
          </div>
        </div>
        <div className="story-final">
          <p className="q">A healthcare ecosystem built with the care of a mother and the protection of a father.</p>
          <small>Healthcare that cares like a mother and protects like a father — powered by technology.</small>
        </div>
      </div>
    </section>
  );
}
