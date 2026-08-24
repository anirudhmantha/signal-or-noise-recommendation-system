"use client";

import { useMemo, useState } from "react";

type SegmentKey = "all" | "clean" | "sleep" | "shared";

const segments: Record<SegmentKey, { label: string; precision: number; discovery: number; saves: number; skip: number; noise: number }> = {
  all: { label: "All listening", precision: 72.4, discovery: 18.6, saves: 11.2, skip: 29.8, noise: 31 },
  clean: { label: "Context-aware model", precision: 84.7, discovery: 25.9, saves: 16.8, skip: 19.4, noise: 8 },
  sleep: { label: "Sleep sessions", precision: 48.2, discovery: 7.1, saves: 3.8, skip: 41.6, noise: 77 },
  shared: { label: "Shared accounts", precision: 55.9, discovery: 10.4, saves: 5.6, skip: 37.2, noise: 64 },
};

const signals = [
  { name: "Saved a song", weight: 94, tone: "mint", note: "A clear choice" },
  { name: "Played it again", weight: 82, tone: "blue", note: "Repeated interest" },
  { name: "Added to a playlist", weight: 76, tone: "violet", note: "Intentional action" },
  { name: "Finished the track", weight: 68, tone: "amber", note: "Useful, but not definitive" },
  { name: "Passive autoplay", weight: 24, tone: "muted", note: "Weak evidence" },
  { name: "Sleep or focus session", weight: 12, tone: "red", note: "Mostly context" },
];

const recommendations = [
  { track: "Afterglow", artist: "Mira Vale", why: "Similar to artists the listener saved", confidence: 94, art: "cover-a" },
  { track: "Soft Geometry", artist: "North Window", why: "Repeated plays with high completion", confidence: 89, art: "cover-b" },
  { track: "Signal Bloom", artist: "June Static", why: "Strong playlist match with discovery value", confidence: 86, art: "cover-c" },
];

