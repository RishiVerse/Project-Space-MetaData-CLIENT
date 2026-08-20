import { Github } from 'lucide-react';

export function Footer() {
  return (
    <>
      <section className="announcement" id="about" aria-label="Open source announcement">
        <div className="page-shell announcement-inner">
          <div>
            <span>NOW BUILDING IN PUBLIC</span>
            <p>Open-source space-image metadata explorer</p>
          </div>
          <a href="https://github.com/RishiVerse/Project-Space-MetaData-CLIENT" target="_blank" rel="noreferrer">
            View on GitHub <Github size={18} />
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src="/brand/cosmic-research-logo.png"
              alt="Cosmic Research"
            />
            <p>Public imagery, clear metadata, and source-first exploration.</p>
          </div>
          <div>
            <h3>Atlas</h3>
            <a href="#atlas">Browse images</a>
            <a href="#atlas">Mission filters</a>
            <a href="#atlas">Source metadata</a>
          </div>
          <div>
            <h3>Build</h3>
            <a href="#roadmap">Project roadmap</a>
            <a href="https://github.com/RishiVerse/Project-Space-MetaData-CLIENT" target="_blank" rel="noreferrer">GitHub</a>
            <a href="http://localhost:8080/actuator/health" target="_blank" rel="noreferrer">API health</a>
          </div>
        </div>
        <div className="page-shell footer-bottom">
          <span>Built with public scientific archives.</span>
          <span>Images remain credited to their source institutions.</span>
        </div>
      </footer>
    </>
  );
}
