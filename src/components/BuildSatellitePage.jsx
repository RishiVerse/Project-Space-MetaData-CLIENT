import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

const guideSteps = [
  { number: '01', title: 'Define the mission', description: 'Write down the question your satellite should answer and the part of Earth or space it needs to observe.', status: 'Start here' },
  { number: '02', title: 'Choose the payload', description: 'Match your mission to a sensor or instrument. Add your recommended options, examples, and selection notes here.', status: 'Next up' },
  { number: '03', title: 'Design the spacecraft', description: 'Plan the power, communications, flight computer, structure, and attitude control your payload will need.', status: 'Plan it' },
  { number: '04', title: 'Test and launch', description: 'Prepare a test checklist, find a launch path, and document the reviews that make the mission ready to fly.', status: 'Ship it' },
];

export function BuildSatellitePage() {
  return (
    <main className="guide-page">
      <section className="guide-hero" aria-labelledby="guide-title">
        <div className="page-shell guide-hero-inner">
          <a className="back-link" href="#top"><ArrowLeft size={17} /> Back to home</a>
          <p className="eyebrow">PROJECTS / BUILD GUIDE</p>
          <h1 id="guide-title">Build your satellite.</h1>
          <p className="guide-intro">A clear starting point for turning a space question into a mission. This guide is ready for your detailed lessons, links, and examples.</p>
          <div className="guide-meta">
            <span><Circle size={10} fill="currentColor" /> Template guide</span>
            <span>4 steps</span>
            <span>Beginner friendly</span>
          </div>
        </div>
      </section>
      <section className="guide-content" aria-labelledby="steps-title">
        <div className="page-shell guide-layout">
          <div className="guide-section-heading">
            <p className="eyebrow">THE FLIGHT PLAN</p>
            <h2 id="steps-title">From first question to orbit.</h2>
            <p>Use each step as a home for the content you will add later. Keep the path simple, then give curious builders room to go deeper.</p>
          </div>
          <div className="guide-steps">
            {guideSteps.map(({ number, title, description, status }, index) => (
              <article className="guide-step" key={number}>
                <div className="guide-step-number">{number}</div>
                <div className="guide-step-copy">
                  <div className="guide-step-status"><CheckCircle2 size={16} /> {status}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                {index < guideSteps.length - 1 && <div className="guide-step-line" aria-hidden="true" />}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="guide-next" aria-label="Continue building">
        <div className="page-shell guide-next-inner">
          <div>
            <p className="eyebrow">YOUR MISSION NOTEBOOK</p>
            <h2>Give your mission a name.</h2>
            <p>This is a placeholder for the next interactive step, checklist, or downloadable planning worksheet.</p>
          </div>
          <button className="button button-primary" type="button" disabled>Continue building <ArrowRight size={18} /></button>
        </div>
      </section>
    </main>
  );
}
