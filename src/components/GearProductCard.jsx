import { ArrowUpRight, PackageSearch } from 'lucide-react';
import { useState } from 'react';

export function GearProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = product.imageUrl && !imageFailed;

  return (
    <article className="gear-product-card">
      <div className="gear-product-media">
        {showImage ? (
          <img
            src={product.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            width="640"
            height="480"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="gear-product-placeholder" aria-hidden="true">
            <PackageSearch size={42} strokeWidth={1.4} />
            <span>Verified image pending</span>
          </div>
        )}
      </div>
      <div className="gear-product-body">
        <div className="gear-product-meta">
          <span>{product.merchant}</span>
          <span>{product.category || 'Details pending'}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {product.recommendation ? (
          <p className="gear-recommendation">Good for: {product.recommendation}</p>
        ) : null}
        <a
          className="button button-primary gear-product-action"
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label={`View ${product.name} on Amazon (affiliate link)`}
        >
          View on Amazon <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <span className="affiliate-label">Affiliate link</span>
      </div>
    </article>
  );
}
