import { Eyebrow, Reveal, Split } from '../ui.jsx';
import { useCycle, useInView } from '../hooks';

const STEPS = ['Online', 'Sync', 'Offline', 'Local data', 'Connection restored', 'Secure synchronization'];

export default function Offline() {
  const [ref, on] = useInView({ threshold: 0.3, once: false });
  const i = useCycle(STEPS.length, 2300, on);
  const net = i === 2 || i === 3 ? 'off' : i === 1 || i === 5 ? 'sync' : 'on';
  const label = net === 'off' ? 'OFFLINE' : net === 'sync' ? 'SYNCING' : 'ONLINE';
  const pending = i >= 3 && i < 5;
  const syncedNew = i >= 5;
  return (
    <section className="dark" id="offline" aria-labelledby="off-h">
      <div className="wrap off-grid" ref={ref}>
        <div>
          <Eyebrow>Offline-first technology</Eyebrow>
          <Split text="Healthcare doesn’t stop when the *internet does.*" as="h2" className="wide" />
          <Reveal as="p" className="lead" delay={150}>MAADH is designed with an offline-first architecture so healthcare workflows continue even when connectivity is unreliable. Work is saved on the device, queued, and securely reconciled with the server when the network returns.</Reveal>
          <ol className="steps" style={{ marginTop: 36 }} aria-label="Offline synchronization lifecycle">
            {STEPS.map((s, k) => (
              <li key={s} className={`step ${k === i ? 'on' : ''}`}><i>0{k + 1}</i><b>{s}</b></li>
            ))}
          </ol>
          <div className="badge-real"><span aria-hidden="true">🌐</span><p><b>Built for real-world healthcare environments.</b> Sync is idempotent — a record created offline is de-duplicated by the server, so a flaky reconnect never creates double entries.</p></div>
        </div>
        <div className="device-wrap" aria-hidden="true">
          <div className="device">
            <div className="screen">
              <div className="sbar"><span>9:41</span><span className={`net ${net}`}><span className="pulse" />{label}</span></div>
              <h4>Consultations</h4>
              <div className="recs">
                <div className="rec"><span>Visit · Follow-up<small>Saved &amp; synced</small></span><span className="tagx ok">SYNCED</span></div>
                <div className="rec"><span>Prescription issued<small>Saved &amp; synced</small></span><span className="tagx ok">SYNCED</span></div>
                {i >= 3 && <div key={`a${syncedNew}`} className="rec"><span>New consultation<small>{syncedNew ? 'Reconciled with server' : 'Stored on this device'}</small></span><span className={`tagx ${syncedNew ? 'ok' : 'loc'}`}>{syncedNew ? 'SYNCED' : 'LOCAL'}</span></div>}
                {i >= 3 && <div key={`b${syncedNew}`} className="rec"><span>Lab order created<small>{syncedNew ? 'Reconciled with server' : 'Stored on this device'}</small></span><span className={`tagx ${syncedNew ? 'ok' : 'loc'}`}>{syncedNew ? 'SYNCED' : 'LOCAL'}</span></div>}
              </div>
              <div className="queue"><span>{pending ? '2 changes queued' : syncedNew ? 'Queue cleared' : 'Up to date'}</span><span className="bar"><i style={{ width: pending ? '100%' : syncedNew ? '0%' : '0%' }} /></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
