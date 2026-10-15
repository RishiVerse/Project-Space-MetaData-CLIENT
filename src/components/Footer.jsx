export function Footer({ spaceGearEnabled }) {
  return (
    <>
      <section className="announcement" aria-label="Project announcement">
        <div className="page-shell announcement-inner">
          <div className="footer-links">
            <span>KEEP EXPLORING</span>
            <p>Public imagery, clear metadata, and space knowledge.</p>
          </div>
          <a href={spaceGearEnabled ? '#gear' : '#atlas'}>
            {spaceGearEnabled ? 'Explore the gear guide' : 'Explore the image atlas'}
          </a>
        </div>
      </section>
      <footer className="site-footer" id="about">
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src="/brand/cosmic-research-logo.png"
              alt="Cosmic Research"
            />
            <p>Public imagery, clear metadata, observing guides, and source-first exploration.</p>
          </div>
          <div className="footer-links">
            <h3>Explore</h3>
            <a href="#atlas">Image Atlas</a>
            <a href="#guides">Observation guides</a>
            {spaceGearEnabled ? <a href="#gear">Space Gear</a> : null}
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
