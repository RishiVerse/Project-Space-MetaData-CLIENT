import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { gearProducts } from '../data/gearProducts';
import { GearCategoryFilter } from './GearCategoryFilter';
import { GearProductCard } from './GearProductCard';

export function GearSection({ showFilters = false, showBrowseLink = false }) {
  const [selectedCategory, setSelectedCategory] = useState('All gear');
  const availableCategories = useMemo(
    () => [...new Set(gearProducts.map((product) => product.category).filter(Boolean))],
    [],
  );
  const visibleProducts = selectedCategory === 'All gear'
    ? gearProducts
    : gearProducts.filter((product) => product.category === selectedCategory);

  return (
    <section className="gear-section" id="featured-gear" aria-labelledby="gear-section-title">
      <div className="page-shell">
        <div className="section-heading gear-section-heading">
          <div>
            <p className="eyebrow">OBSERVE + LEARN</p>
            <h2 id="gear-section-title">Explore the Universe Beyond Your Screen</h2>
          </div>
          <div className="gear-heading-copy">
            <p>Discover telescopes, astronomy equipment, and useful tools to begin observing the night sky.</p>
            {showBrowseLink ? (
              <a className="inline-link" href="#gear">Browse the gear guide <ArrowRight size={17} /></a>
            ) : null}
          </div>
        </div>

        {showFilters ? (
          <div className="gear-filter-row">
            <GearCategoryFilter
              categories={availableCategories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
            {!availableCategories.length ? (
              <p>Product categories will appear after the listings are verified.</p>
            ) : null}
          </div>
        ) : null}

        <div className="gear-product-grid">
          {visibleProducts.map((product) => <GearProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}
