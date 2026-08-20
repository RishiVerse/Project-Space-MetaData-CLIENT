import { ArrowRight, Braces, FileSearch, Flame, Layers3, Waves } from 'lucide-react';

const projects = [
  {
    icon: Layers3,
    label: 'Earth observation',
    title: 'Sentinel-2 India Compare',
    description: 'Compare cloud-filtered image pairs for Indian locations across seasons and years.',
  },
  {
    icon: Waves,
    label: 'Climate signals',
    title: 'Flood & Crop Visualizer',
    description: 'Explain how satellite bands reveal flood extent, crop health, and land change.',
  },
  {
    icon: Flame,
    label: 'Urban analytics',
    title: 'City Heat Lens',
    description: 'Map surface-temperature patterns and the cooling effects of water and vegetation.',
  },
  {
    icon: Braces,
    label: 'Developer tools',
    title: 'Satellite Data API',
    description: 'A beginner-friendly interface over essential imagery, metadata, and derived signals.',
  },
  {
    icon: FileSearch,
    label: 'Research literacy',
    title: 'Paper Discovery Guide',
    description: 'Find technical papers and turn methods, datasets, and results into clear explanations.',
  },
];

export function ProjectRoadmap() {
  return (
    <section className="roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="page-shell">
        <div className="section-heading roadmap-heading">
          <div>
            <p className="eyebrow">PUBLIC TECHNICAL PROJECTS</p>
            <h2 id="roadmap-title">A builder’s space-data roadmap.</h2>
          </div>
          <p>
            Each project turns complex public science into something people can inspect, understand, and use.
          </p>
        </div>
        <div className="roadmap-grid">
          {projects.map(({ icon: Icon, label, title, description }, index) => (
            <article className="roadmap-item" key={title}>
              <div className="roadmap-index">0{index + 1}</div>
              <Icon size={22} aria-hidden="true" />
              <p>{label}</p>
              <h3>{title}</h3>
              <span>{description}</span>
              <a href="https://github.com/RishiVerse/Project-Space-MetaData-CLIENT" target="_blank" rel="noreferrer" aria-label={`Follow ${title} on GitHub`}>
                Follow build <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
