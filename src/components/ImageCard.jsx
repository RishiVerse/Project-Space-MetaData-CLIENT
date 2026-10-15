import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { memo, useState } from 'react';
import { getCardImageUrl } from '../utils/imageUrl';

const formatYear = (year) => year || 'Date unknown';

export const ImageCard = memo(function ImageCard({ image, onOpen }) {
  const [failedUrl, setFailedUrl] = useState('');
  const cardImageUrl = getCardImageUrl(image.previewUrl);
  const showImage = cardImageUrl && failedUrl !== cardImageUrl;

  return (
    <article className="image-card">
      <button className="image-card-media" type="button" onClick={() => onOpen(image)}>
        {showImage ? (
          <img
            src={cardImageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="800"
            height="600"
            onError={() => setFailedUrl(cardImageUrl)}
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
});
