import { ArrowDown, ArrowRight, Search } from 'lucide-react';
import { HeroVideo } from './HeroVideo';

export function Hero({ atlas, showBackgroundImage, showGearLink, showSearch, showVideo }) {
  const submitSearch = (event) => {
    event.preventDefault();
    atlas.search(atlas.query);
    window.location.hash = 'atlas';
  };

  const searchFor = (query) => {
    atlas.setQuery(query);
    atlas.search(query);
    window.location.hash = 'atlas';
  };

  return (
    <section
      className={showBackgroundImage ? 'hero hero-with-image' : 'hero'}
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-content page-shell">
        <div className={showVideo ? 'hero-layout has-video' : 'hero-layout'}>
          <div className="hero-copy-column">
            <p className="eyebrow">PUBLIC SPACE IMAGE METADATA</p>
            <h1 id="hero-title">Explore the universe with us.</h1>
            <p className="hero-copy">
              Search public space archives, understand the metadata behind each image, and learn how to begin observing the night sky yourself.
            </p>
            {showSearch ? (
              <form className="hero-search" role="search" onSubmit={submitSearch}>
                <Search size={20} aria-hidden="true" />
                <label className="sr-only" htmlFor="hero-search-input">Search the image atlas</label>
                <input
                  id="hero-search-input"
                  value={atlas.query}
                  onChange={(event) => atlas.setQuery(event.target.value)}
                  placeholder="Search Moon, Jupiter, nebulae…"
                  autoComplete="off"
                />
                <button className="button button-primary" type="submit" disabled={atlas.isLoading}>
                  {atlas.isLoading ? 'Searching…' : 'Search atlas'}
                </button>
              </form>
            ) : null}
            {showSearch || showGearLink ? (
              <div className="hero-actions">
                {showSearch ? (
                  <div className="popular-searches" aria-label="Popular searches">
                    <span>Try</span>
                    <button type="button" onClick={() => searchFor('moon')}>Moon</button>
                    <button type="button" onClick={() => searchFor('Jupiter')}>Jupiter</button>
                    <button type="button" onClick={() => searchFor('nebula')}>Nebulae</button>
                  </div>
                ) : null}
                {showGearLink ? (
                  <a className="hero-gear-link" href="#gear">Discover astronomy gear <ArrowRight size={17} /></a>
                ) : null}
              </div>
            ) : null}
          </div>
          {showVideo ? <HeroVideo /> : null}
        </div>
      </div>
      <a className="scroll-cue" href="#atlas" aria-label="Scroll to the image atlas">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