export default function Home() {
  const [active, setActive] = useState<Exclude<SegmentKey, "clean">>("all");
  const [cleaned, setCleaned] = useState(false);
  const [tab, setTab] = useState<"findings" | "method" | "decision">("findings");
  const current = useMemo(() => (cleaned ? segments.clean : segments[active]), [active, cleaned]);

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Signal or Noise home"><span className="brand-mark">S/N</span><span>Signal or Noise</span></a>
        <nav aria-label="Project sections"><a href="#problem">Problem</a><a href="#analysis">Analysis</a><a href="#solution">Solution</a></nav>
        <a className="nav-cta" href="#about">About this work ↘</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>Independent product analytics case study</span><span className="live-dot">By Sai Anirudh Mantha</span></div>
          <h1>Your listening history is not always your <em>taste.</em></h1>
          <p className="hero-lede">I explored a simple problem: music apps can mistake sleep playlists, focus music, autoplay, and shared-account activity for genuine preference. I built a context-aware ranking simulation to see what changes when those plays carry less influence.</p>
          <div className="hero-actions"><a className="primary" href="#analysis">See what I found</a><a className="secondary" href="#method">How I approached it</a></div>
          <div className="hero-proof"><div><strong>1.28M</strong><span>simulated events</span></div><div><strong>20K</strong><span>synthetic listeners</span></div><div><strong>+12.3pp</strong><span>offline precision lift</span></div></div>
          <p className="data-note">This is a Spotify-inspired portfolio simulation built with synthetic data. It does not use Spotify customer data or production results.</p>
        </div>
        <div className="player-shell" aria-label="Example listening session classification">
          <div className="player-top"><span>SESSION CHECK</span><span className="status">● CONTEXT FOUND</span></div>
          <div className="album cover-hero"><span>signal<br/>or noise</span></div>
          <div className="track-line"><div><strong>Midnight Focus</strong><span>Long session · 2:14 AM</span></div><span className="pause-icon" aria-hidden="true">Ⅱ</span></div>
          <div className="progress"><i /></div>
          <div className="classification"><span>Likely context</span><strong>Sleep / focus</strong><b>91% confidence</b></div>
          <div className="wave" aria-hidden="true">{[12,28,18,42,31,55,24,68,44,72,35,58,29,47,21,39,14].map((height,index)=><i key={index} style={{height:`${height}%`}} />)}</div>
        </div>
      </section>

      <section className="problem-strip" id="problem"><span>THE QUESTION</span><p>If someone plays a lullaby for eight hours, should it shape tomorrow&apos;s recommendations as much as a song they searched for, saved, and replayed?</p></section>

      <section className="section story-section">
        <div className="section-heading"><div><span className="section-no">01 / WHY I BUILT THIS</span><h2>A play is not always a preference.</h2></div><p>Most listening histories mix deliberate choices with background behavior. Treating every event equally creates a distorted picture of the listener.</p></div>
        <div className="thought-grid">
          <article><span>01</span><h3>The observation</h3><p>People use music for sleep, work, exercise, parties, and family listening. Those moments are useful context, but they do not always describe personal taste.</p></article>
          <article><span>02</span><h3>The hypothesis</h3><p>Recommendations should improve if intentional actions receive more weight and passive sessions receive less.</p></article>
          <article><span>03</span><h3>The product goal</h3><p>Improve discovery without deleting history or making hidden decisions for the listener.</p></article>
        </div>
      </section>

      <section className="section" id="analysis">
        <div className="section-heading"><div><span className="section-no">02 / WHAT I FOUND</span><h2>Context changed the meaning of the data.</h2></div><p>Select a segment, then switch on the context-aware model. The figures show the offline results produced by this synthetic simulation.</p></div>
        <div className="dashboard">
          <div className="segment-panel"><p className="panel-label">CHOOSE A LISTENING SEGMENT</p>
            {(["all","sleep","shared"] as const).map(key => <button key={key} className={active===key && !cleaned ? "segment active" : "segment"} onClick={()=>{setActive(key);setCleaned(false)}}><span>{segments[key].label}</span><b>{segments[key].noise}% estimated noise</b></button>)}
            <div className="clean-toggle"><div><strong>Use context-aware ranking</strong><span>Reduce the influence of low-intent plays</span></div><button className={cleaned ? "toggle on" : "toggle"} onClick={()=>setCleaned(!cleaned)} aria-label="Use context-aware ranking" aria-pressed={cleaned}><i /></button></div>
          </div>
          <div className="metric-panel"><div className="metric-head"><div><span>PRECISION AT 10</span><strong>{current.precision}%</strong></div><span className={cleaned ? "delta good" : "delta"}>{cleaned ? "+12.3 points" : "baseline"}</span></div><div className="big-bar"><i style={{width:`${current.precision}%`}} /></div><div className="metric-grid"><div><span>Discovery rate</span><strong>{current.discovery}%</strong></div><div><span>Save rate</span><strong>{current.saves}%</strong></div><div><span>Skip rate</span><strong>{current.skip}%</strong></div></div><img src="/charts/session-noise.png" alt="Estimated session noise by listening context" /></div>
        </div>
        <div className="finding-callout"><strong>My main takeaway</strong><p>The baseline reached 72.4% precision. After down-weighting passive and contextual sessions, the simulation reached 84.7%—a lift of 12.3 percentage points. The same run also showed more saves and discovery, with fewer skips.</p></div>
      </section>

      <section className="section dark-section" id="solution">
        <div className="section-heading"><div><span className="section-no">03 / HOW I MODELED IT</span><h2>Give stronger actions a stronger voice.</h2></div><p>I used a transparent score instead of treating every stream equally. The weights are modeling assumptions, not universal truths; in a real product, they would be calibrated and tested.</p></div>
        <div className="model-grid"><div className="signal-card"><p className="panel-label">EXAMPLE SIGNAL WEIGHTS</p>{signals.map(signal=><div className="signal" key={signal.name}><span><strong>{signal.name}</strong><small>{signal.note}</small></span><div><i className={signal.tone} style={{width:`${signal.weight}%`}} /></div><b>{signal.weight}</b></div>)}</div><div className="formula-card"><span className="code-label">RANKING IDEA</span><code><b>taste score</b> =<br/> familiarity × <em>0.42</em><br/>+ clear intent × <em>0.28</em><br/>+ discovery value × <em>0.18</em><br/>+ current context × <em>0.12</em><br/><br/><span>− passive listening penalty</span></code><p>In simple terms: keep what the listener clearly chose, introduce relevant new music, respect the moment, and reduce the effect of sessions that were probably running in the background.</p></div></div>
        <div className="rec-list"><div className="rec-title"><span>EXAMPLE RE-RANKED RESULTS</span><span>Why each track moved up</span></div>{recommendations.map((recommendation,index)=><article key={recommendation.track}><span className="rank">0{index+1}</span><div className={`mini-cover ${recommendation.art}`} /><div className="rec-name"><strong>{recommendation.track}</strong><span>{recommendation.artist}</span></div><p>{recommendation.why}</p><div className="confidence"><i style={{width:`${recommendation.confidence}%`}}/><span>{recommendation.confidence}%</span></div></article>)}</div>
      </section>

      <section className="section" id="method">
        <div className="section-heading"><div><span className="section-no">04 / FROM ANALYSIS TO PRODUCT</span><h2>The model is only half the answer.</h2></div><p>A higher offline score is promising, but it does not prove that real listeners will have a better experience. The next step would be a controlled product experiment.</p></div>
        <div className="tabs"><div className="tab-list">{(["findings","method","decision"] as const).map(item=><button className={tab===item?"active":""} onClick={()=>setTab(item)} key={item}>{item}</button>)}</div>
          {tab==="findings" && <div className="tab-content"><h3>What changed in the simulation</h3><div className="impact-grid"><div><strong>−10.4pp</strong><span>skip rate</span></div><div><strong>+5.6pp</strong><span>save rate</span></div><div><strong>+7.3pp</strong><span>discovery rate</span></div></div><img src="/charts/model-lift.png" alt="Baseline and context-aware model comparison" /><p className="plain-note">These are offline results from synthetic data. They are evidence that the idea is worth testing—not proof of real-world impact.</p></div>}
          {tab==="method" && <div className="tab-content prose"><h3>What I did, in plain terms</h3><ol><li>Generated documented listening events for different users and situations.</li><li>Used SQL to compare saves, skips, completion, source, and listening context.</li><li>Created session-level features in Python.</li><li>Kept later events for testing so the model did not learn from the future.</li><li>Compared a simple baseline with a context-aware ranking score.</li><li>Checked precision, discovery, saves, skips, and performance across segments.</li></ol></div>}
          {tab==="decision" && <div className="tab-content prose"><h3>My product recommendation</h3><p>Give listeners a simple <strong>“Tune My Taste”</strong> control. They could exclude a sleep session, focus playlist, party, or shared profile from future recommendations without deleting their history.</p><ul><li><strong>Test:</strong> existing ranking versus context-aware ranking plus the user control.</li><li><strong>Main metric:</strong> qualified save rate after recommendation exposure.</li><li><strong>Safety checks:</strong> listening time, artist diversity, complaints, and opt-outs.</li><li><strong>Rollout:</strong> start with volunteers and shared-account users before expanding.</li></ul></div>}
        </div>
      </section>

      <section className="section limitations" id="about">
        <div className="section-heading"><div><span className="section-no">05 / WHAT THIS PROJECT IS</span><h2>Clear about the work and its limits.</h2></div><p>Good analysis includes the boundaries, not just the strongest number.</p></div>
        <div className="about-grid">
          <article><h3>What I built</h3><p>A reproducible portfolio case study using TypeScript, Python, SQL, and synthetic listening data. It includes data generation, diagnostic analysis, ranking logic, charts, an interactive interface, and a product experiment proposal.</p></article>
          <article><h3>What it does not claim</h3><p>This is not Spotify&apos;s algorithm, customer data, or a production experiment. Context labels are simplified, and offline improvement does not guarantee causal impact.</p></article>
          <article><h3>What I would improve next</h3><p>I would test device type, time of day, household profiles, cold-start users, genre fairness, and whether listeners understand and trust the control.</p></article>
        </div>
        <div className="author-card"><span className="brand-mark">AM</span><div><span>DESIGNED &amp; DEVELOPED BY</span><h3>Sai Anirudh Mantha</h3><p>Product analytics · recommendation systems · experimentation</p></div></div>
      </section>

      <footer><div><span className="brand-mark">S/N</span><p>Signal or Noise<br/><small>An independent portfolio case study</small></p></div><p>Created by Sai Anirudh Mantha.<br/>Built with documented synthetic data.</p></footer>
    </main>
  );
}
