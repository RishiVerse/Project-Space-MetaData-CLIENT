import { X, Menu } from 'lucide-react';
import { useState } from 'react';
import { SocialLinks } from './SocialLinks';

const baseNavigation = [
  { href: '#top', label: 'Explore' },
  { href: '#atlas', label: 'Image Atlas' },
  { href: '#guides', label: 'Guides' },
  { href: '#about', label: 'About' },
];

export function Header({ route, spaceGearEnabled, socialMediaEnabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = spaceGearEnabled
    ? [...baseNavigation.slice(0, 2), { href: '#gear', label: 'Space Gear' }, ...baseNavigation.slice(2)]
    : baseNavigation;

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="SpaceMetadata home">
        <img
          className="brand-logo"
          src="/brand/cosmic-research-logo.png"
          alt=""
          width="520"
          height="250"
        />
      </a>
      <div className="header-actions">
        <nav className={isOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation" id="primary-navigation">
          {navigation.map(({ href, label }) => {
            const isActive = route === href || (href === '#gear' && route.startsWith('#gear-'));
            return (
              <a
                className="feature-link"
                key={label}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                <span>{label}</span>
              </a>
            );
          })}
        </nav>
        {socialMediaEnabled ? <SocialLinks /> : null}
        <button
          className="menu-button icon-button"
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
