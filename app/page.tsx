"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", company: "", type: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

    // Hero chat animation
    const messages = [
      { type: "user", text: "Which clients are at risk right now?" },
      { type: "ai", html: 'Three clients showing risk signals. <span class="r">Acme Corp</span> — invoice 18 days overdue, no response. <span class="r">Bright Co</span> — engagement down 60%. <span class="r">Veritas</span> — 3 tickets this week. Reach out to all three before Friday.<div class="hui-source">HubSpot · Stripe · 2h ago</div>' },
      { type: "user", text: "What should I focus on this week?" },
      { type: "ai", html: 'Call <span class="r">Acme Corp</span> today. Push on <strong>$48k</strong> in stalled pipeline. Find out who is overloaded — two projects are behind.<div class="hui-source">HubSpot · Linear · Stripe</div>' },
    ];

    const container = document.getElementById("hui-messages");
    if (!container) return;
    let idx = 0;

    function addMsg() {
      if (!container) return;
      if (idx >= messages.length) {
        setTimeout(() => { if (container) container.innerHTML = ""; idx = 0; setTimeout(addMsg, 800); }, 4000);
        return;
      }
      const msg = messages[idx];
      if (msg.type === "user") {
        const el = document.createElement("div");
        el.className = "hui-msg-user";
        el.textContent = msg.text ?? "";
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        idx++;
        setTimeout(addMsg, 900);
      } else {
        const typing = document.createElement("div");
        typing.className = "hui-typing";
        typing.style.display = "flex";
        typing.innerHTML = '<div class="hui-typing-dot"></div><div class="hui-typing-dot"></div><div class="hui-typing-dot"></div>';
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
        setTimeout(() => {
          if (container.contains(typing)) container.removeChild(typing);
          const el = document.createElement("div");
          el.className = "hui-msg-ai show";
          el.innerHTML = msg.html || "";
          container.appendChild(el);
          container.scrollTop = container.scrollHeight;
          idx++;
          setTimeout(addMsg, 1200);
        }, 1000);
      }
    }
    const t = setTimeout(addMsg, 1200);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, []);

  function handleForm(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
  }

  const faqs = [
    { q: "What tools does Calar connect to?", a: "We connect to the most common business tools — HubSpot, Notion, Slack, Stripe, Linear, Airtable, Gmail, Google Calendar, and more. If you're running something else, ask us. We'll make it work or tell you honestly if we can't." },
    { q: "How does setup work?", a: "We handle everything end to end. No engineers needed on your side. We connect your tools, build your intelligence layer, and deliver your first briefing. Setup timeline depends on your stack — we scope it on your discovery call." },
    { q: "How accurate is the AI?", a: "Every answer Calar gives is sourced from your actual connected data — not generated from thin air. The accuracy depends on the quality of your data. If your HubSpot is clean, Calar's answers will be precise. We'll tell you upfront if your data needs cleaning before we build." },
    { q: "What is the weekly briefing?", a: "Every Monday morning, Calar writes you a plain English summary of what actually moved in your business that week — revenue changes, client signals, pipeline shifts, risks, and what to focus on. No charts. No data dumps. Just a direct, human briefing on what matters." },
    { q: "Is my business data secure?", a: "Yes. We use read-only API connections wherever possible, never store raw credentials, and all data is encrypted in transit and at rest. We sign NDAs with every client before we connect a single tool." },
    { q: "What does it cost?", a: "We don't publish pricing publicly because every setup is different. Book a discovery call and we'll give you an honest number based on your stack and company size. No hidden fees, no surprises." },
  ];

  return (
    <>
      {/* ── NAV ── */}
      <nav className="main-nav">
        <a href="#" className="nav-logo">Calar</a>
        <ul className="nav-links">
          <li><a href="#product">Product</a></li>
          <li><a href="#intelligence">Intelligence</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div className="nav-right">
          <a href="#contact" className="btn-ghost">Get in touch</a>
          <a href="/demo" className="btn-primary-sm">See the demo →</a>
          <button className="hamburger" style={{ display: "none" }} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {[["#product","Product"],["#intelligence","Intelligence"],["#contact","Contact"],["#faq","FAQ"]].map(([href, label]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href="/demo" onClick={() => setMenuOpen(false)} style={{ marginTop: 8, background: "var(--text)", color: "var(--bg)", borderRadius: 6, padding: "12px 16px", textAlign: "center", fontWeight: 700 }}>
            See the demo →
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            AI-powered business intelligence · Fully managed
          </div>
          <h1>Everything looks fine.<br /><span className="dim">It isn&apos;t.</span></h1>
          <p className="hero-sub">Calar connects every tool you run on, builds your intelligence layer, and gives you an AI that knows your entire business — so you can stop guessing and start knowing.</p>
          <div className="hero-cta">
            <a href="/demo" className="btn-hero-primary">See the demo →</a>
            <a href="#contact" className="btn-hero-secondary">Get in touch</a>
          </div>
        </div>

        <div className="hero-ui">
          <div className="hero-ui-bar">
            <div className="hero-ui-dots">
              <div className="hero-ui-dot" /><div className="hero-ui-dot" /><div className="hero-ui-dot" />
            </div>
            <div className="hero-ui-title">Calar — Fieldwork Agency</div>
          </div>
          <div className="hero-ui-body">
            <div className="hui-sidebar">
              <div className="hui-section-label">Intelligence</div>
              {["Ask Calar","Revenue","Clients","Pipeline","Team"].map((item, i) => (
                <div key={item} className={`hui-nav-item${i === 0 ? " active" : ""}`}>
                  <div className="hui-nav-dot" />{item}
                </div>
              ))}
              <div className="hui-section-label" style={{ marginTop: 8 }}>Tools</div>
              {["HubSpot","Stripe","Notion","Linear","Slack","Gmail"].map(tool => (
                <div key={tool} className="hui-tool-row"><div className="hui-tool-dot" />{tool}</div>
              ))}
            </div>
            <div className="hui-chat">
              <div className="hui-chat-header">
                <div className="hui-chat-icon" />
                <div className="hui-chat-title">Ask Calar · Fieldwork Agency</div>
                <div className="hui-live">● Live</div>
              </div>
              <div className="hui-messages" id="hui-messages" />
            </div>
            <div className="hui-right">
              <div className="hui-panel-label">Snapshot</div>
              <div>
                <div className="hui-metric"><span className="hui-metric-name">MRR</span><div style={{ display:"flex", gap:5, alignItems:"baseline" }}><span className="hui-metric-val">$112k</span><span className="hui-metric-up">↑4.2%</span></div></div>
                <div className="hui-metric"><span className="hui-metric-name">Pipeline</span><span className="hui-metric-val">$48k</span></div>
                <div className="hui-metric"><span className="hui-metric-name">Overdue</span><div style={{ display:"flex", gap:5, alignItems:"baseline" }}><span className="hui-metric-val">$14k</span><span className="hui-metric-down">risk</span></div></div>
              </div>
              <div className="hui-panel-label" style={{ marginTop: 4 }}>Clients</div>
              <div>
                {[["var(--green)","TechFlow Inc"],["var(--green)","Luna Brands"],["var(--yellow)","Veritas Co"],["var(--red)","Acme Corp"],["var(--red)","Bright Co"]].map(([color, name]) => (
                  <div key={name} className="hui-client">
                    <div className="hui-client-dot" style={{ background: color }} />
                    <span className="hui-client-name">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <section className="logos-section">
        <p className="logos-label">Trusted by founders running on</p>
        <div className="logos-row">
          {["HubSpot","Stripe","Notion","Linear","Slack","Airtable","Gmail"].map(tool => (
            <span key={tool} className="logo-item">{tool}</span>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { num: "10–20", label: "Disconnected tools the average SMB runs on. Nobody has the full picture.", delay: "" },
            { num: "40%", label: "Of time founders spend looking for information that should already be visible.", delay: "d1" },
            { num: "Day one.", label: "How fast you get your intelligence layer. We handle everything end to end.", delay: "d2" },
          ].map(({ num, label, delay }) => (
            <div key={num} className={`stat-cell fade-up ${delay}`}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE 1: CONNECT ── */}
      <section className="feature-section" id="product">
        <div className="feature-header fade-up">
          <div>
            <span className="feature-num">01 — Connect</span>
            <h2 className="feature-h2">Every tool.<br />One intelligence layer.</h2>
          </div>
          <div>
            <p className="feature-desc">We connect all of a business&apos;s disconnected tools via API — no engineers needed on your side. We map every person, company, project, deal, and relationship that matters across your entire stack. We handle everything end to end.</p>
            <a href="#contact" className="btn-link">See all integrations →</a>
          </div>
        </div>
        <div className="feature-ui-panel fade-up d1">
          <div className="fup-header">
            <span className="fup-label">Connected tools · Fieldwork Agency · 6 tools</span>
            <span className="fup-tag">All live</span>
          </div>
          <div className="fup-body">
            <div className="tool-grid">
              {[["HubSpot","CRM · Pipeline"],["Stripe","Billing · Revenue"],["Notion","Docs · Knowledge"],["Linear","Projects · Tasks"],["Slack","Comms · Signals"],["Gmail","Email · Threads"]].map(([name, type]) => (
                <div key={name} className="tool-cell">
                  <div className="tool-dot" />
                  <span className="tool-name">{name}</span>
                  <span className="tool-type">{type}</span>
                  <span className="tool-live">Live</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 2: QUERY ── */}
      <section className="feature-section">
        <div className="feature-header fade-up">
          <div>
            <span className="feature-num">02 — Query</span>
            <h2 className="feature-h2">Ask anything.<br />Get a real answer.</h2>
          </div>
          <div>
            <p className="feature-desc">Calar AI is connected to your actual business data. Ask any question in plain English — which clients are at risk, what&apos;s your real runway, who&apos;s behind — and get an answer sourced from your real data. Not a guess. Not a report. An answer. Right now.</p>
            <a href="/demo" className="btn-link">Try the demo →</a>
          </div>
        </div>
        <div className="feature-ui-panel fade-up d1">
          <div className="fup-header">
            <span className="fup-label">Calar AI · Fieldwork Agency</span>
            <span className="fup-tag">● Live</span>
          </div>
          <div className="chat-full">
            <div className="cf-user">Which clients are at risk right now?</div>
            <div className="cf-ai">
              Three clients showing risk signals. <span className="risk">Acme Corp</span> — invoice 18 days overdue, no response to three emails. <span className="risk">Bright Co</span> — engagement dropped 60% this month. <span className="risk">Veritas</span> — 3 support tickets this week, unusual for them. Reach out to all three personally before Friday.
              <div className="cf-sources"><span className="cf-source">HubSpot · 2h ago</span><span className="cf-source">Stripe · today</span><span className="cf-source">Gmail · 18d ago</span></div>
            </div>
            <div className="cf-user">What should I focus on this week?</div>
            <div className="cf-ai">
              Three things. Call <span className="risk">Acme Corp</span> today — not email, they&apos;re not responding. Push on the <strong>$48,000</strong> in pipeline that hasn&apos;t moved in two weeks. And find out who on the team is overloaded — two projects are behind schedule.
              <div className="cf-sources"><span className="cf-source">HubSpot</span><span className="cf-source">Linear</span><span className="cf-source">Stripe</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 3: MONITOR ── */}
      <section className="feature-section">
        <div className="feature-header fade-up">
          <div>
            <span className="feature-num">03 — Monitor</span>
            <h2 className="feature-h2">The things that matter.<br />Before they become problems.</h2>
          </div>
          <div>
            <p className="feature-desc">Revenue trends, client health, pipeline velocity, team performance — all mapped, all monitored. Calar surfaces the signals that matter before they become the crises that hurt. You always know where you stand.</p>
            <a href="/demo" className="btn-link">See the full dashboard →</a>
          </div>
        </div>
        <div className="feature-ui-panel fade-up d1">
          <div className="fup-header">
            <span className="fup-label">Business snapshot · Fieldwork Agency · This week</span>
          </div>
          <div className="fup-body" style={{ padding: 0 }}>
            <div className="dashboard-layout">
              <div className="dashboard-left">
                <div className="metrics-stack">
                  {[
                    ["MRR","$112,400","↑ 4.2%","mri-up"],
                    ["Pipeline value","$48,000"," stalled","mri-warn"],
                    ["Clients at risk","3"," ↑ from 1","mri-down"],
                    ["Overdue invoices","$14,000"," act now","mri-down"],
                    ["Team utilization","94%"," near limit","mri-warn"],
                    ["Goal progress","74%"," watch","mri-warn"],
                  ].map(([label, val, trend, cls]) => (
                    <div key={label} className="metric-row-item">
                      <span className="mri-label">{label}</span>
                      <span className="mri-val">{val}<span className={`mri-trend ${cls}`}>{trend}</span></span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="dashboard-right">
                <div className="sparkline-label">MRR trend · 6 months</div>
                <div className="sparkline-val">$112,400</div>
                <div className="sparkline-sub">↑ 4.2% vs last month</div>
                <svg className="sparkline-svg" viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
                  <polyline points="0,48 40,42 80,38 120,32 160,22 200,14" stroke="#22C55E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="0,48 40,42 80,38 120,32 160,22 200,14 200,60 0,60" fill="rgba(34,197,94,0.06)"/>
                  <circle cx="200" cy="14" r="3" fill="#22C55E"/>
                </svg>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"var(--text3)", marginTop:6 }}>
                  {["Nov","Dec","Jan","Feb","Mar","Apr"].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 4: INTELLIGENCE ── */}
      <section className="feature-section" id="intelligence">
        <div className="feature-header fade-up">
          <div>
            <span className="feature-num">04 — Intelligence</span>
            <h2 className="feature-h2">Not a report.<br />A conversation.</h2>
          </div>
          <div>
            <p className="feature-desc">Every Monday morning, Calar writes you a plain English briefing on what actually happened in your business that week. No charts. No data dumps. Just a direct, human summary of what matters and what to do about it. Like a chief of staff who read everything so you don&apos;t have to.</p>
            <a href="#contact" className="btn-link">See a sample briefing →</a>
          </div>
        </div>
        <div className="feature-ui-panel fade-up d1">
          <div className="fup-header">
            <span className="fup-label">Weekly Intelligence · Fieldwork Agency</span>
          </div>
          <div className="fup-body">
            <div className="email-chrome">
              <div className="email-topbar">
                <div className="email-topbar-dots">
                  <div className="email-topbar-dot" /><div className="email-topbar-dot" /><div className="email-topbar-dot" />
                </div>
                <div className="email-topbar-url">Inbox · hello@fieldworkagency.com</div>
              </div>
              <div className="email-header">
                <div className="email-from">From: Calar Intelligence &lt;signal@calar.me&gt;</div>
                <div className="email-subject">Your weekly signal — things are moving. Not all of them in the right direction.</div>
                <div className="email-date">Monday, May 5, 2026 · 7:01 AM</div>
              </div>
              <div className="email-body">
                <p className="email-para">Quick heads up before your week starts. Revenue is <span className="good">up 4.2%</span> from last month — two new retainers came in. Good. But there&apos;s something you need to deal with today.</p>
                <p className="email-para"><span className="risk">Acme Corp</span> hasn&apos;t responded in 18 days and their invoice is overdue. That&apos;s <strong>$14,000</strong> sitting in limbo. Email isn&apos;t working. Call them.</p>
                <p className="email-para">You also have <strong>$48,000</strong> in pipeline that hasn&apos;t moved in two weeks. Three deals that were &quot;almost there&quot; are now going cold. Push this week or they&apos;re gone.</p>
                <div className="email-action"><strong>This week&apos;s focus:</strong> Acme Corp call today. Pipeline push by Thursday. Find out who on the team is overloaded — two projects are behind and someone is burning out quietly.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSIGHT CARDS ── */}
      <section className="insights-section">
        <div className="insights-intro fade-up">
          <h2>What Calar finds in a typical business.</h2>
          <p>These aren&apos;t edge cases. This is what&apos;s quietly happening in most SMBs right now — invisible until someone connects the dots.</p>
        </div>
        <div className="insights-grid">
          <div className="insight-card dark fade-up d1">
            <div>
              <div className="insight-number">$14k</div>
              <p className="insight-desc">In overdue invoices the founder didn&apos;t know about — sitting in Stripe, flagged nowhere, silently hurting cash flow for weeks.</p>
            </div>
            <div className="insight-tag"><div className="insight-tag-dot" />Revenue signal</div>
          </div>
          <div className="insight-card light fade-up d2">
            <div>
              <div className="insight-number">3</div>
              <p className="insight-desc">Clients showing churn signals 6 weeks before they would have cancelled. Flagged by Calar. Saved by a timely call. None appeared at-risk on the surface.</p>
            </div>
            <div className="insight-tag"><div className="insight-tag-dot" />Client health signal</div>
          </div>
          <div className="insight-card purple fade-up d3">
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div className="insight-number">94%</div>
              <p className="insight-desc">Team utilization with 2 projects behind schedule — a burnout nobody saw coming. Calar connected the Linear tasks, the Slack activity, and the project deadlines. The founder acted before anyone quit.</p>
              <div className="insight-tag" style={{ marginTop: 20 }}><div className="insight-tag-dot" />Team signal</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap: 12 }}>
              {[["var(--red)","James R. — overloaded","98%"],["var(--yellow)","Sara K. — near limit","88%"],["var(--green)","Mike P. — healthy","72%"],["var(--green)","Amy L. — healthy","65%"]].map(([color, name, val]) => (
                <div key={name} className="insight-stat-row">
                  <div className="insight-stat-dot" style={{ background: color }} />
                  <span className="insight-stat-text">{name}</span>
                  <span className="insight-stat-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="fade-up">
            <h2 className="contact-left" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:800, letterSpacing:-1.5, color:"var(--text)", marginBottom:16 }}>
              Let&apos;s talk.
            </h2>
            <p style={{ fontSize:14, color:"var(--text3)", lineHeight:1.65, marginBottom:24 }}>
              Whether you&apos;re ready to get started, have a question, or just want to see what Calar would find in your business — we&apos;re here. No sales pressure. Just a real conversation.
            </p>
            <div className="contact-direct">
              <div className="contact-direct-item">
                <div className="contact-direct-dot" />
                <span>Email us directly — <a href="mailto:hello@calar.me">hello@calar.me</a></span>
              </div>
              <div className="contact-direct-item">
                <div className="contact-direct-dot" />
                <span>We reply within 24 hours. Always.</span>
              </div>
              <div className="contact-direct-item">
                <div className="contact-direct-dot" />
                <span>No cold call. No pressure. Just a conversation.</span>
              </div>
            </div>
          </div>
          <div className="fade-up d1">
            {formSent ? (
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, padding:"40px 32px", textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>✓</div>
                <div style={{ fontSize:16, fontWeight:700, color:"var(--text)", marginBottom:8 }}>Message received.</div>
                <div style={{ fontSize:13, color:"var(--text3)", lineHeight:1.65 }}>We&apos;ll get back to you within 24 hours. Keep an eye on your inbox.</div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleForm}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your name</label>
                    <input className="form-input" type="text" placeholder="James Lee" required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Work email</label>
                    <input className="form-input" type="email" placeholder="james@company.com" required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input className="form-input" type="text" placeholder="Acme Agency" value={formState.company} onChange={e => setFormState({...formState, company: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">I want to...</label>
                    <select className="form-select" value={formState.type} onChange={e => setFormState({...formState, type: e.target.value})}>
                      <option value="">Select one</option>
                      <option value="demo">Book a discovery call</option>
                      <option value="question">Ask a question</option>
                      <option value="pricing">Get pricing info</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" placeholder="Tell us about your business and what you're trying to solve..." value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
                </div>
                <button type="submit" className="form-submit">Send message →</button>
                <p className="form-note">We read every message. We reply to all of them.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <div className="fade-up">
            <h2>Questions worth asking.</h2>
            <p>If you don&apos;t see your question here, email us at hello@calar.me and we&apos;ll answer honestly.</p>
          </div>
          <div className="faq-list fade-up d1">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner fade-up">
          <h2>Your business is telling you something.<br />Are you listening?</h2>
          <p>Book a call. We&apos;ll show you exactly what Calar would find in your business.</p>
          <a href="#contact" className="btn-hero-primary">Get in touch →</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand-col">
            <span className="footer-brand">Calar</span>
            <p className="footer-brand-desc">The intelligence layer your business has been missing. We connect everything. You know everything.</p>
          </div>
          {[
            { heading: "Product", links: [["#product","How it works"],["#product","Integrations"],["/demo","Demo"],["#contact","Pricing"]] },
            { heading: "Use cases", links: [["#contact","Agencies"],["#contact","SaaS"],["#contact","Consultancies"],["#contact","Startups"]] },
            { heading: "Resources", links: [["#contact","Blog"],["#contact","Sample briefing"],["#contact","Case studies"]] },
            { heading: "Company", links: [["#contact","About"],["mailto:hello@calar.me","Contact"],["#contact","Privacy"],["#contact","Terms"]] },
          ].map(({ heading, links }) => (
            <div key={heading} className="footer-col">
              <h4>{heading}</h4>
              <ul>
                {links.map(([href, label]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-status"><div className="footer-status-dot" />All systems normal.</div>
          <div className="footer-links">
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms</a>
            <a href="#contact">Cookie Policy</a>
          </div>
          <div className="footer-copy">2026 © Calar</div>
        </div>
      </footer>
    </>
  );
}
