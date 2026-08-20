import { ImageOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { FilterBar } from './FilterBar';
import { ImageCard } from './ImageCard';
import { ImageDetailDialog } from './ImageDetailDialog';

export function AtlasSection({ atlas }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="atlas-section" id="atlas" aria-labelledby="atlas-title">
      <div className="page-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CURATED + LIVE SEARCH</p>
            <h2 id="atlas-title">Image Atlas</h2>
          </div>
          <p>
            Browse public observations with normalized mission, object, date, and source metadata.
          </p>
        </div>

        <FilterBar filters={atlas.filters} onChange={atlas.updateFilter} />

        {atlas.error ? (
          <div className="notice" role="status">
            <ImageOff size={18} />
            <span>{atlas.error} Curated images remain available while the local API reconnects.</span>
          </div>
        ) : null}

        {atlas.isLoading && !atlas.visibleItems.length ? (
          <div className="loading-state"><LoaderCircle className="spin" /> Searching public archives…</div>
        ) : null}

        {!atlas.isLoading && !atlas.visibleItems.length ? (
          <div className="empty-state">
            <ImageOff size={24} />
            <h3>No images match these filters.</h3>
            <p>Widen the object, mission, year, or scale selection.</p>
          </div>
        ) : (
          <div className="image-grid">
            {atlas.visibleItems.map((image) => (
              <ImageCard key={image.id} image={image} onOpen={setSelectedImage} />
            ))}
          </div>
        )}

        <div className="atlas-actions">
          <button
            className="button button-outline"
            type="button"
            onClick={atlas.loadMore}
            disabled={atlas.isLoading || !atlas.hasMore}
          >
            {atlas.isLoading ? 'Loading…' : atlas.hasMore ? 'Load more images' : 'End of this collection'}
          </button>
        </div>
      </div>
      <ImageDetailDialog image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
