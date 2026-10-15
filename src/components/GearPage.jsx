import { Binoculars, BookOpen, Camera, CircleDot, Telescope } from 'lucide-react';
import { gearCategories } from '../data/gearProducts';
import { GearSection } from './GearSection';

const categoryIcons = [Telescope, Binoculars, Camera, CircleDot, BookOpen];

const selectionSteps = [
  {
    index: '01',
    title: 'Start with what you want to see',
    copy: 'The Moon, planets, star fields, and deep-sky objects place different demands on equipment. Define the observing goal first.',
  },
  {
    index: '02',
    title: 'Plan for your observing location',
    copy: 'Consider light pollution, storage, setup time, and whether you need equipment that travels easily.',
  },
  {
    index: '03',
    title: 'Verify before you purchase',
    copy: 'Review the current merchant listing, compatibility details, included accessories, and return terms before buying.',
  },
];

export function GearPage() {
  return (
    <main className="gear-page" id="gear">
      <section className="gear-page-hero">
        <div className="page-shell gear-page-hero-inner">
          <div>
            <p className="eyebrow">SPACE GEAR GUIDE</p>
            <h1>Choose tools that support the way you explore.</h1>
          </div>
          <p>Learn the basic equipment categories, compare your needs, and follow verified merchant links when you are ready.</p>
        </div>
      </section>

      <nav className="gear-topic-nav page-shell" aria-label="Astronomy gear topics">
        {gearCategories.map((category, index) => {
          const Icon = categoryIcons[index];
          return (
            <a key={category} href="#gear-selection-guide">
              <Icon size={19} aria-hidden="true" />
              {category}
            </a>
          );
        })}
      </nav>

      <GearSection showFilters />

      <section className="gear-selection-guide" id="gear-selection-guide" aria-labelledby="selection-guide-title">
        <div className="page-shell guide-layout">
          <div className="guide-section-heading">
            <p className="eyebrow">BEFORE YOU BUY</p>
            <h2 id="selection-guide-title">A practical way to choose equipment.</h2>
            <p>No single setup is right for every observer. Start with the experience you want, then narrow the options.</p>
          </div>
          <div className="gear-selection-steps">
            {selectionSteps.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
