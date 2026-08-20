import { ArrowUpRight, CalendarDays, Database, MapPin, Ruler, X } from 'lucide-react';
import { useEffect } from 'react';

export function ImageDetailDialog({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="image-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close icon-button" type="button" onClick={onClose} aria-label="Close image details">
          <X size={20} />
        </button>
        <div className="dialog-image">
          <img src={image.previewUrl} alt={image.title} />
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
          <a className="button button-primary" href={image.source.url} target="_blank" rel="noreferrer">
            Open original archive <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </div>
  );
}
