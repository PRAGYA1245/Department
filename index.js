import { useState } from 'react'

const facultyData = [
  { id: 1, name: 'Dr. A. Kumar', title: 'Head of Department', email: 'akumar@kluniv.edu', phone: '+91-9000000001' },
  { id: 2, name: 'Prof. B. Singh', title: 'Associate Professor', email: 'bsingh@kluniv.edu', phone: '+91-9000000002' },
  { id: 3, name: 'Dr. C. Rao', title: 'Assistant Professor', email: 'crao@kluniv.edu', phone: '+91-9000000003' },
  { id: 4, name: 'Ms. D. Patel', title: 'Lecturer', email: 'dpatel@kluniv.edu', phone: '+91-9000000004' }
]

export default function Home() {
  const [selected, setSelected] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="page">
      <header className="site-header">
        <h1>KL University - Computer Science Department</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#faculty">Faculty</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); setContactOpen(true); }}>Contact</a>
        </nav>
      </header>

      <main>
        <section id="about" className="card">
          <h2>About the Department</h2>
          <p>
            The Computer Science Department at KL University is committed to excellence in teaching,
            research, and innovation. We offer undergraduate and postgraduate programs with a focus
            on practical, hands-on learning and industry collaboration.
          </p>
        </section>

        <section id="faculty" className="card faculty-section">
          <h2>Faculty</h2>
          <div className="faculty-grid">
            {facultyData.map((f) => (
              <article key={f.id} className={`faculty-card ${selected === f.id ? 'active' : ''}`} onClick={() => setSelected(selected === f.id ? null : f.id)} role="button" tabIndex={0}>
                <div className="avatar">{f.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                <div className="meta">
                  <div className="name">{f.name}</div>
                  <div className="title">{f.title}</div>
                  <div className="quick">
                    <a href={`mailto:${f.email}`} onClick={(e)=>e.stopPropagation()}>{f.email}</a>
                    <a href={`tel:${f.phone}`} onClick={(e)=>e.stopPropagation()}>{f.phone}</a>
                  </div>
                </div>
                <div className="expand">{selected === f.id ? '▲' : '▼'}</div>
                <div className={`details ${selected === f.id ? 'show' : ''}`}>
                  <p>Office: Block B, Room 302</p>
                  <p>Research Areas: AI, ML, Distributed Systems</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="card">
          <h2>General Contact</h2>
          <p>Department Office: +91-9000000100</p>
          <p>Email: csdept@kluniv.edu</p>
          <button className="btn" onClick={() => setContactOpen(true)}>Open Contact Modal</button>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} KL University</span>
      </footer>

      {contactOpen && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <button className="close" onClick={() => setContactOpen(false)}>✕</button>
            <h3>Contact Department</h3>
            <p>Office: Block B, KL University</p>
            <p>Phone: +91-9000000100</p>
            <p>Email: <a href="mailto:csdept@kluniv.edu">csdept@kluniv.edu</a></p>
            <div className="modal-actions">
              <a className="btn" href="mailto:csdept@kluniv.edu">Email</a>
              <a className="btn ghost" href="tel:+919000000100">Call</a>
            </div>
          </div>
        </div>
      )}

    <style jsx>{`
      .page { font-family: Inter, system-ui, sans-serif; color:#111; background:#f6f8fb; min-height:100vh; }
      .site-header { display:flex; justify-content:space-between; align-items:center; padding:24px 28px; background:linear-gradient(90deg,#4b6cb7,#182848); color:white; }
      .site-header h1 { margin:0; font-size:20px; }
      nav a { color:rgba(255,255,255,0.95); margin-left:14px; text-decoration:none; font-weight:600 }
      main { padding:28px; max-width:1000px; margin:0 auto; }
      .card { background:white; padding:20px; border-radius:12px; box-shadow:0 6px 18px rgba(20,30,40,0.06); margin-bottom:18px; }
      .faculty-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-top:12px }
      .faculty-card { display:flex; align-items:center; gap:12px; padding:12px; border-radius:10px; transition:transform .18s ease, box-shadow .18s ease; cursor:pointer; position:relative }
      .faculty-card:hover { transform:translateY(-4px); box-shadow:0 8px 20px rgba(20,30,40,0.08) }
      .avatar { width:56px; height:56px; border-radius:10px; background:#eef2ff; display:flex; align-items:center; justify-content:center; font-weight:700; color:#273469 }
      .name { font-weight:700 }
      .title { color:#58666e; font-size:13px }
      .quick a { display:block; font-size:13px; color:#1b6; text-decoration:none }
      .expand { margin-left:auto; font-size:18px; color:#6b7280 }
      .details { position:absolute; left:12px; right:12px; bottom:-100%; opacity:0; transform:translateY(10px); transition:all .18s ease; background:linear-gradient(180deg,rgba(255,255,255,0.98),#fff); padding:10px; border-radius:8px }
      .details.show { bottom:-86px; opacity:1; transform:translateY(0) }
      .btn { background:#1f6feb; color:white; padding:8px 12px; border-radius:8px; text-decoration:none; display:inline-block; }
      .btn.ghost { background:transparent; color:#1f6feb; border:1px solid #dbeafe }
      .site-footer { text-align:center; padding:20px; color:#6b7280 }
      .modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(2,6,23,0.45); backdrop-filter:blur(4px); }
      .modal-content { background:white; padding:22px; border-radius:12px; width:min(520px,92%); position:relative }
      .close { position:absolute; right:10px; top:10px; border:none; background:transparent; font-size:18px; cursor:pointer }

      @media (prefers-reduced-motion: no-preference) {
        html { scroll-behavior: smooth }
      }
    `}</style>
    </div>
  )
}
