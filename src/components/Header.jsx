import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  ['#atlas', 'Atlas'],
  ['#roadmap', 'Projects'],
  ['#about', 'About'],
];

export function Header({ healthStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const healthLabel = healthStatus === 'online'
    ? 'API online'
    : healthStatus === 'offline'
      ? 'API offline'
      : 'Checking API';

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Cosmic Research — Cosmic Image Atlas home">
        <img
          className="brand-logo"
          src="/brand/cosmic-research-logo.png"
          alt=""
        />
      </a>
      <button
        className="menu-button icon-button"
        type="button"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={isOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
        {navItems.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setIsOpen(false)}>{label}</a>
        ))}
        <span className={`api-status status-${healthStatus}`} title="Backend health check">
          <span aria-hidden="true" /> {healthLabel}
        </span>
        <a className="button button-light button-small" href="#atlas">Explore Atlas</a>
      </nav>
    </header>
  );
}
