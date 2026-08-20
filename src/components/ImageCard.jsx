import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { useState } from 'react';

const formatYear = (year) => year || 'Date unknown';

export function ImageCard({ image, onOpen }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="image-card">
      <button className="image-card-media" type="button" onClick={() => onOpen(image)}>
        {!imageFailed && image.previewUrl ? (
          <img
            src={image.previewUrl}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : null}
        <span className="mission-badge">{image.mission}</span>
        <span className="sr-only">Open details for {image.title}</span>
      </button>
      <div className="image-card-body">
        <div className="card-kicker">
          <span>{image.objectType}</span>
          <span>{image.id}</span>
        </div>
        <h3>{image.title}</h3>
        <p>{image.description}</p>
        <div className="card-metadata">
          <span><CalendarDays size={14} /> {formatYear(image.year)}</span>
          <span><MapPin size={14} /> {image.center}</span>
        </div>
        <a href={image.source.url} target="_blank" rel="noreferrer">
          View source <ArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}
