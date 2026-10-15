import { ArrowRight, CircleDot, MoonStar } from 'lucide-react';

const guides = [
  {
    id: 'guide-moon',
    icon: MoonStar,
    kicker: 'THE MOON',
    title: 'How to observe the lunar surface',
    copy: 'Begin with the naked eye, then compare how craters and shadows change across the lunar cycle. A steady view matters more than chasing magnification.',
  },
  {
    id: 'guide-jupiter',
    icon: CircleDot,
    kicker: 'JUPITER',
    title: 'Follow a changing giant planet',
    copy: 'Look for Jupiter as a bright, steady point and revisit it across several nights. Record what you see before deciding which observing tools fit your goals.',
  },
];

export function ObservationGuides() {
  return (
    <section className="observation-guides" id="guides" aria-labelledby="guides-title">
      <div className="page-shell">
        <div className="section-heading guides-heading">
          <div><p className="eyebrow">FIELD NOTES</p><h2 id="guides-title">Turn images into observations.</h2></div>
          <p>Use the atlas as a starting point, then learn how to recognize familiar targets in your own night sky.</p>
        </div>
        <div className="observation-guide-grid">
          {guides.map(({ id, icon: Icon, kicker, title, copy }) => (
            <article id={id} key={id}>
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <p className="guide-kicker">{kicker}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
              <a href="#atlas">Find related imagery <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
