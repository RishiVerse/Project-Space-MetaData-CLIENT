import { ArrowRight, ArrowUpRight, CalendarDays, Database, MapPin, Ruler, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function ImageDetailDialog({ image, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!image) return undefined;
    const previouslyFocused = document.activeElement;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', closeOnEscape);
    closeButtonRef.current?.focus();
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', closeOnEscape);
      previouslyFocused?.focus();
    };
  }, [image, onClose]);

  if (!image) return null;

  const searchableImageText = `${image.title} ${image.objectType} ${image.keywords.join(' ')}`.toLowerCase();
  const observationGuide = searchableImageText.includes('moon') || searchableImageText.includes('lunar')
    ? { href: '#guide-moon', label: 'How to observe the Moon' }
    : searchableImageText.includes('jupiter')
      ? { href: '#guide-jupiter', label: 'Observing Jupiter' }
      : null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="image-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeButtonRef} className="dialog-close icon-button" type="button" onClick={onClose} aria-label="Close image details">
          <X size={20} />
        </button>
        <div className="dialog-image">
          <img src={image.previewUrl} alt={image.title} decoding="async" />
        </div>
        <div className="dialog-content">
          <p className="eyebrow">{image.mission} · {image.objectType}</p>
          <h2 id="detail-title">{image.title}</h2>
          <p>{image.description}</p>
          <dl className="detail-list">
            <div><dt><CalendarDays size={16} /> Captured</dt><dd>{image.year || 'Unknown'}</dd></div>
            <div><dt><MapPin size={16} /> Archive center</dt><dd>{image.center}</dd></div>
            <div><dt><Database size={16} /> Provider</dt><dd>{image.source.provider}</dd></div>
            <div><dt><Ruler size={16} /> Scale</dt><dd>{['Planet', 'Moon'].includes(image.objectType) ? 'Planetary' : 'Deep space'}</dd></div>
          </dl>
          {image.keywords.length ? (
            <div className="keyword-list" aria-label="Image annotations">
              {image.keywords.slice(0, 8).map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
          ) : null}
          <div className="dialog-actions">
            <a className="button button-primary" href={image.source.url} target="_blank" rel="noreferrer">
              Open original archive <ArrowUpRight size={17} />
            </a>
            {observationGuide ? (
              <a className="dialog-guide-link" href={observationGuide.href} onClick={onClose}>
                {observationGuide.label} <ArrowRight size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
