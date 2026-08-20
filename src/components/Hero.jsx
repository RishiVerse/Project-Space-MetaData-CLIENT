import { ArrowDown, ArrowRight, Search } from 'lucide-react';

const popularSearches = ['Moon', 'Mars', 'Jupiter', 'Nebulae'];

export function Hero({ query, setQuery, onSearch, isLoading }) {
  const submit = (event) => {
    event.preventDefault();
    onSearch(query);
    document.querySelector('#atlas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const runPopularSearch = (term) => {
    setQuery(term.toLowerCase());
    onSearch(term);
    document.querySelector('#atlas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-content page-shell">
        <p className="eyebrow">PUBLIC SPACE IMAGE METADATA</p>
        <h1 id="hero-title">Explore the Universe.<br />Image by Image.</h1>
        <p className="hero-copy">
          Search public imagery from NASA and the missions shaping our view of the cosmos.
          Every image comes with clear metadata, source context, and a path back to the archive.
        </p>

        <form className="hero-search" role="search" onSubmit={submit}>
          <Search size={20} aria-hidden="true" />
          <label className="sr-only" htmlFor="atlas-query">Search the image atlas</label>
          <input
            id="atlas-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Moon, Mars, nebulae…"
            autoComplete="off"
          />
          <label className="sr-only" htmlFor="quick-object">Suggested object</label>
          <select
            id="quick-object"
            value={popularSearches.find((item) => item.toLowerCase() === query.toLowerCase()) || ''}
            onChange={(event) => setQuery(event.target.value.toLowerCase())}
          >
            <option value="">Object</option>
            {popularSearches.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button className="button button-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Searching…' : 'Search'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="popular-searches" aria-label="Popular searches">
          <span>Popular:</span>
          {popularSearches.map((term) => (
            <button type="button" key={term} onClick={() => runPopularSearch(term)}>{term}</button>
          ))}
        </div>
      </div>
      <a className="scroll-cue" href="#atlas" aria-label="Scroll to the image atlas">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
